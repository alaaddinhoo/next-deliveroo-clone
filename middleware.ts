import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/utils/firebase/firebaseAdmin"; // Adjust the path based on your project structure
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/utils/firebase/firebase";

// Define public paths that do not require authentication
const PUBLIC_PATHS = ["/", "/login", "/signup"]; // Add more paths as needed

export async function middleware(request: NextRequest) {
  return NextResponse.next(); // Allow access to public paths without further checks
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Check if the current path is in PUBLIC_PATHS
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next(); // Allow access to public paths without further checks
  }

  const tokenCookie = request.cookies.get("__session");

  // Custom response for debugging
  return new NextResponse(
    JSON.stringify({
      message: "Debugging Middleware",
      requestUrl: request.url,
      pathname,
      tokenCookie,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );

  if (!tokenCookie) {
    // Redirect to login if no token is found
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    // Verify Firebase ID token
    const user = await verifyAuthToken(tokenCookie);

    if (!user) {
      // If verification fails, redirect to login
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // Allow access to protected routes
    return NextResponse.next();
  } catch (error: any) {
    console.error("Error verifying auth token:", error.message);
    // Redirect to login on error
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

async function verifyAuthToken(token: any) {
  try {
    // Verify Firebase auth token
    const userCredential = await signInWithCustomToken(auth, token);
    return userCredential.user;
  } catch (error: any) {
    console.error("Firebase authentication error:", error.message);
    throw error;
  }
}

// Configuration for middleware to apply to specific routes
export const config = {
  matcher: ["/restaurants"], // Define routes to protect (all the above code applies on these)
};
