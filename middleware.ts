import { auth } from "@/auth"
import { NextResponse } from "next/server"

// Define admin routes array
const adminRoutes = [
    "/admin/confirm-emails",
    "/api/emails"
]

const employeeRoutes = [
    "/on-the-water",
    "/api/on-the-water",
]

export default auth((req) => {

    // Check employees routes 
    const isEmployeeRoute = employeeRoutes.some(route =>
        req.nextUrl.pathname.includes(route)
    )

    if (isEmployeeRoute && !req.auth?.user?.employee) {
        return Response.redirect(new URL("/", req.nextUrl.origin))
    }

    // Check if the current path is an admin route
    const isAdminRoute = adminRoutes.some(route =>
        req.nextUrl.pathname.includes(route)
    )

    if (isAdminRoute && !req.auth?.user?.admin) {
        return Response.redirect(new URL("https://google.com"))
    }
    return NextResponse.next()
})

// Check for authenticated user
// if (!req.auth) {
//     return Response.redirect(new URL("/auth/login", req.nextUrl.origin))
// }
