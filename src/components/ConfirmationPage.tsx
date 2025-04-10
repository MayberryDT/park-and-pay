"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

// Update interface to match data from API
interface BookingConfirmationDetails {
  entryDate: string | null; // Expecting formatted date string
  exitDate: string | null;  // Expecting formatted date string
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
        // API returns the new structure with entryDate and exitDate
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

  if (loading) {
    // Loading skeleton remains the same
     return (
      <div className="max-w-md mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5 text-slate-gray">Booking Confirmation</h1>
         <Card>
           <CardHeader>
             <Skeleton className="h-6 w-3/4" />
           </CardHeader>
           <CardContent className="space-y-3">
             <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-full mt-4 bg-green-100" />
           </CardContent>
         </Card>
      </div>
    );
  }

   if (error) {
    // Error alert remains the same
      return (
        <div className="max-w-md mx-auto py-10">
           <h1 className="text-2xl font-bold mb-5 text-destructive">Booking Confirmation Error</h1>
           <Alert variant="destructive">
             <Terminal className="h-4 w-4" />
             <AlertTitle>Error</AlertTitle>
             <AlertDescription>
               {error}
             </AlertDescription>
           </Alert>
         </div>
     );
   }

  if (!bookingDetails || bookingDetails.paymentStatus !== 'paid') {
    // Payment not completed alert remains the same
      return (
       <div className="max-w-md mx-auto py-10">
         <h1 className="text-2xl font-bold mb-5 text-slate-gray">Booking Confirmation</h1>
          <Alert variant="destructive">
             <Terminal className="h-4 w-4" />
             <AlertTitle>Payment Not Completed</AlertTitle>
             <AlertDescription>
               The payment for this session was not successful or the details could not be retrieved. Please try booking again or contact support.
             </AlertDescription>
           </Alert>
       </div>
     );
   }

  // Use updated fields in the display
  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5 text-slate-gray">Booking Confirmation</h1>
      <Card>
        <CardHeader>
          <CardTitle>Reservation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-gray">
           {/* Update displayed labels and use new state fields */}
           <p><span className="font-semibold">Entry Date:</span> {bookingDetails.entryDate || 'N/A'}</p>
           <p><span className="font-semibold">Exit Date:</span> {bookingDetails.exitDate || 'N/A'}</p>
           <p><span className="font-semibold">Duration:</span> {bookingDetails.duration || 'N/A'} days</p>
           <p><span className="font-semibold">Total Price:</span> ${bookingDetails.totalPrice?.toFixed(2) ?? 'N/A'} {bookingDetails.currency.toUpperCase()}</p>
           <p><span className="font-semibold">License Plate:</span> {bookingDetails.licensePlate || 'N/A'}</p>
           <p><span className="font-semibold">Truck Number:</span> {bookingDetails.truckNumber || 'N/A'}</p>
           <p className="text-sage-green font-semibold pt-4">Payment Successful!</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmationPage;
