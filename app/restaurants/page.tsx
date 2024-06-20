// app/restaurants/page.tsx
"use client";

import Image from "next/image";
import { LogOut, Search, ShoppingBasket } from "lucide-react";
import TopPicks from "./components/TopPicks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { auth } from "@/utils/firebase/firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Restaurants() {
  // const router = useRouter();
  // async function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const data = (await searchRestaurants(e.target.value, "")) as any;
  //   console.log(e.currentTarget);
  //   console.log(data);
  //   // restaurants = data;
  // }
  //  const [signOut] = useSignOut(auth);
  const [user, loading, error] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    console.log(auth.currentUser);
    if (!user) {
      router.push("/login");
    }
  }, [user]);

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
            placeholder="Restaurants, groceries, dishes"
            className="appearance-none font-normal border border-[#e8ebeb] bg-[#f5f5f5] w-full h-full pl-10 pr-4"
          />
        </div>

        <div className="flex gap-2 font-normal  items-center">
          {auth.currentUser && (
            <button
              className="flex gap-2 px-6 py-2 justify-center border-[2px] border-[#eee]"
              onClick={() => {
                // Example of signing out
                // Ensure auth.signOut() is correctly implemented in your app
                auth.signOut().then(() => {
                  router.push("/login");
                });
              }}
            >
              <LogOut color="#00ccbb" />
              <div>Sign Out</div>
            </button>
          )}

          <div className="flex gap-2 px-6 py-2 border-[2px] border-[#eee]">
            <ShoppingBasket color="#00ccbb" />
            <div>AED 0</div>
          </div>
          <div className="flex gap-2 px-6 py-2 border-[2px] border-[#eee]">
            <ShoppingBasket color="#00ccbb" />
            <div>AED 0</div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 px-[64px] my-8 ">
        {/* ////////////////// sidebar ////////////////// */}
        <div className="mr-[24px] h-full space-y-6  ">
          <div className="flex gap-24">
            <div className="flex gap-4">
              <Image
                src="https://dbhq-deliveroo-riders-website.cdn.prismic.io/dbhq-deliveroo-riders-website/2a9890a1-027e-4017-9954-01954dc5fa3c_new-riders.svg"
                alt="rider"
                width="36"
                height="36"
              ></Image>
              <div>
                <div className="text-[#585C5C] text-[12px] font-normal">
                  Now
                </div>
                <div>Al Musalla</div>
              </div>
            </div>
            <div className="text-[#00b8a9] text-[14px] self-center">Change</div>
          </div>

          <div className="w-full border-b border-[#eee]"></div>

          <div className="space-y-6 h-[100%] overflow-auto">
            <RadioGroup defaultValue="option-one" className="pt-4 pl-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Delivery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Pickup</Label>
              </div>
            </RadioGroup>

            <div className="w-full border-b border-[#eee]"></div>

            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <p className="text-[#2e3333] text-[14px]">Sort</p>
                </AccordionTrigger>
                <AccordionContent>
                  <RadioGroup defaultValue="option-one" className="pt-4 pl-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Distance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Quickest delivery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-three" id="option-three" />
                      <Label htmlFor="option-three">Recommended</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-four" id="option-four" />
                      <Label htmlFor="option-four">Top-rated</Label>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="w-full border-b border-[#eee]"></div>

            <Accordion type="single" collapsible defaultValue="item-2">
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <p className="text-[#2e3333] text-[14px]">Sort</p>
                </AccordionTrigger>
                <AccordionContent>
                  <RadioGroup defaultValue="option-one" className="pt-4 pl-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Distance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Quickest delivery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-three" id="option-three" />
                      <Label htmlFor="option-three">Recommended</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-four" id="option-four" />
                      <Label htmlFor="option-four">Top-rated</Label>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="w-full border-b border-[#eee]"></div>

            <Accordion type="single" collapsible defaultValue="item-3">
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <p className="text-[#2e3333] text-[14px]">Sort</p>
                </AccordionTrigger>
                <AccordionContent>
                  <RadioGroup defaultValue="option-one" className="pt-4 pl-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Distance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Quickest delivery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-three" id="option-three" />
                      <Label htmlFor="option-three">Recommended</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-four" id="option-four" />
                      <Label htmlFor="option-four">Top-rated</Label>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="w-full border-b border-[#eee]"></div>

            <Accordion type="single" collapsible defaultValue="item-4">
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  <p className="text-[#2e3333] text-[14px]">Sort</p>
                </AccordionTrigger>
                <AccordionContent>
                  <RadioGroup defaultValue="option-one" className="pt-4 pl-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Distance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Quickest delivery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-three" id="option-three" />
                      <Label htmlFor="option-three">Recommended</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-four" id="option-four" />
                      <Label htmlFor="option-four">Top-rated</Label>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* ////////////////// main content ////////////////// */}
        <div>
          <div className="space-y-4">
            <div className="text-[22px]">Top picks in your neighbourhood</div>

            <TopPicks />
          </div>
        </div>
      </div>
    </>
  );
}
