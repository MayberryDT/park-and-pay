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

// --- Price calculation logic remains the same --- 
const calculatePriceServerSide = (durationDays: number): number => {
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
  return Math.min(
      calculatedPrice,
      durationDays * DAILY_RATE,
      Math.ceil(durationDays / DAYS_IN_WEEK) * WEEKLY_RATE,
      Math.ceil(durationDays / DAYS_IN_MONTH) * MONTHLY_RATE
  );
};
// --- End Price calculation logic ---

export async function POST(request: Request) {
  try {
    const body = await request.json() as RequestBody;
    // Rename 'date' to 'entryDate' for clarity internally
    const { date: entryDate, exitDate, duration, price, licensePlate, truckNumber } = body;

    // --- Security Best Practice: Validate Dates, Duration, and Price --- 
    if (!entryDate || !exitDate || !duration || !price || !licensePlate || !truckNumber) {
      return NextResponse.json({ error: 'Missing required booking details' }, { status: 400 });
    }

    // Recalculate duration on the server for security
    const serverCalculatedDuration = calculateDurationServerSide(entryDate, exitDate);
    const clientDurationNum = parseInt(duration, 10);

    if (serverCalculatedDuration <= 0 || isNaN(clientDurationNum) || serverCalculatedDuration !== clientDurationNum) {
      console.warn(`Duration mismatch/invalid: Client=${duration}, Server=${serverCalculatedDuration}. Using server duration.`);
      if(serverCalculatedDuration <= 0) {
         // Also check if entry and exit dates are the same, which results in 0 duration
         if (entryDate === exitDate) {
             return NextResponse.json({ error: 'Entry and Exit dates cannot be the same.' }, { status: 400 });
         } else {
             return NextResponse.json({ error: 'Invalid entry/exit date combination. Exit date must be after entry date.' }, { status: 400 });
         }
      }
      // Proceed using server-calculated duration
    }

    // Recalculate price on the server based on the *server-calculated* duration
    const serverCalculatedPrice = calculatePriceServerSide(serverCalculatedDuration);
    const clientPriceNum = parseFloat(price);

    // Optional: Check if client price matches server calculation 
    if (isNaN(clientPriceNum) || serverCalculatedPrice !== clientPriceNum) {
         console.warn(`Price mismatch: Client=${clientPriceNum}, Server=${serverCalculatedPrice}. Using server price.`);
         // Decide whether to reject or proceed with server price. Proceeding.
    }

    const priceInCents = serverCalculatedPrice * 100; 
    if (priceInCents <= 0) {
       return NextResponse.json({ error: 'Calculated price must be positive.' }, { status: 400 });
    }
    // --- End Security Section ---

    // Format dates for display (optional, can also be done in confirmation)
    const formattedEntryDate = format(parseISO(entryDate), "PPP"); // e.g., Jul 20, 2024
    const formattedExitDate = format(parseISO(exitDate), "PPP");

    // Update description for Stripe Checkout page
    const description = `Truck Parking: ${formattedEntryDate} to ${formattedExitDate} (${serverCalculatedDuration} day${serverCalculatedDuration === 1 ? '' : 's'}). Plate: ${licensePlate}, Truck: ${truckNumber}`;

    // Define success and cancel URLs
    const YOUR_DOMAIN = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002'; // Ensure correct port
    const successUrl = `${YOUR_DOMAIN}/confirmation?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${YOUR_DOMAIN}/`;

    // Create a Stripe Checkout Session
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
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      // Update metadata with new fields
      metadata: {
        entryDate: entryDate,       // Store ISO format
        exitDate: exitDate,         // Store ISO format
        durationDays: serverCalculatedDuration.toString(), // Store server-calculated duration
        licensePlate: licensePlate,
        truckNumber: truckNumber,
      },
    });

    // Return the session ID to the frontend
    return NextResponse.json({ sessionId: session.id });

  } catch (error) {
    console.error("Error creating Stripe session:", error);
    if (error instanceof Error) {
         return NextResponse.json({ error: error.message }, { status: 500 });
    }
     return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
