import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";

const CategorySlider = () => {
  return (
    <>
      <div className="text-[20px] mb-4">Choose from a varitey of options</div>
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
              src="https://co-restaurants.roocdn.com/images/7e2ad5f39b5c41c50bfa385e7646580390530153/shortcut/restaurant.png?bg-color=00ccbc&auto=webp&format=png"
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
              src="https://co-restaurants.roocdn.com/images/7e2ad5f39b5c41c50bfa385e7646580390530153/shortcut/grocery.png?bg-color=007e8a&auto=webp&format=png"
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
              src="https://co-restaurants.roocdn.com/images/7e2ad5f39b5c41c50bfa385e7646580390530153/shortcut/flowers.png?bg-color=ebcce2&auto=webp&format=png"
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
              src="https://co-restaurants.roocdn.com/images/7e2ad5f39b5c41c50bfa385e7646580390530153/shortcut/offers.png?bg-color=cc3a2f&auto=webp&format=png"
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
              src="https://co-restaurants.roocdn.com/images/7e2ad5f39b5c41c50bfa385e7646580390530153/shortcut/coffee.png?bg-color=440063&auto=webp&format=png"
            />
            <div className="p-2 text-sm font-normal">Coffee</div>
          </div>
        </SplideSlide>
      </Splide>
    </>
  );
};

export default CategorySlider;
