// Register.js
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { googleSignIn, facebookSignIn } from "@/utils/firebase/firebase";

import { emailSignUp } from "@/utils/firebase/firebaseAdminAuth";

import {
  ArrowLeft,
  Eye,
  EyeOff,
  HomeIcon,
  Loader2,
  Mail,
  User,
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { EmailRegisterZod } from "@/utils/typesZod";
import Image from "next/image";
import Link from "next/link";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase/firebase";
import HomeHeader from "@/components/HomeHeader";

interface EmailRegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [channel, setChannel] = useState<null | string>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailRegisterFormValues>({
    resolver: zodResolver(EmailRegisterZod), // performs client-side validation using zod
  });

  const onSubmit = async (data: z.infer<typeof EmailRegisterZod>) => {
    try {
      setIsLoading(true);
      const result = await emailSignUp(data.email, data.password);
      console.log(result);
      const idToken = await result.stsTokenManager.accessToken;
      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      setIsLoading(false);
      if (result) {
        router.push("/verifyAccount");
      }
    } catch (error: any) {
      console.error("Error signing up: ", error);
      setAuthError(error.message); // Update the authError state with the error message
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn(auth);
      router.push("/restaurants"); // Redirect to dashboard after sign in
    } catch (error) {
      console.error("Error with Google sign-in: ", error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn(auth);
      router.push("/restaurants"); // Redirect to dashboard after sign in
    } catch (error) {
      console.error("Error with Facebook sign-in: ", error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-[100vh]">
        {/* <div className="h-[72px] px-[20vw] flex justify-between gap-6 items-center border-b border-[#eee] sticky top-0 bg-white z-[99]">
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
        </div> */}

        <HomeHeader />

        {!channel && (
          <div className="grow space-y-4  w-[360px] content-center mx-auto">
            <div className="text-xl mb-8">Register an account</div>

            <button
              className="w-full bg-[#4d69ba] py-4 text-white flex items-center justify-center gap-2  "
              onClick={handleFacebookSignIn}
            >
              <span>
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  role="presentation"
                  focusable="false"
                  style={{ fill: "white" }}
                >
                  <path d="M22 12C22 6.47715 17.5229 2 12 2C6.47715 2 2 6.47715 2 12C2 16.9913 5.65686 21.1283 10.4375 21.8785V14.8906H7.89844V12H10.4375V9.79688C10.4375 7.29063 11.9304 5.90625 14.2146 5.90625C15.3087 5.90625 16.4531 6.10156 16.4531 6.10156V8.5625H15.1921C13.9499 8.5625 13.5625 9.33334 13.5625 10.1242V12H16.3359L15.8926 14.8906H13.5625V21.8785C18.3431 21.1283 22 16.9913 22 12Z"></path>
                </svg>
              </span>
              <div>Continue with Facebook</div>
            </button>
            <button
              className="w-full border py-4  flex justify-center items-center gap-2  "
              onClick={handleGoogleSignIn}
            >
              <Image
                src="https://cwa.roocdn.com/_next/static/media/google.f4674e20.svg"
                width={24}
                height={24}
                alt="logo"
              ></Image>
              <div>Continue with Google</div>
            </button>

            <button className="w-full bg-[#191919] py-4 text-white flex items-center justify-center gap-2  ">
              <span>
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  role="presentation"
                  focusable="false"
                  style={{ fill: "white" }}
                >
                  <path d="M17.3618 12.4042C17.34 9.92483 19.3927 8.73053 19.4878 8.67131C18.3297 6.99337 16.5336 6.76043 15.8936 6.73477C14.363 6.58375 12.9037 7.63296 12.1299 7.63296C11.3532 7.63296 10.1585 6.75846 8.88641 6.78511C7.21808 6.80879 5.67954 7.7514 4.81962 9.23885C3.09086 12.2424 4.38074 16.6781 6.06888 19.1061C6.89512 20.2965 7.87788 21.6319 9.17272 21.5836C10.42 21.5352 10.8866 20.7801 12.3925 20.7801C13.8954 20.7782 14.3204 21.5816 15.633 21.5589C16.9724 21.5303 17.8234 20.3439 18.6437 19.1486C19.5889 17.7727 19.9792 16.4353 20 16.3672C19.9733 16.3523 17.3915 15.3703 17.3618 12.4042ZM14.5155 5.1269C15.2011 4.29878 15.6638 3.14791 15.5379 2C14.5482 2.04047 13.3495 2.66032 12.6441 3.48449C12.0061 4.21785 11.4533 5.38945 11.6049 6.51367C12.7065 6.59954 13.83 5.95501 14.5155 5.1269Z"></path>
                </svg>
              </span>
              <div>Continue with Apple</div>
            </button>

            <div className="py-[16px] flex gap-4 items-center font-light text-sm">
              <div className="h-[1px] bg-[#cbcbcb] flex grow"></div>
              <div>or</div>
              <div className="h-[1px] bg-[#cbcbcb] flex grow"></div>
            </div>

            <button
              className="w-full bg-[#00ccbb] py-4 text-white flex items-center justify-center gap-2  "
              onClick={() => setChannel("Email")}
            >
              <Mail color="white" size={18} />
              <div>Continue with email</div>
            </button>

            <Link
              href="/login"
              className="font-normal flex justify-center py-4 text-[#00ccbb]"
            >
              Already have an account? Login here
            </Link>

            <div className="font-light text-sm pt-4">
              By continuing you agree to our
              <span className="px-1 underline text-[#00ccbb]">T&Cs</span> and
              <span className="pl-1 underline text-[#00ccbb]">
                Privacy Policy
              </span>
              .
            </div>
          </div>
        )}

        {channel == "Email" && (
          <div className="grow space-y-8  w-[360px] content-center mx-auto">
            <button
              className="w-full mx-auto text-[#00ccbb] font-normal flex items-center gap-2"
              onClick={() => setChannel(null)}
            >
              <ArrowLeft />
              <div>Go Back</div>
            </button>
            <div className="text-xl">Register an account</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="font-normal">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email address
                  </label>
                  <input
                    className={cn(
                      "shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#00ccbb] focus:shadow-outline",
                      errors.email && "border border-rose-400"
                    )}
                    id="email"
                    type="email"
                    placeholder="e.g. name@example.com"
                    {...register("email")}
                  ></input>

                  {errors.email && (
                    <div className="mt-2 text-rose-400 font-light">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    className="block font-normal mt-4  mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className={cn(
                        "shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#00ccbb] focus:shadow-outline",
                        errors.password && "border border-rose-400"
                      )}
                      id="password"
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                    ></input>
                    {isPasswordVisible ? (
                      <EyeOff
                        size={20}
                        className="absolute right-4 top-4 cursor-pointer"
                        onClick={() => setIsPasswordVisible(false)}
                      />
                    ) : (
                      <Eye
                        size={20}
                        className="absolute right-4 top-4 cursor-pointer"
                        onClick={() => setIsPasswordVisible(true)}
                      />
                    )}
                  </div>

                  {errors.password && (
                    <div className="mt-2 text-rose-400 font-light">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    className="block font-normal mt-4  mb-2"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      className={cn(
                        "shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#00ccbb] focus:shadow-outline",
                        errors.confirmPassword && "border border-rose-400"
                      )}
                      id="confirmPassword"
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      placeholder="Re-enter your password"
                      {...register("confirmPassword")}
                    ></input>
                    {isConfirmPasswordVisible ? (
                      <EyeOff
                        size={20}
                        className="absolute right-4 top-4 cursor-pointer"
                        onClick={() => setIsConfirmPasswordVisible(false)}
                      />
                    ) : (
                      <Eye
                        size={20}
                        className="absolute right-4 top-4 cursor-pointer"
                        onClick={() => setIsConfirmPasswordVisible(true)}
                      />
                    )}
                  </div>

                  {errors.confirmPassword && (
                    <div className="mt-2 text-rose-400 font-light">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                </div>
              </div>

              {authError && (
                <div className="w-full p-4 mt-6 font-normal bg-rose-200 text-rose-700">
                  {authError}
                </div>
              )}

              <button
                disabled={isLoading}
                className="w-full py-4 mt-6 flex gap-2 items-center justify-center text-white bg-[#00ccbb] disabled:bg-[#e1e5e6] disabled:text-[#a6b1b3] disabled:cursor-not-allowed"
              >
                {isLoading && (
                  <Loader2 className="animate-spin" size={24} color="white" />
                )}
                <div>Continue</div>
              </button>
              <button className="w-full border py-4 mt-2 text-[#00ccbb] border-[#eee]">
                Forgot Password?
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Register;
