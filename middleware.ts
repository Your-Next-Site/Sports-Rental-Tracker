import { auth } from "@/auth"
import { NextResponse, NextRequest } from "next/server"

const requests = new Map();

const rateLimit = (limit: number, interval: number) => {
    return async (req: NextRequest) => {
        const url = req.nextUrl.pathname;
        if (url.startsWith('/_next') || url === '/favicon.ico') {
            return null; // Don't rate limit HMR and favicon requests
        }

        const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
        console.log("ip:", ip)
        if (!requests.has(ip)) {
            requests.set(ip, { count: 0, firstRequest: Date.now() });
        }
        const data = requests.get(ip);
        if (Date.now() - data.firstRequest > interval) {
            // Reset the count every interval
            data.count = 0;
            data.firstRequest = Date.now();
        }
        data.count += 1;
        requests.set(ip, data);
        if (data.count > limit) {
            return new Response('Too many requests, please try again later.', { status: 429 });
        }
        return null;
    };
};

const limit = rateLimit(100, 60 * 1000);

// Define admin routes array
const adminRoutes = [
    "/admin/confirm-emails",
    "/api/emails"
]

const employeeRoutes = [
    "/on-the-water",
    "/api/on-the-water",
    "/api/search-trips"
]

export default auth(async (req) => {
    // Rate limit
    const rateLimitResponse = await limit(req);
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