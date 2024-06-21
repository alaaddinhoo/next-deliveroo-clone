// app/restaurants/page.tsx
"use client";

import Image from "next/image";
import { ArrowLeft, LogOut, Search, ShoppingBasket } from "lucide-react";

import Link from "next/link";
import {
  auth,
  getDocumentById,
  getMenuByRestaurantID,
} from "@/utils/firebase/firebase";
import { useRouter } from "next/navigation";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { Item, Restaurant, RestaurantMenu } from "@/utils/typesFirebase";

import MenuModal from "./components/MenuModal";

export default function Menu({ params }: any) {
  // async function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const data = (await searchRestaurants(e.target.value, "")) as any;
  //   console.log(e.currentTarget);
  //   console.log(data);
  //   // restaurants = data;
  // }
  const [openModal, setOpenModal] = useState(false);
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);
  const [menuData, setMenuData] = useState<RestaurantMenu | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      const data = await getDocumentById("restaurants", params.restaurant);
      setRestaurantData(data as Restaurant);
    };

    const fetchRestaurantMenuData = async () => {
      try {
        const data = await getMenuByRestaurantID(params.restaurant);
        setMenuData(data as RestaurantMenu);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchRestaurantData();
    fetchRestaurantMenuData();
  }, []);

  if (!restaurantData) {
    return <div>Loading...</div>;
  }

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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

      {/* *********** content *********** */}
      <div className="py-[20px] ">
        <div className="px-[64px] space-y-4 mb-8">
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

        <div className="border-[#eee] border py-6 sticky top-[72px] bg-white">
          <div className="px-[64px] flex gap-4">
            {menuData?.categories.map((c, index) => (
              <div
                className={`font-normal text-[#00ccbb] py-1 ${
                  index == 0
                    ? "bg-[#00ccbb] text-white px-4 rounded-full"
                    : undefined
                }`}
                onClick={() => handleScroll(c.name)}
              >
                {c.name}
              </div>
            ))}
          </div>
        </div>

        <div className="  bg-[#f9fbfa] pt-8">
          <div className="flex gap-4 px-[64px]">
            <div className="flex flex-col flex-wrap gap-12 grow ">
              {menuData?.categories.map((c) => (
                <div key={c.name} id={c.name} className="scroll-m-[200px]">
                  <div className="text-2xl">{c.name}</div>
                  <div className="pt-2 pb-4 font-light">{c.description}</div>
                  <div className="grid grid-cols-3 gap-4  ">
                    {c.items.map((i, index) => (
                      <div
                        key={i.name + index}
                        className="flex justify-between  bg-white p-6 shadow-sm"
                        onClick={() => {
                          setSelectedItem(i);
                          setOpenModal(true);
                        }}
                      >
                        <div className="space-y-2 max-w-[150px]">
                          <div> {i.name}</div>
                          <div className="font-light text-sm text-gray-400 line-clamp-2">
                            {i.description}
                          </div>
                          <div className="font-normal text-md text-gray-400">
                            {i.price}
                          </div>
                        </div>
                        <div className="border border-[#eee]">
                          <Image
                            src={i.image}
                            width={150}
                            height={150}
                            alt="product image"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col self-start grow items-center p-12  bg-white shadow-sm  sticky top-[0px]">
              <ShoppingBasket color="#abadad" size={36} />
              <div className="font-normal text-sm text-[#abadad] mt-2">
                Your basket is empty
              </div>
              <button
                className="w-full py-4 mt-6 text-white bg-[#00ccbb] disabled:bg-[#e1e5e6] disabled:text-[#a6b1b3] disabled:cursor-not-allowed"
                disabled={true}
              >
                Go to checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <MenuModal
        menuItem={selectedItem}
        openModal={openModal}
        setOpenModal={() => setOpenModal(false)}
      ></MenuModal>
    </>
  );
}
