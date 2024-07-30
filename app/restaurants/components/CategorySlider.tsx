import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import React from "react";
import RestaurantImage from "../../../images/Restaurants.jpg";
import GroceriesImage from "../../../images/Groceries.jpg";
import ShoppingImage from "../../../images/Shopping.jpg";
import OffersImage from "../../../images/Offers.jpg";
import CoffeeImage from "../../../images/Coffee.jpg";

const CategorySlider = () => {
  return (
    <div className="space-y-4">
      <div className="text-[20px]">Choose from a varitey of options</div>
      <Splide
        options={{
          perPage: 6,
          rewind: true,
          gap: "8px",
          drag: "free",
          pagination: false,
          arrows: false,
          breakpoints: {
            640: {
              perPage: 2,
            },
            768: {
              perPage: 3,
            },
            1024: {
              perPage: 5,
            },
            1280: {
              perPage: 5,
            },
            1536: {
              perPage: 6,
            },
          },
        }}
        aria-label="My Favorite Images"
      >
        <SplideSlide className="max-w-[167px]">
          <div className="rounded-md border border-[#eee] ">
            <Image
              width={167}
              height={69}
              className="bg-[#00ccbb] rounded-t-md"
              alt="res"
              src={RestaurantImage}
            />
            <div className="p-2 text-sm font-normal">Restaurants</div>
          </div>
        </SplideSlide>

        <SplideSlide className="max-w-[167px]">
          <div className="rounded-md border border-[#eee]  ">
            <Image
              width={167}
              height={69}
              className="bg-[#00ccbb] rounded-t-md"
              alt="res"
              src={GroceriesImage}
            />
            <div className="p-2 text-sm font-normal">Groceries</div>
          </div>
        </SplideSlide>

        <SplideSlide className="max-w-[167px]">
          <div className="rounded-md border border-[#eee]  ">
            <Image
              width={167}
              height={69}
              className="bg-[#00ccbb] rounded-t-md"
              alt="res"
              src={ShoppingImage}
            />
            <div className="p-2 text-sm font-normal">Shopping</div>
          </div>
        </SplideSlide>

        <SplideSlide className="max-w-[167px]">
          <div className="rounded-md border border-[#eee]  ">
            <Image
              width={167}
              height={69}
              className="bg-[#00ccbb] rounded-t-md"
              alt="res"
              src={OffersImage}
            />
            <div className="p-2 text-sm font-normal">Offers</div>
          </div>
        </SplideSlide>

        <SplideSlide className="max-w-[167px]">
          <div className="rounded-md border border-[#eee]  ">
            <Image
              width={167}
              height={69}
              className="bg-[#00ccbb] rounded-t-md"
              alt="res"
              src={CoffeeImage}
            />
            <div className="p-2 text-sm font-normal">Coffee</div>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default CategorySlider;
