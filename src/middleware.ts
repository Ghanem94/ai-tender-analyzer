import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value
    const { pathname } = request.nextUrl

    // Paths that require authentication
    const protectedPaths = ["/analysis", "/dashboard"]

    // Paths that require ADMIN role
    const adminPaths = ["/admin"]

    const isProtected = protectedPaths.some((path) => pathname.startsWith(path))
    const isAdminPath = adminPaths.some((path) => pathname.startsWith(path))

    if (isProtected || isAdminPath) {
        if (!token) {
            return NextResponse.redirect(new URL("/", request.url))
        }

        const payload = await verifyToken(token)

        if (!payload) {
            // Invalid token
            const response = NextResponse.redirect(new URL("/", request.url))
            response.cookies.delete("token")
            return response
        }

        if (isAdminPath && payload.role !== "ADMIN") {
            // User trying to access admin area
            return NextResponse.redirect(new URL("/analysis", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/analysis/:path*",
        "/dashboard/:path*",
        "/admin/:path*"
    ],
}
