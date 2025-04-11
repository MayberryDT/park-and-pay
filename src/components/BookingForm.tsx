'use client';
//@ts-expect-error

import { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, differenceInCalendarDays, isValid, isAfter } from "date-fns"; // Added isAfter
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { loadStripe } from '@stripe/stripe-js';

const DAILY_RATE = 10;
const WEEKLY_RATE = 65;
const BASE_MONTHLY_RATE = 275;
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30;
const COUPON_CODE = 'LOCAL175';
const COUPON_MONTHLY_RATE = 175;

const calculatePrice = (durationDays: number, couponApplied: boolean): number => {
    if (durationDays <= 0) return 0;

    const effectiveMonthlyRate = couponApplied ? COUPON_MONTHLY_RATE : BASE_MONTHLY_RATE;

    let months = Math.floor(durationDays / DAYS_IN_MONTH);
    let remainingDaysAfterMonths = durationDays % DAYS_IN_MONTH;
    let weeks = Math.floor(remainingDaysAfterMonths / DAYS_IN_WEEK);
    let remainingDays = remainingDaysAfterMonths % DAYS_IN_WEEK;
    let priceForRemainingDays = Math.min(
        weeks * WEEKLY_RATE + remainingDays * DAILY_RATE,
        Math.ceil(remainingDaysAfterMonths / DAYS_IN_WEEK) * WEEKLY_RATE,
        remainingDaysAfterMonths * DAILY_RATE
    );
    let calculatedPrice = months * effectiveMonthlyRate + priceForRemainingDays;

    return Math.min(
        calculatedPrice,
        durationDays * DAILY_RATE,
        Math.ceil(durationDays / DAYS_IN_WEEK) * WEEKLY_RATE,
        Math.ceil(durationDays / DAYS_IN_MONTH) * effectiveMonthlyRate
    );
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const BookingForm = () => {
    const [entryDate, setEntryDate] = useState<Date | undefined>(undefined);
    const [exitDate, setExitDate] = useState<Date | undefined>(undefined);
    const [duration, setDuration] = useState(0);
    const [licensePlate, setLicensePlate] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [truckNumber, setTruckNumber] = useState<string>('');

    useEffect(() => {
        // Initialize entryDate with the current date only on the client-side
        setEntryDate(new Date());
    }, []);

    useEffect(() => {
        let currentCouponApplied = false;
        if (couponCode.toUpperCase() === COUPON_CODE) {
            currentCouponApplied = true;
            if (!couponApplied) {
                toast({ title: "Coupon Applied", description: `Monthly rate adjusted to $${COUPON_MONTHLY_RATE}.` });
            }
        } else if (couponApplied && couponCode !== '') {
            toast({ title: "Coupon Removed", description: "Coupon code is invalid or removed.", variant: "destructive" });
        }
        setCouponApplied(currentCouponApplied);

        // Corrected duration calculation: exit date must be strictly AFTER entry date
        if (entryDate && exitDate && isAfter(exitDate, entryDate)) {
            const days = differenceInCalendarDays(exitDate, entryDate); // Removed +1
            setDuration(days);
            setTotalPrice(calculatePrice(days, currentCouponApplied));
        } else {
            setDuration(0);
            setTotalPrice(0);
        }
    }, [entryDate, exitDate, couponCode, couponApplied, toast]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Enhanced validation using the state `duration` which is now correctly calculated
        if (!entryDate || !exitDate || duration <= 0 || !licensePlate || !truckNumber) {
            let description = "Please ensure all fields are filled correctly. ";
            if (!entryDate) description += "Select a valid entry date. ";
            if (!exitDate) description += "Select a valid exit date. ";
            if (entryDate && exitDate && duration <= 0) {
                 description += "Exit date must be after the entry date. ";
            } else if (duration <= 0 && entryDate && exitDate) { // Catch if dates are same
                 description += "Entry and Exit dates cannot be the same. ";
            }
            if (!licensePlate) description += "License plate is required. ";
            if (!truckNumber) description += "Truck number is required. ";
            toast({
                title: "Error",
                description: description.trim(),
                variant: "destructive",
            });
            setIsLoading(false);
            return;
        }

        const finalCouponApplied = couponCode.toUpperCase() === COUPON_CODE;
        if (couponCode && !finalCouponApplied) {
            toast({
                title: "Invalid Coupon",
                description: "The entered coupon code is not valid. Proceeding without discount.",
                variant: "destructive",
            });
        }

        try {
            // Send the correctly calculated client-side duration and price for backend validation
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: format(entryDate, "yyyy-MM-dd"),
                    exitDate: format(exitDate, "yyyy-MM-dd"),
                    duration: duration.toString(), // Use state duration
                    price: totalPrice.toString(), // Use state total price
                    licensePlate: licensePlate,
                    truckNumber: truckNumber,
                    couponCode: finalCouponApplied ? couponCode : undefined,
                }),
            });

            const session = await response.json();

            if (!response.ok) {
                // Display specific error from backend if available
                throw new Error(session.error || 'Failed to create checkout session.');
            }

            if (session.sessionId) {
                const stripe = await stripePromise;
                if (!stripe) {
                    throw new Error('Stripe.js failed to load.');
                }
                const { error } = await stripe.redirectToCheckout({
                    sessionId: session.sessionId,
                });
                if (error) {
                    console.error("Stripe redirect error:", error);
                    toast({
                        title: "Checkout Error",
                        description: error.message || "Failed to redirect to Stripe.",
                        variant: "destructive",
                    });
                }
            } else {
                throw new Error('No session ID received from server.');
            }
        } catch (error) {
            console.error("Checkout failed:", error);
            toast({
                title: "Checkout Failed",
                description: error instanceof Error ? error.message : "An unexpected error occurred during checkout.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const today = new Date(new Date().setHours(0, 0, 0, 0));

    return (
        <>
            <div className="text-center text-2xl font-semibold text-slate-gray mb-4">
                JRiley Park & Pay
            </div>
            <h1 className="text-center">
                Book Your Parking Space
            </h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto space-y-4 p-4 bg-ivory/80"
            >
                <div>
                    <Label htmlFor="entryDate" className="block text-sm font-medium text-slate-gray mb-1 font-bold">
                        Select Entry Date
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !entryDate && "text-stone-gray"
                                )}
                                id="entryDate"
                            >
                                {entryDate ? format(entryDate, "PPP") : (
                                    <span>Pick an entry date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={entryDate}
                                onSelect={(selectedDate) => {
                                    setEntryDate(selectedDate);
                                    // Also clear exit date if the new entry date is after the current exit date
                                    if (exitDate && selectedDate && isAfter(selectedDate, exitDate)) {
                                        setExitDate(undefined); 
                                    }
                                }}
                                disabled={(d) => d < today}
                                initialFocus
                                className="custom-calendar"
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div>
                    <Label htmlFor="exitDate" className="block text-sm font-medium text-slate-gray mb-1 font-bold">
                        Select Exit Date
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !exitDate && "text-stone-gray"
                                )}
                                id="exitDate"
                                disabled={!entryDate} // Keep disabled if no entry date
                            >
                                {exitDate ? format(exitDate, "PPP") : (
                                    <span>Pick an exit date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={exitDate}
                                onSelect={setExitDate}
                                // Ensure exit date cannot be before or the same as entry date
                                disabled={(d) => !entryDate || d <= entryDate}
                                initialFocus
                                className="custom-calendar"
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div>
                    <Label htmlFor="couponCode" className="block text-sm font-medium text-slate-gray mb-1 font-bold">
                        Coupon Code (Optional)
                    </Label>
                    <Input
                        type="text"
                        id="couponCode"
                        className="block w-full rounded-md border-input bg-ivory border-2 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-stone-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                    />
                    {couponApplied && (
                        <p className="text-sm text-green-600 mt-1">Coupon 'LOCAL175' applied! Monthly rate is now $175.</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="licensePlate" className="block text-sm font-medium text-slate-gray mb-1 font-bold">
                        License Plate Number
                    </Label>
                    <Input
                        type="text"
                        id="licensePlate"
                        className="block w-full rounded-md border-input bg-ivory border-2 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-stone-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        placeholder="Enter license plate number"
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="truckNumber" className="block text-sm font-medium text-slate-gray mb-1 font-bold">
                        Truck Number
                    </Label>
                    <Input
                        type="text"
                        id="truckNumber"
                        className="block w-full rounded-md border-input bg-ivory border-2 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-stone-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={truckNumber}
                        onChange={(e) => setTruckNumber(e.target.value)}
                        placeholder="Enter truck number"
                        required
                    />
                </div>

                {duration > 0 && (
                    <div className="text-md text-stone-gray">
                        Duration: {duration} day(s)
                    </div>
                )}

                {totalPrice > 0 && (
                    <div className="text-lg font-semibold text-slate-gray">
                        Total Price: ${totalPrice}
                    </div>
                )}

                {/* Updated Button with specific blue background */}
                <Button
                    type="submit"
                    className="w-full bg-[#003366] text-white hover:bg-[#002244] focus-visible:ring-[#003366]"
                    // Ensure button is disabled if duration is 0 or less
                    disabled={isLoading || duration <= 0 || totalPrice <= 0 || !licensePlate || !truckNumber || !entryDate || !exitDate}
                >
                    {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                </Button>
            </form>
        </>
    );
};

export default BookingForm;
