"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { auth, verifyUser } from "@/utils/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import { HomeIcon, Loader2, MailSearch, User } from "lucide-react";

export default function AccountVerified() {
  const [user, loading] = useAuthState(auth);
  const [verificationError, setVerificationError] = useState<null | string>(
    null
  );
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    const verifyEmail = async () => {
      if (mode === "verifyEmail" && oobCode) {
        try {
          await verifyUser(oobCode);
          console.log(user);
        } catch (error: any) {
          setVerificationError(error.message);
          console.error("Error verifying account: ", error.code);
        }
      }
    };

    verifyEmail();
  }, []);

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
        {user?.emailVerified && !verificationError && (
          <div className="mb-8 flex flex-col gap-4 items-center text-center">
            <MailSearch size={72} color="#00ccbb" />
            <div className="text-3xl">Your account is verified</div>
            <Link href="/login" className="text-[#a6b1b3] font-normal w-full">
              You can now proceed to login to your account.
            </Link>
          </div>
        )}

        {!user?.emailVerified && !verificationError && (
          <div className="mb-8 flex flex-col gap-4 items-center text-center">
            <Loader2 className="animate-spin" size={72} color="#00ccbb" />
            <div className="text-3xl">Verifying your email</div>
            <div className="text-[#a6b1b3] font-normal">
              Hold on while we validate your account. This may take a couple of
              seconds.
            </div>
          </div>
        )}

        {verificationError && (
          <div className="mb-8 flex flex-col gap-4 items-center text-center">
            <Loader2 className="animate-spin" size={72} color="#00ccbb" />
            <div className="text-3xl">An error occured</div>
            <div className="w-full p-4 mt-6 font-normal bg-rose-200 text-rose-700">
              {verificationError}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
