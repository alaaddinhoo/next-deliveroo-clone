// "use client";
import React, { Suspense, useEffect, useState } from "react";
import { auth, verifyUser } from "@/utils/firebase/firebase";
import Image from "next/image";
import Link from "next/link";
import { HomeIcon, Loader2, MailSearch, User } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { resendVerificationLink } from "@/utils/firebase/firebaseAdminAuth";

import { clientConfig, serverConfig } from "@/utils/firebase/config";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function VerifyEmail() {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });
  if (!tokens) {
    notFound();
  }

  function handleResendVerificationLink() {
    try {
      resendVerificationLink(tokens?.decodedToken.email!);
    } catch (error: any) {
      // setVerificationError(error.message);
    }
  }

  handleResendVerificationLink();

  return (
    <div className="flex flex-col h-[100vh]">
      <div className="h-[72px] px-[20vw] flex justify-between gap-6 items-center border-b border-[#eee] sticky top-0 bg-white z-[99]">
        <Link href="/">
          <Image
            width="131"
            height="122"
            src="https://consumer-component-library.roocdn.com/30.2.0/static/images/logo-teal.svg"
            alt="logo"
          ></Image>
        </Link>

        <div className="flex gap-2 font-light text-[16px]">
          <div className="flex items-center gap-2 px-4 py-2 border-[2px] border-[#eee]">
            <HomeIcon color="#00ccbb" size={16} />
            <Link href="/login">Sign up or log in</Link>
          </div>
          <div className="flex items-center gap-2 px-4 py-2  border-[2px] border-[#eee]">
            <User color="#00ccbb" size={20} />
            <div>Account</div>
          </div>
        </div>
      </div>

      <div className="grow  space-y-4  w-[360px] content-center mx-auto">
        <div className=" mb-8 flex flex-col gap-4 items-center text-center">
          <div className="mb-8 flex flex-col gap-4 items-center text-center">
            <MailSearch size={72} color="#00ccbb" />
            <div className="text-3xl">Verify your email</div>
            <div className="text-[#a6b1b3] font-normal">
              We have sent you an email ({tokens.decodedToken.email}), so check
              your inbox or junk folders to proceed.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
