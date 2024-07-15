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
import { useEffect, useState, useRef } from "react";
import {
  CartItem,
  Item,
  Restaurant,
  RestaurantMenu,
} from "@/utils/typesFirebase";
import { useInView } from "react-intersection-observer";
import { db } from "@/utils/firebase/firebase";
import MenuModal from "./components/MenuModal";
import Header from "./components/Header";
import { MenuSkeleton } from "./components/MenuSkeleton";
import CartComponent from "./components/CartComponent";
import { doc, getDoc } from "@firebase/firestore";

export default function Menu({ params }: any) {
  const [openModal, setOpenModal] = useState(false);
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);
  const [menuData, setMenuData] = useState<RestaurantMenu | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData && userData.cart) {
              const cartItemsData: CartItem[] = userData.cart;
              setCartItems(cartItemsData);
            } else {
              console.log("No cart data found for the user.");
            }
          } else {
            console.log("User document does not exist.");
          }
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      }
    };

    fetchCartData();
  }, []);

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
  }, [user, params.restaurant]);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Create a ref for each category
  const categoryRefs = useRef<{ el: HTMLDivElement; name: string }[]>([]);

  const setCategoryRef = (el: HTMLDivElement | null, name: string) => {
    if (el && !categoryRefs.current.find((ref) => ref.name === name)) {
      categoryRefs.current.push({ el, name });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.getAttribute("id"));
          }
        });
      },
      { threshold: 0.1 }
    );

    categoryRefs.current.forEach((ref) => {
      observer.observe(ref.el);
    });

    // clean up function
    return () => {
      categoryRefs.current.forEach((ref) => {
        observer.unobserve(ref.el);
      });
    };
  }, [menuData]);

  if (!restaurantData && !menuData) {
    return <MenuSkeleton />;
  }

  return (
    <div>
      <Header
        restaurantName={restaurantData?.name!}
        restaurantMenu={menuData}
        setOpenModal={setOpenModal}
        setSelectedItem={setSelectedItem}
        cartItems={cartItems}
      />

      {/* *********** content *********** */}
      <div className="py-[20px] flex flex-col items-stretch ">
        <div className="px-[4vw] md:px-[64px] space-y-4 mb-8 ">
          <button
            className="w-full mx-auto text-[#00ccbb] font-normal flex items-center gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft />
            <div>Go Back</div>
          </button>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-[100%] md:w-[30%] h-[30vh] relative">
              <Image
                src={restaurantData?.coverImage!}
                fill
                alt="cover image"
                className="object-cover"
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
                {/* <p className="line-clamp-1">AED 20.00 minimum ·</p> */}

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
              No menu was added for this restaurant. Only one restaurant has a
              menu.
            </div>
            <button
              className="px-12 py-4 mt-6 text-white bg-[#00ccbb]"
              onClick={() => router.push("/menu/xHEWvFNTMrmaDON1I3SF")}
            >
              Take Me There
            </button>
          </div>
        )}

        {!loadingData && menuData && (
          <div>
            <div className="border-[#eee] border py-6 sticky top-[72px] bg-white">
              <div className="px-[4vw] md:px-[64px] flex gap-4">
                {menuData?.categories.map((c, index) => (
                  <div
                    key={c.name}
                    className={`font-normal cursor-pointer text-[#00ccbb] py-1 
                    ${
                      activeCategory === c.name
                        ? "bg-[#00ccbb] text-white px-4 rounded-full"
                        : ""
                    }`}
                    onClick={() => handleScroll(c.name)}
                  >
                    {c.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f9fbfa] pt-8">
              <div className="flex gap-4 px-[4vw] md:px-[64px]">
                <div className="flex flex-col flex-wrap gap-12 grow">
                  {menuData?.categories.map((c, index) => (
                    <div
                      key={c.name}
                      id={c.name}
                      className="scroll-m-[200px]"
                      ref={(el) => setCategoryRef(el, c.name)}
                    >
                      <div className="text-2xl">{c.name}</div>
                      <div className="pt-2 pb-4 font-light">
                        {c.description}
                      </div>
                      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {c.items.map((i, index) => (
                          <div
                            key={i.name + index}
                            className="flex justify-between bg-white p-6 shadow-sm cursor-pointer"
                            onClick={() => {
                              setSelectedItem(i);
                              setOpenModal(true);
                            }}
                          >
                            <div className="space-y-2 max-w-[150px]">
                              <div>{i.name}</div>
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
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hidden lg:block">
                  <CartComponent
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                  />
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
        restaurantID={restaurantData?.name!}
        category={"testing"}
      />
    </div>
  );
}
