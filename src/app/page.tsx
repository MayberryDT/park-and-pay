import BookingForm from '@/components/BookingForm';
import SpaceAvailability from '@/components/SpaceAvailability';

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Book Your Parking Space</h1>
      <BookingForm />
      <SpaceAvailability />
    </div>
  );
}
