import { Skeleton } from "@/components/ui/skeleton";

const RestaurantSkeleton = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-6 gap-4 w-full justify-evenly ">
        {Array.from({ length: 30 }).map((_, index) => (
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
