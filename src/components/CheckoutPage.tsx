"use client";

import PaymentForm from './PaymentForm';
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from 'next/navigation';

const CheckoutPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const date = searchParams.get('date');
  const duration = searchParams.get('duration');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle checkout logic here

    // Redirect to confirmation page with booking details
    router.push(`/confirmation?date=${date}&duration=${duration}`);
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Checkout</h1>
      <PaymentForm />
      <Button onClick={handleSubmit} className="w-full mt-5">
        Complete Payment
      </Button>
    </div>
  );
};

export default CheckoutPage;
