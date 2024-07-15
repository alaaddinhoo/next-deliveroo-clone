// app/restaurants/page.tsx
"use client";

import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Header from "./components/Header";
import { searchRestaurants, SearchParams } from "@/utils/http";
import { Restaurant } from "@/utils/typesFirebase";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, X } from "lucide-react";
import Link from "next/link";
import { getAllDocumentsFromCollection } from "@/utils/firebase/firebase";
import RestaurantSkeleton from "./components/RestaurantSkeleton";
import Slider from "./components/PromoSlider";
import Sidebar from "./components/Sidebar";
import { FiltersList } from "./components/FiltersList";
import CategorySlider from "./components/CategorySlider";

const maxPaginationItems = 3;

export default function Restaurants() {
  const [data, setData] = useState<Restaurant[] | null>(null);
  const [page, setPage] = useState(0);
  const [hitsPerPage, setHitsPerPage] = useState(18);
  const [totalHits, setTotalHits] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filterString, setFilterString] = useState("");

  const fetchData = async () => {
    const options: SearchParams = {
      perPage: hitsPerPage,
      pageIndex: page,
      filters: filterString,
    };
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
    console.log(filterString);
  }, [hitsPerPage, page, filterString]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalHits / hitsPerPage));
  }, [totalHits, hitsPerPage, filterString]);

  useEffect(() => {
    setPage(0); // Reset page to 0 whenever hitsPerPage changes
  }, [filterString]);

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

  return (
    <>
      <Header />

      <div className="flex gap-4 px-[4vw] md:px-[64px] my-8 ">
        {/* ////////////////// sidebar ////////////////// */}
        <Sidebar
          setFilterString={setFilterString}
          filterString={filterString}
        />

        {/* ////////////////// main content ////////////////// */}
        <div className=" w-full">
          <div className="space-y-6">
            {/* <div className="text-[22px]">Top picks in your neighbourhood</div> */}
            {/* <TopPicks /> */}

            <CategorySlider />

            <Slider />

            {data != null ? (
              <div className="space-y-4">
                <div className="text-[20px]">All Restaurants ({totalHits})</div>

                {filterString && (
                  <FiltersList
                    filterString={filterString}
                    setFilterString={setFilterString}
                  />
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-full justify-evenly font-normal ">
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
                          className="absolute z-[1] object-cover"
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
              <RestaurantSkeleton num={hitsPerPage} />
            )}
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:gap-0 justify-between items-center place-content-center font-normal mt-8">
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
    </>
  );
}
