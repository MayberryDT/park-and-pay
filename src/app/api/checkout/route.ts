// src/app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { format, parseISO, differenceInCalendarDays } from 'date-fns'; // Import date-fns functions

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

// Update request body structure
interface RequestBody {
    date: string;       // Entry date (ISO format "yyyy-MM-dd")
    exitDate: string;   // Exit date (ISO format "yyyy-MM-dd")
    duration: string;   // Duration sent from client (will be re-calculated/validated)
    price: string;
    licensePlate: string;
    truckNumber: string;
    couponCode?: string; // Optional coupon code
}

// Function to recalculate duration server-side
const calculateDurationServerSide = (entryDateStr: string, exitDateStr: string): number => {
  try {
    const entry = parseISO(entryDateStr);
    const exit = parseISO(exitDateStr);
    if (exit <= entry) return 0; // Ensure exit date is after entry date
    // Calculate the difference in days (number of nights)
    return differenceInCalendarDays(exit, entry); 
  } catch (e) {
    console.error("Error parsing dates for duration calculation:", e);
    return 0;
  }
};

// --- Price calculation logic --- 
const calculatePriceServerSide = (durationDays: number, couponCode?: string): number => {
  console.log(`[calculatePriceServerSide] Duration: ${durationDays}, Coupon Received: '${couponCode}'`); // DEBUG
  const DAILY_RATE = 10;
  const WEEKLY_RATE = 65;
  const MONTHLY_RATE = 275;
  const DAYS_IN_WEEK = 7;
  const DAYS_IN_MONTH = 30;

  if (durationDays <= 0) return 0;
  let months = Math.floor(durationDays / DAYS_IN_MONTH);
  let remainingDaysAfterMonths = durationDays % DAYS_IN_MONTH;
  let weeks = Math.floor(remainingDaysAfterMonths / DAYS_IN_WEEK);
  let remainingDays = remainingDaysAfterMonths % DAYS_IN_WEEK;
  let priceForRemainingDays = Math.min(
      weeks * WEEKLY_RATE + remainingDays * DAILY_RATE,
      Math.ceil(remainingDaysAfterMonths / DAYS_IN_WEEK) * WEEKLY_RATE,
      remainingDaysAfterMonths * DAILY_RATE
  );
  let calculatedPrice = months * MONTHLY_RATE + priceForRemainingDays;
  let finalPrice = Math.min(
      calculatedPrice,
      durationDays * DAILY_RATE,
      Math.ceil(durationDays / DAYS_IN_WEEK) * WEEKLY_RATE,
      Math.ceil(durationDays / DAYS_IN_MONTH) * MONTHLY_RATE
  );
  console.log(`[calculatePriceServerSide] Price before coupon: ${finalPrice}`); // DEBUG

  if (couponCode && couponCode.toUpperCase() === 'LOCAL175') { // Normalize coupon check
      console.log(`[calculatePriceServerSide] Applying LOCAL175 coupon.`); // DEBUG
      finalPrice = 175;
  } else {
      console.log(`[calculatePriceServerSide] Coupon '${couponCode}' not applied or invalid.`); // DEBUG
  }

  console.log(`[calculatePriceServerSide] Final price: ${finalPrice}`); // DEBUG
  return finalPrice;
};
// --- End Price calculation logic ---

export async function POST(request: Request) {
  try {
    const body = await request.json() as RequestBody;
    const { date: entryDate, exitDate, duration, price, licensePlate, truckNumber, couponCode } = body;
    console.log("[POST /api/checkout] Received request body:", body); // DEBUG: Log entire body

    // Validate Dates, Duration, and Price
    if (!entryDate || !exitDate || !duration || !price || !licensePlate || !truckNumber) {
      console.error("[POST /api/checkout] Error: Missing required booking details", body); // DEBUG
      return NextResponse.json({ error: 'Missing required booking details' }, { status: 400 });
    }

    // Recalculate duration on the server for security
    const serverCalculatedDuration = calculateDurationServerSide(entryDate, exitDate);
    const clientDurationNum = parseInt(duration, 10);
    console.log(`[POST /api/checkout] Server Duration: ${serverCalculatedDuration}, Client Duration: ${clientDurationNum}`); // DEBUG

    if (serverCalculatedDuration <= 0 || isNaN(clientDurationNum) /* Note: Client duration mismatch check removed for now || serverCalculatedDuration !== clientDurationNum */) {
      console.warn(`[POST /api/checkout] Duration mismatch/invalid: Client=${duration}, Server=${serverCalculatedDuration}. Handling...`); // DEBUG
      if(serverCalculatedDuration <= 0) {
         if (entryDate === exitDate) {
             console.error("[POST /api/checkout] Error: Entry and Exit dates cannot be the same."); // DEBUG
             return NextResponse.json({ error: 'Entry and Exit dates cannot be the same.' }, { status: 400 });
         } else {
             console.error("[POST /api/checkout] Error: Invalid entry/exit date combination."); // DEBUG
             return NextResponse.json({ error: 'Invalid entry/exit date combination. Exit date must be after entry date.' }, { status: 400 });
         }
      }
       // If duration mismatch, maybe still proceed? For now, we proceed based on server duration if > 0
    }

    // Recalculate price on the server based on the *server-calculated* duration and received coupon
    const serverCalculatedPrice = calculatePriceServerSide(serverCalculatedDuration, couponCode);
    const clientPriceNum = parseFloat(price);
    console.log(`[POST /api/checkout] Server Price: ${serverCalculatedPrice}, Client Price: ${clientPriceNum}, Coupon Code Provided: '${couponCode}'`); // DEBUG

    // Price validation/warning (using server price regardless)
    if (isNaN(clientPriceNum) || serverCalculatedPrice !== clientPriceNum) {
         console.warn(`[POST /api/checkout] Price mismatch: Client=${clientPriceNum}, Server=${serverCalculatedPrice}. Using server price.`);
    }

    const priceInCents = serverCalculatedPrice * 100; 
    if (priceInCents <= 0) {
       console.error("[POST /api/checkout] Error: Calculated price must be positive.", { serverCalculatedPrice }); // DEBUG
       return NextResponse.json({ error: 'Calculated price must be positive.' }, { status: 400 });
    }
    console.log(`[POST /api/checkout] Final price in cents for Stripe: ${priceInCents}`); // DEBUG

    // Format dates for display
    const formattedEntryDate = format(parseISO(entryDate), "PPP");
    const formattedExitDate = format(parseISO(exitDate), "PPP");
    const description = `Truck Parking: ${formattedEntryDate} to ${formattedExitDate} (${serverCalculatedDuration} day${serverCalculatedDuration === 1 ? '' : 's'}). Plate: ${licensePlate}, Truck: ${truckNumber}`;

    // Define success and cancel URLs
    let YOUR_DOMAIN = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
    if (!YOUR_DOMAIN) {
      console.error("[POST /api/checkout] CRITICAL ERROR: NEXT_PUBLIC_APP_URL is not set!");
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }
    if (YOUR_DOMAIN.endsWith('/')) {
      YOUR_DOMAIN = YOUR_DOMAIN.slice(0, -1);
    }
    const successUrl = `${YOUR_DOMAIN}/confirmation?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${YOUR_DOMAIN}/`;
    console.log(`[POST /api/checkout] Stripe URLs: Success=${successUrl}, Cancel=${cancelUrl}`); // DEBUG

    // Create a Stripe Checkout Session
    console.log("[POST /api/checkout] Creating Stripe session..."); // DEBUG
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Truck Parking Spot Reservation',
              description: description,
              images: [],
            },
            unit_amount: priceInCents, // Use the final server-calculated price
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        entryDate: entryDate,
        exitDate: exitDate,
        durationDays: serverCalculatedDuration.toString(),
        licensePlate: licensePlate,
        truckNumber: truckNumber,
      },
    });
    console.log("[POST /api/checkout] Stripe session created successfully:", session.id); // DEBUG

    // Return the session ID to the frontend
    return NextResponse.json({ sessionId: session.id });

  } catch (error) {
    console.error("[POST /api/checkout] Error creating Stripe session:", error); // DEBUG
    if (error instanceof Error) {
         return NextResponse.json({ error: error.message }, { status: 500 });
    }
     return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
