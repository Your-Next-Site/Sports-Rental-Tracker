import { auth } from "@/auth"
import { NextResponse, NextRequest } from "next/server"
import { Session } from "@auth/core/types";

const requests = new Map();

const rateLimit = (limit: number, interval: number) => {
    return async (req: NextRequest, auth: any) => {
        const url = req.nextUrl.pathname;
        if (url.startsWith('/_next') || url === '/favicon.ico') {
            return null; // Don't rate limit HMR and favicon requests
        }

        const identifier = auth?.user?.email + req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
        console.log("identifier:", identifier)
        if (!requests.has(identifier)) {
            requests.set(identifier, { count: 0, firstRequest: Date.now() });
        }
        const data = requests.get(identifier);
        if (Date.now() - data.firstRequest > interval) {
            // Reset the count every interval
            data.count = 0;
            data.firstRequest = Date.now();
        }
        data.count += 1;
        requests.set(identifier, data);
        if (data.count > limit) {
            return new Response('Too many requests, please try again later.', { status: 429 });
        }
        return null;
    };
};

const limit = rateLimit(Number(process.env.RATE_LIMIT), 60 * 1000);

// Define admin routes array
const adminRoutes = [
    "/admin/confirm-emails",
    "/api/emails"
]

const employeeRoutes = [
    "/main-rental-page",
    "/api/rented-out",
    "/api/search-trips"
]

export default auth(async (req) => {
    // Rate limit
    const rateLimitResponse = await limit(req, req.auth);
    if (rateLimitResponse) {
        return rateLimitResponse;
    }

    // Check employees routes 
    const isEmployeeRoute = employeeRoutes.some(route =>
        req.nextUrl.pathname.includes(route)
    )
    
    if (isEmployeeRoute && !req.auth?.user?.employee) {
        return NextResponse.redirect(new URL("/", req.nextUrl.origin))
    }
    
    // Check if the current path is an admin route
    const isAdminRoute = adminRoutes.some(route =>
        req.nextUrl.pathname.includes(route)
    )
    
    if (isAdminRoute && !req.auth?.user?.admin) {
        return NextResponse.redirect(new URL("/", req.nextUrl.origin))
    }

    return NextResponse.next()
})