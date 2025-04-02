import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Allow requests to the homepage, sign-in page, and auth-related routes
  if (
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname.startsWith("/signin") ||
    req.nextUrl.pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  // Retrieve token from cookies
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  // For debugging (remove in production)
  // console.log("NextAuth token:", token);

  // If no token is found, redirect to the sign-in page with a callbackUrl
  if (!token) {
    const url = new URL("/signin", req.url);
    // Append the original URL so the user can be redirected back after signing in
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // If authenticated, allow the request to proceed
  return NextResponse.next();
}

// Configure the matcher to run middleware for all routes except specified ones
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)",
  ],
};