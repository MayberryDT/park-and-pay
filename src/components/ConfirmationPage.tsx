"use client";

import { useSearchParams } from 'next/navigation';

interface BookingDetails {
  date: string | null;
  duration: string | null;
}

const ConfirmationPage = () => {
  const searchParams = useSearchParams();

  const bookingDetails: BookingDetails = {
    date: searchParams.get('date'),
    duration: searchParams.get('duration'),
  };

  const totalPrice = bookingDetails.duration ? parseInt(bookingDetails.duration) * 50 : 0;

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Booking Confirmation</h1>
      <div className="rounded-md p-4 bg-secondary">
        <p className="text-sm text-secondary-foreground">Date: {bookingDetails.date}</p>
        <p className="text-sm text-secondary-foreground">Duration: {bookingDetails.duration} days</p>
        <p className="text-sm text-secondary-foreground">Total Price: ${totalPrice}</p>
        <p className="text-sm text-green-500 mt-4">Payment Successful!</p>
      </div>
    </div>
  );
};

export default ConfirmationPage;

