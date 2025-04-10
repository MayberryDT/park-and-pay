// src/app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  console.log('Received request for /api/send-email');
  let transporter;
  try {
    const body = await request.json();
    console.log('Email request body:', body);
    // Destructure using the new names sent from confirmation-details
    const { entryDate, exitDate, duration, totalPrice, currency, licensePlate, truckNumber } = body;

    // --- Validate Data (using new field names) ---
    if (!entryDate || !exitDate || !duration || !totalPrice || !currency || !licensePlate || !truckNumber) {
      console.error('Missing email data in request body.');
      // Use consistent field names in error reporting if needed
      return NextResponse.json({ error: 'Missing required data for email.' }, { status: 400 });
    }
    // --- End Validation ---

    console.log('Creating nodemailer transporter...');
    const emailHost = process.env.EMAIL_HOST;
    const emailPort = parseInt(process.env.EMAIL_PORT || "587", 10);
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASSWORD;
    const emailFrom = process.env.EMAIL_FROM;
    const operatorEmail = process.env.OPERATOR_EMAIL;

    console.log(`Using EMAIL_HOST: ${emailHost}`);
    console.log(`Using EMAIL_PORT: ${emailPort}`);
    console.log(`Using EMAIL_USER: ${emailUser}`);
    console.log(`Using EMAIL_PASSWORD: ${emailPass ? '********' : 'Not Set'}`);
    console.log(`Using EMAIL_FROM: ${emailFrom}`);
    console.log(`Using OPERATOR_EMAIL: ${operatorEmail}`);

    if (!emailHost || !emailUser || !emailPass || !emailFrom || !operatorEmail) {
      console.error('Missing required email environment variables.');
      return NextResponse.json({ error: 'Email server configuration is incomplete.' }, { status: 500 });
    }

    transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailPort === 465,
      auth: {
          user: emailUser,
          pass: emailPass,
      },
    });

    console.log('Transporter created. Preparing mail options...');
    // --- Update Email HTML Body --- 
    const mailOptions = {
      from: emailFrom,
      to: operatorEmail,
      subject: 'New Truck Parking Reservation',
      html: `
        <p>A new truck parking reservation has been made:</p>
        <ul>
          <li><strong>Entry Date:</strong> ${entryDate}</li>
          <li><strong>Exit Date:</strong> ${exitDate}</li>
          <li><strong>Duration:</strong> ${duration} days</li>
          <li><strong>Total Price:</strong> ${totalPrice} ${currency.toUpperCase()}</li>
          <li><strong>License Plate:</strong> ${licensePlate}</li>
          <li><strong>Truck Number:</strong> ${truckNumber}</li>
        </ul>
      `,
    };
    // --- End Update Email HTML Body --- 

    console.log('Sending email...');
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully. Message ID:', info.messageId);
    if (process.env.EMAIL_HOST === "smtp.ethereal.email") {
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    return NextResponse.json({ success: true, messageId: info.messageId });

  } catch (error) {
    console.error('Error caught in /api/send-email route:', error);
    if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        if ('code' in error) {
          console.error('Nodemailer error code:', (error as any).code);
        }
        if ('responseCode' in error) {
           console.error('SMTP Response Code:', (error as any).responseCode);
        }
        return NextResponse.json({ error: `Failed to send email: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred while sending the email' }, { status: 500 });
  }
}
