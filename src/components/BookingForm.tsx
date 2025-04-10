"use client";

import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"

const BookingForm = () => {
  const [spaceType, setSpaceType] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted', { spaceType, date, duration });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="spaceType" className="block text-sm font-medium text-foreground">
          Space Type
        </label>
        <select
          id="spaceType"
          className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          value={spaceType}
          onChange={(e) => setSpaceType(e.target.value)}
          required
        >
          <option value="">Select Space Type</option>
          <option value="truck">Truck</option>
          <option value="trailer">Trailer</option>
          <option value="rv">RV</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-foreground">
          Booking Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "PPP") : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) =>
                date < new Date()
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="mb-4">
        <label htmlFor="duration" className="block text-sm font-medium text-foreground">
          Duration (days)
        </label>
        <Input
          type="number"
          id="duration"
          className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">Check Availability</Button>
    </form>
  );
};

export default BookingForm;
