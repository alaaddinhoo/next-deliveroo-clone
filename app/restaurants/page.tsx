// app/restaurants/page.tsx
"use client";

import Image from "next/image";
import TopPicks from "./components/TopPicks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Header from "@/components/header";
import { searchRestaurants, SearchParams } from "@/utils/http";
import { Restaurant } from "@/utils/typesFirebase";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { getAllDocumentsFromCollection } from "@/utils/firebase/firebase";
import RestaurantSkeleton from "./components/RestaurantSkeleton";
import Slider from "./components/Slider";

const maxPaginationItems = 5;

export default function Restaurants() {
  const [data, setData] = useState<Restaurant[] | null>(null);
  const [page, setPage] = useState(0);
  const [hitsPerPage, setHitsPerPage] = useState(18);
  const [totalHits, setTotalHits] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // State to hold total pages

  const fetchData = async () => {
    const options = { perPage: hitsPerPage, pageIndex: page };

    try {
      setData(null);
      const data = await searchRestaurants(options);
      setData(data.hits);
      setTotalHits(data.nbHits);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [hitsPerPage, page]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalHits / hitsPerPage));
  }, [totalHits, hitsPerPage]);

  const renderPaginationItems = () => {
    const startPage = Math.max(0, page - Math.floor(maxPaginationItems / 2));
    const endPage = Math.min(
      startPage + maxPaginationItems - 1,
      totalPages - 1
    );

    return Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
      const pageNumber = startPage + index;
      return (
        <button
          key={pageNumber}
          className={
            pageNumber === page
              ? "text-white bg-[#00ccbb] p-2"
              : "text-[#00ccbb] p-2"
          }
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      );
    });
  };

  const handleHitsPerPageChange = (selectedValue: number) => {
    setHitsPerPage(selectedValue);
    setPage(0); // Reset page to 0 whenever hitsPerPage changes
  };

  // useEffect(() => {
  //   console.log(user);
  //   console.log(loading);

  //   if (user == null) {
  //     router.push("/login");
  //   } else if (!user?.emailVerified) {
  //     router.push("/verifyAccount");
  //   }
  // }, [user, loading]);

  return (
    <div className="">
      <Header
        searchPlaceholder="Restaurants, groceries, dishes"
        type="restaurants"
      />
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
        <div className=" w-full">
          <div className="space-y-6">
            {/* <div className="text-[22px]">Top picks in your neighbourhood</div> */}
            {/* <TopPicks /> */}

            <div className="space-y-4">
              <div className="text-[20px]">
                Choose from a varitey of options
              </div>
              <div className="flex gap-2 font-normal">
                <div className="rounded-md border border-[#eee]  ">
                  <Image
                    width={167}
                    height={69}
                    className="bg-[#00ccbb] rounded-t-md"
                    alt="res"
                    src="https://co-restaurants.roocdn.com/images/7e2ad5f39b5c41c50bfa385e7646580390530153/shortcut/restaurant.png?width=167&height=69&fit=crop&bg-color=00ccbc&auto=webp&format=png"
                  />
                  <div className="p-2 text-sm">Restaurants</div>
                </div>
                <div className="rounded-md border border-[#eee]  ">
                  <Image
                    width={167}
                    height={69}
                    className="bg-[#00ccbb] rounded-t-md"
                    alt="res"
                    src="https://co-restaurants.roocdn.com/images/7e2ad5f39b5c41c50bfa385e7646580390530153/shortcut/grocery.png?width=167&height=69&fit=crop&bg-color=007e8a&auto=webp&format=png"
                  />
                  <div className="p-2 text-sm">Groceries</div>
                </div>
                <div className="rounded-md border border-[#eee]  ">
                  <Image
                    width={167}
                    height={69}
                    className="bg-[#00ccbb] rounded-t-md"
                    alt="res"
                    src="https://co-restaurants.roocdn.com/images/7e2ad5f39b5c41c50bfa385e7646580390530153/shortcut/flowers.png?width=167&height=69&fit=crop&bg-color=ebcce2&auto=webp&format=png"
                  />
                  <div className="p-2 text-sm">Shopping</div>
                </div>
                <div className="rounded-md border border-[#eee]  ">
                  <Image
                    width={167}
                    height={69}
                    className="bg-[#00ccbb] rounded-t-md"
                    alt="res"
                    src="https://co-restaurants.roocdn.com/images/7e2ad5f39b5c41c50bfa385e7646580390530153/shortcut/offers.png?width=167&height=69&fit=crop&bg-color=cc3a2f&auto=webp&format=png"
                  />
                  <div className="p-2 text-sm">Offers</div>
                </div>
                <div className="rounded-md border border-[#eee]  ">
                  <Image
                    width={167}
                    height={69}
                    className="bg-[#00ccbb] rounded-t-md"
                    alt="res"
                    src="https://co-restaurants.roocdn.com/images/7e2ad5f39b5c41c50bfa385e7646580390530153/shortcut/coffee.png?width=167&height=69&fit=crop&bg-color=440063&auto=webp&format=png"
                  />
                  <div className="p-2 text-sm">Coffee</div>
                </div>
              </div>
            </div>

            <Slider />

            {data != null ? (
              <div className="space-y-4">
                <div className="text-[20px]">All Restaurants ({totalHits})</div>

                <div className="grid grid-cols-6 gap-4 w-full justify-evenly font-normal ">
                  {data.map((t: Restaurant) => (
                    <Link
                      href={"/menu/" + t.objectID}
                      key={t.id}
                      className="shadow-md rounded-md "
                    >
                      <div className="h-[147px]  relative">
                        <Image
                          src={t.coverImage}
                          alt="restaurant image"
                          fill
                          sizes="200"
                          className="absolute z-[1]"
                        ></Image>
                        <div className="space-y-2 absolute z-[2] top-[10px] text-xs font-semibold">
                          <div className="bg-[#bf3f35] text-white py-1 px-2">
                            Low delivery fee
                          </div>
                          {t.onlyOnDeliveroo && (
                            <div className="bg-[#00ccbd] text-black py-1 px-2">
                              Only on Deliveroo
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="p-[12px] space-y-2 text-sm">
                        <div className="font-semibold">{t.name}</div>
                        <div className="flex gap-1 items-center overflow-auto">
                          <span>
                            <Star
                              className="fill-[#4d7c1b] text-[#4d7c1b]"
                              size="14"
                            />
                          </span>
                          {t?.rating ? (
                            <p className="text-[#4d7c1b]">
                              {t?.rating + " Excellent (500+)"}
                            </p>
                          ) : (
                            <p className="text-[#4d7c1b]">New on Deliveroo</p>
                          )}
                          <p className="line-clamp-1">• 0.3 km</p>
                        </div>
                        {t?.deliveryFee && (
                          <p>AED {t?.deliveryFee + " delivery"}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <RestaurantSkeleton />
            )}
          </div>

          <div className="flex justify-between items-center place-content-center font-normal mt-8">
            <div className="flex gap-4 items-center text-slate-500">
              <div className="w-[140px] relative">
                <Select
                  onValueChange={(e) => {
                    handleHitsPerPageChange(+e);
                  }}
                >
                  <SelectTrigger className="w-[140px] focus:outline-none">
                    <SelectValue placeholder={hitsPerPage + " per page"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4" className="font-normal">
                      4 items
                    </SelectItem>
                    <SelectItem value="18" className="font-normal">
                      18 items
                    </SelectItem>
                    <SelectItem value="24" className="font-normal">
                      24 items
                    </SelectItem>
                    <SelectItem value="30" className="font-normal">
                      30 items
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>{"of " + totalHits + " results"}</div>
            </div>

            <div className="flex gap-12 items-center">
              <button
                className="flex gap-2 items-center text-[#00ccbb] disabled:text-slate-300"
                onClick={() => {
                  if (page > 0) {
                    setPage((prevState) => prevState - 1);
                  }
                }}
                disabled={page == 0}
              >
                <ChevronLeft size={18} />
                <p>Previous</p>
              </button>

              <div className="flex gap-2 items-center">
                {renderPaginationItems()}
              </div>

              <button
                className="flex gap-2 items-center text-[#00ccbb] disabled:text-slate-300"
                onClick={() => {
                  if (page < totalPages - 1) {
                    setPage((prevState) => prevState + 1);
                  }
                }}
                disabled={page >= totalPages - 1} // Disable Next button when on the last page
              >
                <p>Next</p>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
