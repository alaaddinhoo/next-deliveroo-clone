import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const RestaurantSkeleton = ({ num }: { num: number }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-full justify-evenly ">
        {Array.from({ length: num }).map((_, index) => (
          <div className="flex flex-col space-y-4 p-2">
            <Skeleton className="h-[125px] rounded-none" />
            <div className="space-y-2">
              <Skeleton className="h-4 rounded-none" />
              <Skeleton className="h-4 rounded-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantSkeleton;
