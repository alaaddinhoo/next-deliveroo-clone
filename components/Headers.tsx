"use client";

import { LogOut, Search, ShoppingBasket, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/utils/firebase/firebase";
import { useRouter } from "next/navigation";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { searchRestaurants } from "@/utils/http";
import { Restaurant } from "@/utils/typesFirebase";
import { useState } from "react";

interface Props {
  searchPlaceholder: string;
  type: string;
}

const Header = ({ searchPlaceholder, type }: Props) => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const [setRestaurantData, setData] = useState<Restaurant[] | null>(null);

  async function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData(null);
    const data = await searchRestaurants({
      query: e.target.value,
    });
    setData(data.hits);
    console.log(e.currentTarget);
    console.log(data);
    // restaurants = data;
  }

  return (
    <div className="h-[72px] px-[64px] flex gap-6 items-center justify-between border-b border-[#eee] sticky top-0 bg-white z-[99]">
      <Link href="/">
        <Image
          width="131"
          height="122"
          src="https://consumer-component-library.roocdn.com/30.2.0/static/images/logo-teal.svg"
          alt="logo"
        ></Image>
      </Link>

      <div className="relative grow h-[44px] ">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Search className="text-gray-500 " size={18} />
        </div>
        <input
          name="search"
          onChange={handleOnChange}
          placeholder={searchPlaceholder}
          className="appearance-none font-normal border border-[#e8ebeb] bg-[#f5f5f5] w-full h-full pl-10 pr-4"
        />
      </div>

      <div className="flex gap-2 font-normal  items-center">
        <div>{user?.email}</div>

        {user && (
          <button
            className="flex gap-2 px-6 py-2 justify-center border-[2px] border-[#eee]"
            onClick={async () => {
              await auth.signOut().then();
              router.push("/login");
            }}
          >
            <LogOut color="#00ccbb" />
            <div>Sign Out</div>
          </button>
        )}

        <div className="flex gap-2 px-4 py-2 border-[2px] border-[#eee] font-light">
          <User color="#00ccbb" />
          <div>Account</div>
        </div>
        <div className="flex gap-2 px-4 py-2 border-[2px] border-[#eee] font-light">
          <ShoppingBasket color="#00ccbb" />
          <div>AED 0</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
