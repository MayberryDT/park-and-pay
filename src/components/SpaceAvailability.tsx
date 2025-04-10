"use client";

import { Button } from "@/components/ui/button";

const SpaceAvailability = () => {
  // Dummy data for available spaces
  const spaces = [
    { id: 1, type: 'Truck', price: 50 },
    { id: 2, type: 'Truck', price: 50 },
    { id: 3, type: 'Truck', price: 50 },
  ];

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-5">Available Spaces</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {spaces.map((space) => (
          <div key={space.id} className="border rounded-md p-4">
            <h3 className="text-lg font-semibold">{space.type} Space</h3>
            <p className="text-sm text-muted-foreground">Price: ${space.price} per day</p>
            <Button className="w-full mt-4">Checkout</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpaceAvailability;
