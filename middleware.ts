import { NextRequest, NextResponse } from "next/server";
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from "next-firebase-auth-edge";
import { clientConfig, serverConfig } from "./utils/firebase/config";
import { resendVerificationLink } from "./utils/firebase/firebaseAdminAuth";

const PUBLIC_PATHS = ["/register", "/login", "/verifyAccount"];

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
    handleValidToken: async ({ token, decodedToken }, headers) => {
      // if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
      //   return redirectToHome(request);
      // }
      // above if condition checks if the path exists in the PUBLIC_PATHS and since the token is valid,
      // then if user tries to access /login for example, it performs redirectToHome

      console.log(request.nextUrl.pathname);

      if (
        request.nextUrl.pathname == "/verifyAccount" &&
        decodedToken.email_verified
      ) {
        return redirectToHome(request);
      }

      if (request.nextUrl.pathname == "/accountVerified") {
        return NextResponse.next({
          request: {
            headers,
          },
        });
      }

      console.log(decodedToken);

      // Check if the email is verified
      if (!decodedToken.email_verified) {
        // If the user is not on /verifyAccount, redirect them there
        if (request.nextUrl.pathname !== "/verifyAccount") {
          return NextResponse.redirect(new URL("/verifyAccount", request.url));
        }
      }

      return NextResponse.next({
        request: {
          headers,
        },
      });
    },
    handleInvalidToken: async (reason) => {
      console.info("Missing or malformed credentials", { reason });

      return redirectToLogin(request, {
        path: "/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });

      return redirectToLogin(request, {
        path: "/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
  });
}

export const config = {
  matcher: ["/", "/((?!_next|api|.*\\.).*)", "/api/login", "/api/logout"],
};
