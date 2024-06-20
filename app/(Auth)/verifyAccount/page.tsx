"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, verifyUser } from "@/utils/firebase/firebase";
import Image from "next/image";
import Link from "next/link";
import { HomeIcon, Loader2, MailSearch, User } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { resendVerificationLink } from "@/utils/firebase/firebaseAdminAuth";

const VerifyEmail = () => {
  const [user, loading] = useAuthState(auth);
  const [verificationError, setVerificationError] = useState<null | string>(
    null
  );
  const [userVerified, setUserVerified] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");
  const email = searchParams.get("email");

  function handleResendVerificationLink() {
    try {
      resendVerificationLink(email || "null");
    } catch (error: any) {
      setVerificationError(error.message);
    }
  }

  useEffect(() => {
    console.log(email);
    if (user && user.emailVerified) {
      router.push("/restaurants"); // Redirect to dashboard if verified
    }

    const verifyEmail = async () => {
      if (mode === "verifyEmail" && oobCode) {
        try {
          await verifyUser(oobCode);
          setUserVerified(true);
          console.log(user);
        } catch (error: any) {
          setVerificationError(error.message);
          console.error("Error verifying email: ", error.code);
        }
      }
    };

    verifyEmail();
  }, [user]);

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
          {userVerified && !verificationError && (
            <div className="mb-8 flex flex-col gap-4 items-center text-center">
              <MailSearch size={72} color="#00ccbb" />
              <div className="text-3xl">Your account is verified</div>
              <div className="text-[#a6b1b3] font-normal w-full">
                You can now proceed to login to your account.
              </div>
            </div>
          )}

          {!userVerified ||
            (false && (
              <div className="mb-8 flex flex-col gap-4 items-center text-center">
                {mode === "verifyEmail" && oobCode && !verificationError ? (
                  <Loader2 className="animate-spin" size={72} color="#00ccbb" />
                ) : (
                  <MailSearch size={72} color="#00ccbb" />
                )}
                <div className="text-3xl">Verify your email</div>
                <div className="text-[#a6b1b3] font-normal">
                  We have sent you an email, so check your inbox or junk folders
                  to proceed.
                </div>
              </div>
            ))}
        </div>

        {verificationError && (
          <div className="w-full p-4 mt-6 font-normal bg-rose-200 text-rose-700">
            {verificationError}
          </div>
        )}

        {userVerified && !verificationError ? (
          <Link
            href="/login"
            className="flex grow justify-center text-[white] py-4 bg-[#00ccbb]"
          >
            Proceed to login
          </Link>
        ) : (
          <button
            disabled={!!((!mode || !oobCode || !email) && verificationError)}
            className="w-full text-[white] py-4 bg-[#00ccbb] disabled:bg-[#e1e5e6] disabled:text-[#a6b1b3] disabled:cursor-not-allowed"
            onClick={handleResendVerificationLink}
          >
            Resend Verification Link
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
