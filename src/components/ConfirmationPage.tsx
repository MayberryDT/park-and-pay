"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image'; // Import next/image
import logo from './images/logo.png'; // Import the logo
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, CheckCircle } from "lucide-react"; // Added CheckCircle for success

// Interface remains the same
interface BookingConfirmationDetails {
  entryDate: string | null;
  exitDate: string | null;
  duration: string | null;
  totalPrice: number | null;
  currency: string;
  paymentStatus: string | null;
  licensePlate: string | null;
  truckNumber: string | null;
}

const ConfirmationPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [bookingDetails, setBookingDetails] = useState<BookingConfirmationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found in URL.");
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/confirmation-details?session_id=${sessionId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to fetch details: ${response.statusText}`);
        }
        const data: BookingConfirmationDetails = await response.json();
        setBookingDetails(data);
      } catch (err) {
        console.error("Error fetching confirmation details:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [sessionId]);

  const renderLogo = () => (
    <div className="flex justify-center mb-6">
      <Image
        src={logo}
        alt="JRiley Park & Pay Logo"
        width={250} // Adjust width as needed
        height={60} // Adjust height as needed
        className="h-auto" // Maintain aspect ratio
        priority // Load logo eagerly
      />
    </div>
  );

  // Styled Loading State
  if (loading) {
     return (
      <div className="max-w-xl mx-auto py-10 px-4 md:px-0">
        {renderLogo()}
        <Card className="shadow-lg border border-gray-200 rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 p-4 border-b border-gray-200">
            <Skeleton className="h-7 w-3/5 bg-gray-300 rounded" />
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-5 w-full bg-gray-200 rounded" />
            <Skeleton className="h-5 w-full bg-gray-200 rounded" />
            <Skeleton className="h-5 w-full bg-gray-200 rounded" />
            <Skeleton className="h-5 w-4/6 bg-gray-200 rounded" />
            <Skeleton className="h-8 w-full mt-5 bg-green-200 rounded" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Styled Error State
   if (error) {
      return (
        <div className="max-w-xl mx-auto py-10 px-4 md:px-0">
           {renderLogo()}
           <Alert variant="destructive" className="bg-red-50 border-red-500 text-red-800 rounded-lg shadow">
             <Terminal className="h-5 w-5" />
             <AlertTitle className="font-semibold">Booking Confirmation Error</AlertTitle>
             <AlertDescription>
               {error}
             </AlertDescription>
           </Alert>
         </div>
     );
   }

  // Styled Payment Not Completed State
  if (!bookingDetails || bookingDetails.paymentStatus !== 'paid') {
      return (
       <div className="max-w-xl mx-auto py-10 px-4 md:px-0">
         {renderLogo()}
          <Alert variant="destructive" className="bg-yellow-50 border-yellow-500 text-yellow-800 rounded-lg shadow">
             <Terminal className="h-5 w-5" />
             <AlertTitle className="font-semibold">Payment Issue</AlertTitle>
             <AlertDescription>
               {bookingDetails?.paymentStatus ? `The payment status is '${bookingDetails.paymentStatus}'. ` : "Could not retrieve payment details. "}
               Please try booking again or contact support if payment was made.
             </AlertDescription>
           </Alert>
       </div>
     );
   }

  // Styled Success State
  return (
    <div className="max-w-xl mx-auto py-10 px-4 md:px-0">
      {renderLogo()}
      <Card className="shadow-lg border border-gray-200 rounded-lg overflow-hidden">
        <CardHeader className="bg-gray-50 p-4 border-b border-gray-200">
          <CardTitle className="text-xl text-gray-800">Reservation Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Entry Date:</span>
            <span className="text-gray-800">{bookingDetails.entryDate || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Exit Date:</span>
            <span className="text-gray-800">{bookingDetails.exitDate || 'N/A'}</span>
           </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Duration:</span>
            <span className="text-gray-800">{bookingDetails.duration || 'N/A'} days</span>
           </div>
           <div className="flex justify-between">
            <span className="font-medium text-gray-600">License Plate:</span>
            <span className="text-gray-800">{bookingDetails.licensePlate || 'N/A'}</span>
          </div>
           <div className="flex justify-between border-b border-gray-100 pb-3 mb-3">
            <span className="font-medium text-gray-600">Truck Number:</span>
            <span className="text-gray-800">{bookingDetails.truckNumber || 'N/A'}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
             <span className="text-gray-700">Total Price:</span>
             <span className="text-gray-900">
               ${bookingDetails.totalPrice?.toFixed(2) ?? 'N/A'} {bookingDetails.currency.toUpperCase()}
             </span>
           </div>
           <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center space-x-2">
             <CheckCircle className="h-5 w-5 text-green-600" />
             <p className="text-green-700 font-medium text-sm">Payment Successful! Your booking is confirmed.</p>
           </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmationPage;
