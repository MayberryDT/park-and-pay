"use client";

import { PaymentForm } from './PaymentForm';
import { Button } from "@/components/ui/button";

const CheckoutPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle checkout logic here
    console.log('Checkout submitted');
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
