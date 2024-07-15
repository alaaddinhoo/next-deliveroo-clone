"use client";

import { HomeIcon, LogOut, Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
import { useRouter } from "next/navigation";

import { auth, emailSignIn } from "@/utils/firebase/firebase";

import { useAuthState } from "react-firebase-hooks/auth";

interface Props {}

const LoginButton = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 border-[2px] border-[#eee]">
      <HomeIcon color="#00ccbb" size={16} />
      <Link href="/login">Sign up or log in</Link>
    </div>
  );
};

const AccountButton = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-2  border-[2px] border-[#eee]">
      <User color="#00ccbb" size={20} />
      <div>Account</div>
    </div>
  );
};

const HomeHeader = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  return (
    <div className="h-[72px] px-[10vw] md:px-[20vw] flex justify-between gap-6 items-center border-b border-[#eee] sticky top-0 bg-white z-[99]">
      <Link href="/">
        <Image
          width="131"
          height="122"
          src="https://consumer-component-library.roocdn.com/30.2.0/static/images/logo-teal.svg"
          alt="logo"
        ></Image>
      </Link>

      <div className="hidden md:flex gap-2 font-light text-[16px]">
        {!user && <LoginButton />}
        {/* <AccountButton /> */}
        {user && (
          <button
            className="flex gap-2 px-6 py-2 items-center justify-center border-[2px] border-[#eee]"
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

      <Sheet>
        <SheetTrigger asChild className="block md:hidden">
          <button className="flex items-center gap-2 p-2 border-[2px] border-[#eee]">
            <Menu color="#00ccbb" size={22} />
          </button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            {/* <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription> */}
          </SheetHeader>
          <div className="grid gap-2 py-8 font-light text-[16px]">
            {!user && <LoginButton />}

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
  );
};

export default HomeHeader;
