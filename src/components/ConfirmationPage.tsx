"use client";

const ConfirmationPage = () => {
  // Dummy data for booking details
  const bookingDetails = {
    bookingId: '1234567890',
    spaceType: 'Truck',
    date: '2024-07-15',
    duration: 7,
    totalPrice: 350,
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Booking Confirmation</h1>
      <div className="border rounded-md p-4">
        <p className="text-sm text-muted-foreground">Booking ID: {bookingDetails.bookingId}</p>
        <p className="text-sm text-muted-foreground">Space Type: {bookingDetails.spaceType}</p>
        <p className="text-sm text-muted-foreground">Date: {bookingDetails.date}</p>
        <p className="text-sm text-muted-foreground">Duration: {bookingDetails.duration} days</p>
        <p className="text-sm text-muted-foreground">Total Price: ${bookingDetails.totalPrice}</p>
        <p className="text-sm text-green-500 mt-4">Payment Successful!</p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
