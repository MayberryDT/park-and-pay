"use client";

import { Input } from "@/components/ui/input";

const PaymentForm = () => {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="cardholderName" className="block text-sm font-medium text-foreground">
          Cardholder Name
        </label>
        <Input
          type="text"
          id="cardholderName"
          className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          placeholder="Enter cardholder name"
          required
        />
      </div>
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-foreground">
          Card Number
        </label>
        <Input
          type="text"
          id="cardNumber"
          className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          placeholder="Enter card number"
          required
        />
      </div>
      <div className="flex space-x-4">
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-foreground">
            Expiry Date
          </label>
          <Input
            type="text"
            id="expiryDate"
            className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <label htmlFor="cvv" className="block text-sm font-medium text-foreground">
            CVV
          </label>
          <Input
            type="text"
            id="cvv"
            className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            placeholder="CVV"
            required
          />
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
