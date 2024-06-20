"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Restaurant } from "@/utils/typesFirebase";

export default function Slider({ data }: { data: Restaurant[] }) {
  const splideRef = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const goToPrevSlide = () => {
    if (splideRef.current) {
      splideRef.current.go("<"); // Go to the previous slide
    }
  };

  const goToNextSlide = () => {
    if (splideRef.current) {
      splideRef.current.go(">"); // Go to the next slide
    }
  };

  useEffect(() => {
    if (splideRef.current) {
      const splide = splideRef.current.splide;

      splide.on("move", (newIndex: number) => {
        setCurrentSlide((prevSlide) => {
          console.log("Current slide index:", prevSlide);
          return newIndex;
        });
      });
    }
  }, []);

  return (
    <div className="relative ">
      <Splide
        ref={splideRef}
        options={{
          rewind: true,
          gap: "10px",
          breakpoints: {
            640: {
              perPage: 4,
            },
            768: {
              perPage: 4,
            },
            1024: {
              perPage: 4,
            },
            1280: {
              perPage: 5,
            },
            1536: {
              perPage: 5,
            },
          },
          perPage: 6,
          drag: "free",
          pagination: false,
          arrows: false,
        }}
        aria-label="My Favorite Images"
      >
        {data &&
          data.map((t: Restaurant) => (
            <SplideSlide
              key={t.name}
              className="shadow-md rounded-md w-[262px] h-[242px]"
            >
              <div className="h-[147px]  relative">
                <Image
                  src={t.coverImage}
                  alt="restaurant image"
                  fill
                  sizes="200"
                  className="absolute z-[1]"
                ></Image>
                <div className="space-y-2 absolute z-[2] top-[10px] text-xs">
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
                <div>{t.name}</div>
                <div className="flex gap-1 items-center overflow-auto">
                  <span>
                    <Star className="fill-[#4d7c1b] text-[#4d7c1b]" size="14" />
                  </span>
                  {t?.rating ? (
                    <p>{t?.rating + " Excellent (500+)"}</p>
                  ) : (
                    "New on Deliveroo"
                  )}
                  <p className="line-clamp-1">• 0.3 km</p>
                </div>
                {t?.deliveryFee && <p>AED {t?.deliveryFee + " delivery"}</p>}
              </div>
            </SplideSlide>
          ))}
      </Splide>
      <div className="absolute top-1/4 flex w-full justify-between text-[#00ccbb]">
        {currentSlide != 0 ? (
          <div className="p-3 bg-white rounded-full relative left-[-1.5em] shadow-md ">
            <ChevronLeft onClick={goToPrevSlide} size="24" />
          </div>
        ) : (
          <div></div>
        )}

        {currentSlide == 0 ? (
          <div className="p-3 bg-white rounded-full relative right-[-1.5em] shadow-md">
            <ChevronRight onClick={goToNextSlide} size="24" />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
