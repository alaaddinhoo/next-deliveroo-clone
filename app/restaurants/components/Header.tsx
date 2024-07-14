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
import { searchMenu, searchRestaurants } from "@/utils/http";
import { CartItem, Item, Restaurant } from "@/utils/typesFirebase";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "@/utils/firebase/firebase";
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

const Header = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const [searchResults, setSearchResults] = useState<Restaurant[] | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

      const data = await searchRestaurants({ query: value });
      setSearchResults(data.hits);
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

  // Calculate total cart price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="h-[72px] px-[64px] border-b border-[#eee] sticky top-0 bg-white z-[99] grid items-center">
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
            placeholder="Restaurants, groceries, dishes"
            className="appearance-none font-normal border border-[#e8ebeb] bg-[#f5f5f5] w-full h-full pl-10 pr-4"
          />
          {showSearchResults && inputValue.trim().length > 0 && (
            <div
              ref={searchResultsRef}
              className="relative z-[90] top-0 max-h-[35vh] overflow-y-scroll w-full flex flex-col gap-1 bg-white font-normal"
            >
              {searchResults?.map((restaurant) => (
                <Link
                  href={"/menu/" + restaurant.objectID}
                  key={restaurant.id}
                  className="flex gap-2 p-4 border-b border-[#eee] hover:bg-[#eee]"
                  onClick={(e) => e.stopPropagation()} // Prevent event propagation
                >
                  <Image
                    src={restaurant.coverImage}
                    width={92}
                    height={92}
                    alt={restaurant.name}
                    className="object-contain"
                  ></Image>
                  <div className="p-2 space-y-2 text-sm">
                    <div className="font-semibold">{restaurant.name}</div>
                    <div className="flex gap-1 items-center overflow-auto">
                      <span>
                        <Star
                          className="fill-[#4d7c1b] text-[#4d7c1b]"
                          size="14"
                        />
                      </span>
                      {restaurant.rating ? (
                        <p className="text-[#4d7c1b]">
                          {restaurant?.rating + " Excellent (500+)"}
                        </p>
                      ) : (
                        <p className="text-[#4d7c1b]">New on Deliveroo</p>
                      )}
                      <p className="line-clamp-1">• 0.3 km</p>
                    </div>
                    {restaurant.deliveryFee && (
                      <p>AED {restaurant.deliveryFee + " delivery"}</p>
                    )}
                  </div>
                </Link>
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
