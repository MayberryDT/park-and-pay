// src/app/api/confirmation-details/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { format, parseISO } from 'date-fns'; // Removed unused addDays

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

// Removed unused calculateEndDate helper function

// Helper function to call the email sending API
async function sendNotificationEmail(details: any) {
    const internalAppUrl = 'http://localhost:9002';
    const emailApiUrl = `${internalAppUrl}/api/send-email`;
    console.log(`Attempting to POST to internal API route: ${emailApiUrl}`);
    try {
        const response = await fetch(emailApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details),
        });
        console.log(`Response status from ${emailApiUrl}: ${response.status}`);
        if (!response.ok) {
            const responseText = await response.text();
            console.error(`Error response body from ${emailApiUrl}:`, responseText);
            try {
                const errorData = JSON.parse(responseText);
                console.error(`Email API Error (${response.status}):`, errorData.error || 'Unknown error (parsed JSON)');
            } catch (parseError) {
                console.error(`Email API Error (${response.status}): Could not parse error response as JSON.`);
            }
        } else {
            const successData = await response.json();
            console.log(`Email notification triggered successfully via ${emailApiUrl}. Response:`, successData);
        }
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch failed')) {
           console.error(`Network error fetching ${emailApiUrl}:`, error.cause ?? error);
        } else {
           console.error(`Generic error fetching internal API ${emailApiUrl}:`, error);
        }
    }
}

export async function GET(request: Request) {
  console.log(`Received request for /api/confirmation-details`);
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');
  console.log(`Session ID: ${sessionId}`);

  if (!sessionId) {
    console.error('Missing session_id parameter');
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  try {
    console.log('Retrieving Stripe session...');
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log('Stripe session retrieved successfully.');

    console.log(`Session ${sessionId} payment status: ${session.payment_status}`);
    if (session.payment_status !== 'paid') {
        console.warn(`Email notification skipped: Payment status is ${session.payment_status}`);
    }

    // Extract data from metadata using new keys
    const entryDateISO = session.metadata?.entryDate; // e.g., "2024-07-25"
    const exitDateISO = session.metadata?.exitDate;   // e.g., "2024-07-28"
    const duration = session.metadata?.durationDays;
    const totalPrice = session.amount_total ? session.amount_total / 100 : null;
    const currency = session.currency || 'usd';
    const licensePlate = session.metadata?.licensePlate;
    const truckNumber = session.metadata?.truckNumber;
    const paymentStatus = session.payment_status;

    // Format dates for display
    const formattedEntryDate = entryDateISO ? format(parseISO(entryDateISO), "PPP") : null; // e.g., Jul 25, 2024
    const formattedExitDate = exitDateISO ? format(parseISO(exitDateISO), "PPP") : null;

    console.log(`Retrieved Dates: Entry=${formattedEntryDate}, Exit=${formattedExitDate}, Duration=${duration}`);

    // Prepare data for frontend and email using new terminology
    const bookingDetails = {
      entryDate: formattedEntryDate,
      exitDate: formattedExitDate,
      duration: duration || null, // Keep duration for potential internal use or display
      totalPrice: totalPrice,
      currency: currency,
      licensePlate: licensePlate || null,
      truckNumber: truckNumber || null,
      paymentStatus: paymentStatus,
    };
    console.log('Prepared booking details for response.');

    // Trigger Email ONLY if Payment is Successful, using new fields
    if (paymentStatus === 'paid') {
      console.log('Payment status is paid. Triggering email notification...');
      sendNotificationEmail({
         // Use new keys for the email content
         entryDate: formattedEntryDate,
         exitDate: formattedExitDate,
         duration: duration, // Still sending duration, email template needs update
         totalPrice: totalPrice,
         currency: currency,
         licensePlate: licensePlate,
         truckNumber: truckNumber,
      }).catch(err => console.error("Error calling sendNotificationEmail function:", err));
    }

    console.log('Sending booking details response to client.');
    return NextResponse.json(bookingDetails);

  } catch (error) {
    console.error("Error in /api/confirmation-details route:", error);
     if (error instanceof Error) {
         if (error.name === 'StripeInvalidRequestError') {
             return NextResponse.json({ error: 'Invalid session ID provided.' }, { status: 404 });
         }
         console.error(`Stripe API or other error: ${error.message}`);
         return NextResponse.json({ error: error.message }, { status: 500 });
     }
     return NextResponse.json({ error: 'An unknown error occurred while fetching session details.' }, { status: 500 });
  }
}
