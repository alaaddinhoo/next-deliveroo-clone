"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ChevronRight,
  FileWarningIcon,
  Info,
  ShoppingBasket,
  Star,
  Users,
} from "lucide-react";

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
import Header from "./components/Header";
import { MenuSkeleton } from "./components/MenuSkeleton";

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
  const [loadingData, setLoadingData] = useState(true);
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
    setLoadingData(false);
  }, []);

  if (!restaurantData || !menuData) {
    return <MenuSkeleton />;
  }

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Header
        restaurantName={restaurantData.name}
        restaurantMenu={menuData}
        setOpenModal={setOpenModal}
        setSelectedItem={setSelectedItem}
      />

      {/* *********** content *********** */}
      <div className="py-[20px] flex flex-col items-stretch ">
        <div className="px-[64px] space-y-4 mb-8 ">
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

            <div className="grow space-y-3 font-normal">
              <div className="text-4xl font-semibold">
                {restaurantData?.name}
              </div>
              <div>20 - 30 min · Burgers · American</div>
              <div className="flex gap-2 items-center text-slate-600 text-md">
                <span>
                  <Star className="fill-[#4d7c1b] text-[#4d7c1b]" size="14" />
                </span>
                {restaurantData?.rating ? (
                  <p className="text-[#4d7c1b]">
                    {restaurantData?.rating + " Excellent (500+)"}
                  </p>
                ) : (
                  <p className="text-[#4d7c1b]">New on Deliveroo</p>
                )}
                <p className="line-clamp-1">· 0.3 km away ·</p>
                <p className="line-clamp-1">AED 20.00 minimum ·</p>

                {restaurantData?.deliveryFee && (
                  <p>AED {restaurantData?.deliveryFee + " delivery"}</p>
                )}
              </div>
              <div className="flex gap-4 items-center">
                <Info color="grey" size={18} />
                <div className="space-y-1 font-light">
                  <div>Info</div>
                  <div className="text-slate-400 ">Allergens and more</div>
                </div>
                <ChevronRight color="#00cdbb" />
              </div>
            </div>
            <div className="space-y-4 font-light">
              <div className="flex gap-4 items-center">
                <Image
                  src="https://dbhq-deliveroo-riders-website.cdn.prismic.io/dbhq-deliveroo-riders-website/2a9890a1-027e-4017-9954-01954dc5fa3c_new-riders.svg"
                  alt="rider"
                  width="32"
                  height="32"
                ></Image>
                <div>Deliver in 20 - 30 min</div>
              </div>
              <div className="flex gap-3 items-center justify-center p-2 border-[2px] border-[#eee] ">
                <Users color="#00ccbb" size={14} />
                <div>Start order group</div>
              </div>
            </div>
          </div>
        </div>

        {!loadingData && !menuData && (
          <div className="flex flex-col items-center bg-white max-w-[300px] mx-auto text-center">
            <FileWarningIcon color="#abadad" size={62} />
            <div className="font-normal text-md text-[#abadad] mt-2">
              No menu was added for this restaurant. Only "SALT" restaurant has
              a menu.
            </div>
            <button
              className="px-12 py-4 mt-6 text-white bg-[#00ccbb]"
              onClick={() => router.push("/menu/wH2DrAiRxnjq1a2NsYKz")}
            >
              Take Me There
            </button>
          </div>
        )}

        {!loadingData && menuData && (
          <div>
            <div className="border-[#eee] border py-6 sticky top-[72px] bg-white">
              <div className="px-[64px] flex gap-4">
                {menuData?.categories.map((c, index) => (
                  <div
                    className={`font-normal cursor-pointer text-[#00ccbb] py-1 ${
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
                      <div className="pt-2 pb-4 font-light">
                        {c.description}
                      </div>
                      <div className="grid grid-cols-3 gap-4  ">
                        {c.items.map((i, index) => (
                          <div
                            key={i.name + index}
                            className="flex justify-between  bg-white p-6 shadow-sm cursor-pointer"
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
        )}
      </div>

      <MenuModal
        menuItem={selectedItem}
        openModal={openModal}
        setOpenModal={() => setOpenModal(false)}
      ></MenuModal>
    </div>
  );
}
