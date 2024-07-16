"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HomeIcon,
  LogOut,
  Menu,
  Search,
  ShoppingBasket,
  Star,
  User,
} from "lucide-react";
import { auth } from "@/utils/firebase/firebase";
import { useRouter } from "next/navigation";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import {
  CartItem,
  Item,
  Restaurant,
  RestaurantMenu,
} from "@/utils/typesFirebase";
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

interface Props {
  restaurantName: string | null;
  restaurantMenu: RestaurantMenu | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<Item | null>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CartItem[];
  setCartModal: (value: boolean) => void;
}

const Header = ({
  restaurantName,
  restaurantMenu,
  setSelectedItem,
  setOpenModal,
  cartItems,
  setCartModal,
}: Props) => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const [restaurantItems, setRestaurantItems] = useState<Item[] | null>(null);
  const [searchResults, setSearchResults] = useState<Item[] | null>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (restaurantMenu) {
      const allItems: Item[] = restaurantMenu.categories.flatMap(
        (category) => category.items
      );
      setRestaurantItems(allItems);
    } else {
      setRestaurantItems(null);
    }
    console.log(restaurantItems);
  }, []);

  // State to control visibility of search results container
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Refs to the search input and results container elements
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  // Handle change in search input
  async function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim().length > 0) {
      setShowSearchResults(true);

      // Perform the search/filter operation based on item names
      const filteredItems =
        restaurantItems?.filter((item) =>
          item.name.toLowerCase().includes(value.trim().toLowerCase())
        ) ?? [];

      setSearchResults(filteredItems);
    } else {
      setShowSearchResults(false);
      setSearchResults(null);
    }
  }

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchInputRef.current &&
        searchResultsRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        !searchResultsRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Calculate total cart price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="h-[72px] px-[4vw] md:px-[64px] border-b border-[#eee] sticky top-0 bg-white z-[99] grid items-center">
      {/* mobile */}
      <div className="flex md:hidden gap-6 items-center justify-between">
        <Link href="/">
          <Image
            width="131"
            height="122"
            src="https://consumer-component-library.roocdn.com/30.2.0/static/images/logo-teal.svg"
            alt="logo"
          ></Image>
        </Link>

        <Sheet>
          <div className="flex gap-2">
            <div
              onClick={() => setCartModal(true)}
              className="relative flex gap-2 px-2 py-2 border-[2px] border-[#eee]"
            >
              <ShoppingBasket color="#00ccbb" />
              {cartItems.length > 0 && (
                <div className="absolute bottom-0 right-0 p-1 flex justify-center bg-primary text-white font-semibold text-xs rounded-full h-auto min-w-[1.35rem]">
                  {cartItems.length}
                </div>
              )}
            </div>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 p-2 border-[2px] border-[#eee]">
                <Menu color="#00ccbb" size={22} />
              </button>
            </SheetTrigger>
          </div>

          <SheetContent>
            <SheetHeader>
              {/* <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription> */}
            </SheetHeader>
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

              <div className="flex gap-2 px-6 py-2 items-center border-[2px] border-[#eee] font-light">
                <ShoppingBasket color="#00ccbb" size={18} />
                <div>AED {cartTotal.toFixed(2)}</div>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                {/* <button type="submit">Save changes</button> */}
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:flex gap-6 items-center justify-between ">
        <Link href="/">
          <Image
            width="131"
            height="122"
            src="https://consumer-component-library.roocdn.com/30.2.0/static/images/logo-teal.svg"
            alt="logo"
          ></Image>
        </Link>

        <div className="relative grow h-[44px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Search className="text-gray-500" size={18} />
          </div>
          <input
            ref={searchInputRef}
            name="search"
            value={inputValue}
            onChange={handleOnChange}
            placeholder={"Search for " + restaurantName + " items"}
            autoComplete="off"
            className="appearance-none font-normal border border-[#e8ebeb] bg-[#f5f5f5] w-full h-full pl-10 pr-4"
          />
          {showSearchResults && inputValue.trim().length > 0 && (
            <div
              ref={searchResultsRef}
              className="relative z-[90] top-0 max-h-[35vh] overflow-y-scroll w-full flex flex-col gap-1 bg-white font-normal"
            >
              {searchResults?.map((item) => (
                <div
                  key={item.name}
                  className="flex gap-2 p-4 border-b border-[#eee] hover:bg-[#eee]"
                  onClick={() => {
                    setSelectedItem(item);
                    setOpenModal(true);
                    setInputValue("");
                  }}
                >
                  <Image
                    src={item.image}
                    width={100}
                    height={100}
                    alt={item.name}
                    className="object-contain"
                  ></Image>
                  <div className="p-2 space-y-2 text-sm">
                    <div className="font-semibold">{item.name}</div>
                    <div className="font-semibold">AED {" " + item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 font-light items-center">
          {/* <div>{user?.email}</div> */}

          {user && (
            <button
              className="flex gap-2 px-6 py-2 justify-center border-[2px] border-[#eee]"
              onClick={async () => {
                await auth.signOut();
                await fetch("/api/logout");
                router.push("/login");
              }}
            >
              <LogOut color="#00ccbb" />
              <div>Sign Out</div>
            </button>
          )}

          <div className="flex gap-2 px-4 py-2 border-[2px] border-[#eee] font-light">
            <ShoppingBasket color="#00ccbb" />
            <div>AED {cartTotal.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
