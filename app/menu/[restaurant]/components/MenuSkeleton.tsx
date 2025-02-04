import Header from "@/components/Headers";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBasket } from "lucide-react";
import React from "react";

export const MenuSkeleton = () => {
  return (
    <>
      {/* <Header searchPlaceholder={"Loading..."} /> */}
      <div className="py-[20px] flex flex-col items-stretch ">
        <div className="px-[4vw] md:px-[64px] space-y-4 mb-8 ">
          <Skeleton className="w-[150px] h-[25px] rounded-none" />

          <div className="flex flex-col lg:flex-row gap-6">
            <Skeleton className="w-[100%] md:w-[30%] h-[30vh] rounded-none" />

            <div className="grow space-y-3">
              <Skeleton className="w-[450px] h-[25px] rounded-none" />
              <Skeleton className="w-[300px] h-[25px] rounded-none" />
              <Skeleton className="w-[150px] h-[25px] rounded-none" />
            </div>
            <div className="w-[200px] space-y-4">
              <Skeleton className="h-[25px] rounded-none" />
              <Skeleton className="h-[25px] rounded-none" />
            </div>
          </div>
        </div>

        <div className="  bg-[#f9fbfa] pt-8">
          <div className="flex flex-col flex-wrap gap-12 grow px-[4vw] md:px-[64px]">
            {Array.from({ length: 1 }).map((_, index) => (
              <div key={index}>
                <div className="text-2xl">
                  <Skeleton />
                </div>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index2) => (
                    <div
                      key={index + index2}
                      className="flex justify-between items-center  bg-white p-6"
                    >
                      <div className="w-[150px] space-y-2">
                        <Skeleton className="w-full h-[25px] rounded-none" />
                        <Skeleton className="w-full h-[25px] rounded-none" />
                        <Skeleton className="w-full h-[25px] rounded-none" />
                      </div>

                      <Skeleton className="w-[150px] h-[150px]" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
