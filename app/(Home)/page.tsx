"use client";

import { useEffect, useState } from "react";
import { batchPostJsonDocuments } from "@/utils/firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import brandImage from "@logo/logo.svg";
import Image from "next/image";
import {
  ChevronDown,
  HomeIcon,
  LocateIcon,
  LogOut,
  Menu,
  ShoppingBasketIcon,
  User2,
} from "lucide-react";
import { AppleDownloadButton } from "@/app/(Home)/components/AppleDownloadButton";
import { GoogleDownloadButton } from "@/app/(Home)/components/GoogleDownloadButton";
import Link from "next/link";
import { SvgComponent as LeftSvgComponent } from "./components/LeftSvgComponent";
import { SvgComponent as RightSvgComponent } from "./components/RightSvgComponent";
import { Footer } from "@/components/Footer";
import { auth } from "@/utils/firebase/firebase";

import { BrandsSplide } from "./components/BrandsSplide";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  return (
    <>
      {/* First Section */}
      <div className="h-[55vh] md:h-[75vh] bg-[#f0f0f0] relative">
        {/* Header */}
        <div className="relative z-[100] flex justify-between items-center px-12 md:px-[64px] py-4">
          <div className="bg-white px-2">
            <Image width={121} height={32} src={brandImage} alt="home page" />
          </div>

          <div className="flex items-start md:hidden">
            <Sheet>
              <SheetTrigger>
                <button className="p-2  bg-white">
                  <Menu className="text-primary" size={22} />
                </button>
              </SheetTrigger>
              <SheetContent>
                <div className="grid gap-2 py-8 font-light text-[16px]">
                  {!user && (
                    <div className="flex items-center gap-2 px-4 py-2 border-[2px] border-[#eee]">
                      <HomeIcon color="#00ccbb" size={16} />
                      <Link href="/login">Sign up or log in</Link>
                    </div>
                  )}

                  {/* <AccountButton /> */}
                  {user && (
                    <button
                      className="flex gap-2 px-6 py-2 items-center border-[2px] border-[#eee]"
                      onClick={async () => {
                        await auth.signOut().then();
                        await fetch("/api/logout");
                        router.push("/login");
                      }}
                    >
                      <LogOut color="#00ccbb" size={16} />
                      <div>Sign Out</div>
                    </button>
                  )}
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    {/* <button type="submit">Save changes</button> */}
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden md:flex gap-5 items-center font-light">
            {!user && (
              <Link
                href="/login"
                className="flex items-center gap-2 p-2 bg-white border-[2px] border-[#eee] "
              >
                <User2 className="text-primary" />
                <div>Sign Up or Log in</div>
              </Link>
            )}

            {user && (
              <button
                className="flex gap-2 px-6 py-2 bg-white items-center justify-center border-[2px] border-[#eee]"
                onClick={async () => {
                  await auth.signOut().then();
                  await fetch("/api/logout");
                  router.push("/login");
                }}
              >
                <LogOut color="#00ccbb" size={16} />
                <div>Sign Out</div>
              </button>
            )}
          </div>
        </div>

        <div className="w-[90vw] mt-6 md:mt-0 space-y-6 sm:max-w-[600px] sm:w-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:space-y-10 z-[99]">
          <div className="text-left text-3xl sm:text-4xl md:text-5xl md:text-center">
            Restaurant food, takeaway and groceries. Delivered.
          </div>
          <div className="bg-white p-8 space-y-6 font-normal rounded-lg">
            <div>Enter an address to see what we deliver</div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/restaurants");
              }}
            >
              <div className="flex items-center gap-4 border border-slate-300 rounded-full w-full py-1 px-1">
                <LocateIcon className="text-primary ml-4" size={32} />
                <input
                  name="search"
                  placeholder="Enter your full address"
                  className="appearance-none font-normal w-full h-full focus:outline-none"
                />
                <button className="px-4 text-sm grow sm:px-8 sm:text-base py-4 bg-primary rounded-full text-white">
                  Search
                </button>
              </div>
            </form>

            <div className="text-sm">
              <Link href="/login" className="text-primary underline">
                Log in
              </Link>
              &nbsp;for your recent addresses.
            </div>
          </div>
        </div>

        <div className="absolute w-full h-full top-0 xl:right-[30%] z-30">
          <Image
            fill
            alt="img"
            src="https://a.storyblok.com/f/62776/x/14b959f89c/rooute.svg"
            className="relative max-xl:object-cover"
          ></Image>
        </div>

        <div className="hidden sm:block absolute h-full top-[20%] right-[65%] z-40">
          <img
            alt="img"
            src="https://a.storyblok.com/f/62776/499x445/9f9ece842f/105_deliveroo_global_grocery_bag_side_v2_rt_lr-1.png"
            className="relative"
          ></img>
        </div>

        <div className="hidden sm:block absolute h-full top-[20%] left-[60%] z-40">
          <img
            alt="img"
            src="https://a.storyblok.com/f/62776/878x461/6e37c718ba/60_deliveroo_beefburger_s_hr-1.png"
            className="relative"
          ></img>
        </div>
      </div>

      <div className="mt-24">
        <BrandsSplide />
      </div>
    </>
  );
}
