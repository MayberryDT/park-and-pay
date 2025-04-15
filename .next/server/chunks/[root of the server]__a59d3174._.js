module.exports = {

"[project]/.next-internal/server/app/api/checkout/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/@opentelemetry/api [external] (@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("@opentelemetry/api", () => require("@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/child_process [external] (child_process, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}}),
"[project]/src/app/api/checkout/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/app/api/checkout/route.ts
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/stripe/esm/stripe.esm.node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.mjs [app-route] (ecmascript) <locals>"); // Import date-fns functions
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/parseISO.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/differenceInCalendarDays.mjs [app-route] (ecmascript)");
;
;
;
const stripe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-03-31.basil'
});
// Function to recalculate duration server-side
const calculateDurationServerSide = (entryDateStr, exitDateStr)=>{
    try {
        const entry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseISO"])(entryDateStr);
        const exit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseISO"])(exitDateStr);
        if (exit <= entry) return 0; // Ensure exit date is after entry date
        // Calculate the difference in days (number of nights)
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["differenceInCalendarDays"])(exit, entry);
    } catch (e) {
        console.error("Error parsing dates for duration calculation:", e);
        return 0;
    }
};
// --- Price calculation logic --- 
const calculatePriceServerSide = (durationDays, couponCode)=>{
    console.log(`[calculatePriceServerSide] Duration: ${durationDays}, Coupon Received: '${couponCode}'`); // DEBUG
    const DAILY_RATE = 10;
    const WEEKLY_RATE = 65;
    const MONTHLY_RATE = 275;
    const DAYS_IN_WEEK = 7;
    const DAYS_IN_MONTH = 30;
    if (durationDays <= 0) return 0;
    let months = Math.floor(durationDays / DAYS_IN_MONTH);
    let remainingDaysAfterMonths = durationDays % DAYS_IN_MONTH;
    let weeks = Math.floor(remainingDaysAfterMonths / DAYS_IN_WEEK);
    let remainingDays = remainingDaysAfterMonths % DAYS_IN_WEEK;
    let priceForRemainingDays = Math.min(weeks * WEEKLY_RATE + remainingDays * DAILY_RATE, Math.ceil(remainingDaysAfterMonths / DAYS_IN_WEEK) * WEEKLY_RATE, remainingDaysAfterMonths * DAILY_RATE);
    let calculatedPrice = months * MONTHLY_RATE + priceForRemainingDays;
    let finalPrice = Math.min(calculatedPrice, durationDays * DAILY_RATE, Math.ceil(durationDays / DAYS_IN_WEEK) * WEEKLY_RATE, Math.ceil(durationDays / DAYS_IN_MONTH) * MONTHLY_RATE);
    console.log(`[calculatePriceServerSide] Price before coupon: ${finalPrice}`); // DEBUG
    if (couponCode && couponCode.toUpperCase() === 'LOCAL175') {
        console.log(`[calculatePriceServerSide] Applying LOCAL175 coupon.`); // DEBUG
        finalPrice = 175;
    } else {
        console.log(`[calculatePriceServerSide] Coupon '${couponCode}' not applied or invalid.`); // DEBUG
    }
    console.log(`[calculatePriceServerSide] Final price: ${finalPrice}`); // DEBUG
    return finalPrice;
};
async function POST(request) {
    try {
        const body = await request.json();
        const { date: entryDate, exitDate, duration, price, licensePlate, truckNumber, couponCode } = body;
        console.log("[POST /api/checkout] Received request body:", body); // DEBUG: Log entire body
        // Validate Dates, Duration, and Price
        if (!entryDate || !exitDate || !duration || !price || !licensePlate || !truckNumber) {
            console.error("[POST /api/checkout] Error: Missing required booking details", body); // DEBUG
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Missing required booking details'
            }, {
                status: 400
            });
        }
        // Recalculate duration on the server for security
        const serverCalculatedDuration = calculateDurationServerSide(entryDate, exitDate);
        const clientDurationNum = parseInt(duration, 10);
        console.log(`[POST /api/checkout] Server Duration: ${serverCalculatedDuration}, Client Duration: ${clientDurationNum}`); // DEBUG
        if (serverCalculatedDuration <= 0 || isNaN(clientDurationNum)) {
            console.warn(`[POST /api/checkout] Duration mismatch/invalid: Client=${duration}, Server=${serverCalculatedDuration}. Handling...`); // DEBUG
            if (serverCalculatedDuration <= 0) {
                if (entryDate === exitDate) {
                    console.error("[POST /api/checkout] Error: Entry and Exit dates cannot be the same."); // DEBUG
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Entry and Exit dates cannot be the same.'
                    }, {
                        status: 400
                    });
                } else {
                    console.error("[POST /api/checkout] Error: Invalid entry/exit date combination."); // DEBUG
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Invalid entry/exit date combination. Exit date must be after entry date.'
                    }, {
                        status: 400
                    });
                }
            }
        // If duration mismatch, maybe still proceed? For now, we proceed based on server duration if > 0
        }
        // Recalculate price on the server based on the *server-calculated* duration and received coupon
        const serverCalculatedPrice = calculatePriceServerSide(serverCalculatedDuration, couponCode);
        const clientPriceNum = parseFloat(price);
        console.log(`[POST /api/checkout] Server Price: ${serverCalculatedPrice}, Client Price: ${clientPriceNum}, Coupon Code Provided: '${couponCode}'`); // DEBUG
        // Price validation/warning (using server price regardless)
        if (isNaN(clientPriceNum) || serverCalculatedPrice !== clientPriceNum) {
            console.warn(`[POST /api/checkout] Price mismatch: Client=${clientPriceNum}, Server=${serverCalculatedPrice}. Using server price.`);
        }
        const priceInCents = serverCalculatedPrice * 100;
        if (priceInCents <= 0) {
            console.error("[POST /api/checkout] Error: Calculated price must be positive.", {
                serverCalculatedPrice
            }); // DEBUG
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Calculated price must be positive.'
            }, {
                status: 400
            });
        }
        console.log(`[POST /api/checkout] Final price in cents for Stripe: ${priceInCents}`); // DEBUG
        // Format dates for display
        const formattedEntryDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseISO"])(entryDate), "PPP");
        const formattedExitDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseISO"])(exitDate), "PPP");
        const description = `Truck Parking: ${formattedEntryDate} to ${formattedExitDate} (${serverCalculatedDuration} day${serverCalculatedDuration === 1 ? '' : 's'}). Plate: ${licensePlate}, Truck: ${truckNumber}`;
        // Define success and cancel URLs
        let YOUR_DOMAIN = ("TURBOPACK compile-time value", "https://6000-idx-studio-1744300334933.cluster-3ch54x2epbcnetrm6ivbqqebjk.cloudworkstations.dev") || 'http://localhost:9002';
        if (!YOUR_DOMAIN) {
            console.error("[POST /api/checkout] CRITICAL ERROR: NEXT_PUBLIC_APP_URL is not set!");
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Server configuration error.'
            }, {
                status: 500
            });
        }
        if (YOUR_DOMAIN.endsWith('/')) {
            YOUR_DOMAIN = YOUR_DOMAIN.slice(0, -1);
        }
        const successUrl = `${YOUR_DOMAIN}/confirmation?session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${YOUR_DOMAIN}/`;
        console.log(`[POST /api/checkout] Stripe URLs: Success=${successUrl}, Cancel=${cancelUrl}`); // DEBUG
        // Create a Stripe Checkout Session
        console.log("[POST /api/checkout] Creating Stripe session..."); // DEBUG
        const session = await stripe.checkout.sessions.create({
            payment_method_types: [
                'card'
            ],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Truck Parking Spot Reservation',
                            description: description,
                            images: []
                        },
                        unit_amount: priceInCents
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
                entryDate: entryDate,
                exitDate: exitDate,
                durationDays: serverCalculatedDuration.toString(),
                licensePlate: licensePlate,
                truckNumber: truckNumber
            }
        });
        console.log("[POST /api/checkout] Stripe session created successfully:", session.id); // DEBUG
        // Return the session ID to the frontend
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            sessionId: session.id
        });
    } catch (error) {
        console.error("[POST /api/checkout] Error creating Stripe session:", error); // DEBUG
        if (error instanceof Error) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: error.message
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'An unknown error occurred'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__a59d3174._.js.map