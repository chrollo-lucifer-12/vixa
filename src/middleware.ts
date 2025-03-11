import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Allowed Origins for CORS
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

const corsOptions = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

// Define protected routes
const isProtectedRoutes = createRouteMatcher(["/dashboard(.*)", "/payment(.*)"]);

export default clerkMiddleware(async (authPromise, req: NextRequest) => {
    const origin = req.headers.get("origin") ?? "";
    const isAllowedOrigin = allowedOrigins.includes(origin);

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        const preflightHeaders = {
            ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
            ...corsOptions,
        };

        return NextResponse.json({}, { headers: preflightHeaders });
    }

    // Await auth object from Promise
    const authObj = await authPromise;

    // Protect protected routes
    if (isProtectedRoutes(req)) {
        await authObj.protect(); // Ensure protection for these routes
    }

    // Handle simple requests (non-OPTIONS)
    const response = NextResponse.next();

    // Set CORS headers if allowed
    if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    }

    // Add CORS options headers
    Object.entries(corsOptions).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
});

export const config = {
    matcher: [
        // Correct regex pattern for skipping Next.js internals and static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
