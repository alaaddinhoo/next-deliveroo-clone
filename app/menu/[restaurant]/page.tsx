// app/restaurants/page.tsx
"use client";

import Image from "next/image";
import { ArrowLeft, LogOut, Search, ShoppingBasket } from "lucide-react";

import Link from "next/link";
import { auth, getDocumentById } from "@/utils/firebase/firebase";
import { useRouter } from "next/navigation";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { Restaurant } from "@/utils/typesFirebase";

export default function Menu({ params }: any) {
  // async function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const data = (await searchRestaurants(e.target.value, "")) as any;
  //   console.log(e.currentTarget);
  //   console.log(data);
  //   // restaurants = data;
  // }

  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      const data = await getDocumentById("restaurants", params.restaurant);
      setRestaurantData(data as Restaurant);
    };

    fetchRestaurantData();
  }, []);

  if (!restaurantData) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
            // onChange={handleOnChange}
            placeholder={"Search " + restaurantData.name + " Menu"}
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
            </button>
          )}

          <div className="flex gap-2 px-6 py-2 border-[2px] border-[#eee]">
            <ShoppingBasket color="#00ccbb" />
            <div>AED 0</div>
          </div>
        </div>
      </div>

      <div className="px-[64px] py-[20px]">
        <button
          className="w-full mx-auto text-[#00ccbb] font-normal flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft />
          <div>Go Back</div>
        </button>

        <div className="flex gap-6">
          <div className="w-[30%] h-[30vh] relative">
            <Image
              src={restaurantData.coverImage}
              fill
              alt="cover image"
            ></Image>
          </div>

          <div className="grow">{restaurantData.name}</div>
          <div className="space-y-2">
            <div>Deliver in 20 - 30 min</div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
