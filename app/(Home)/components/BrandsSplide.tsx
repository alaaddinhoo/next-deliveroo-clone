import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import Image from "next/image";
import { useEffect, useState } from "react";
import React from "react";

export const BrandsSplide = () => {
  const images = [
    "https://img2.storyblok.com/filters:format(webp)/f/62776/256x256/11bf79a2b4/icon-donut.jpg",
    "https://img2.storyblok.com/filters:format(webp)/f/62776/256x256/28218291ec/starbuckssq.png",
    "https://img2.storyblok.com/filters:format(webp)/f/62776/256x256/8e73e7926e/pizzahutsq.png",
    "https://img2.storyblok.com/filters:format(webp)/f/62776/512x256/47c289a9f4/pizza-wide.jpg",
    "https://img2.storyblok.com/filters:format(webp)/f/62776/256x256/6a385f47c7/icon-vegan.jpg",
    "https://img2.storyblok.com/filters:format(webp)/f/62776/512x256/0ee9c5082d/dessert-wide.jpg",
    "https://img2.storyblok.com/filters:format(webp)/f/62776/256x256/4d9f27e15f/picklsq.png",
    "https://img2.storyblok.com/filters:format(webp)/f/62776/512x256/dd8a3a1d71/chicken-wide.jpg",
    "https://img2.storyblok.com/filters:format(webp)/f/62776/256x256/1057653a2b/baskinsq.png",
    "https://img2.storyblok.com/filters:format(webp)/f/62776/512x256/8bd9a1cb99/bowl-wide.jpg",
    "https://img2.storyblok.com/filters:format(webp)/f/62776/256x256/54ae25d5da/kfc.jpg",
    "https://img2.storyblok.com/filters:format(webp)/f/62776/804x420/e1de7f270d/salad_wide.png",
    "https://img2.storyblok.com/filters:format(webp)/f/62776/256x256/4fd0ed75e4/icon-pizza.jpg",
    "https://img2.storyblok.com/filters:format(webp)/f/62776/136x136/69915bf506/carroticon.png",
    "https://img2.storyblok.com/filters:format(webp)/f/62776/254x288/a129553ef2/hop3.jpg",
  ];

  const splideOptions1 = {
    type: "loop",
    gap: "10px",
    drag: "free",
    arrows: false,
    pagination: false,
    perPage: 13,
    autoScroll: {
      pauseOnHover: true,
      pauseOnFocus: false,
      rewind: false,
      speed: 0.2,
    },
    breakpoints: {
      1536: {
        perPage: 13,
      },
      1280: {
        perPage: 10,
      },
      1024: {
        perPage: 7,
      },
      768: {
        perPage: 5,
      },
      640: {
        perPage: 4,
      },
    },
  };

  const splideOptions2 = {
    type: "loop",
    gap: "10px",
    drag: "free",
    arrows: false,
    pagination: false,
    perPage: 11,
    direction: "rtl",
    autoScroll: {
      pauseOnHover: true,
      pauseOnFocus: false,
      rewind: false,
      speed: 0.2,
    },
    breakpoints: {
      1536: {
        perPage: 13,
      },
      1280: {
        perPage: 10,
      },
      1024: {
        perPage: 7,
      },
      768: {
        perPage: 5,
      },
      640: {
        perPage: 4,
      },
    },
  };

  return (
    <div className="space-y-3">
      <Splide options={splideOptions1} extensions={{ AutoScroll }}>
        {images.map((i, index) => (
          <SplideSlide key={index} className="max-h-[90px]">
            <img
              src={i}
              className="w-full h-full object-contain rounded-lg"
            ></img>
          </SplideSlide>
        ))}
      </Splide>
      <Splide options={splideOptions2} extensions={{ AutoScroll }}>
        {images
          .slice()
          .reverse()
          .map((i, index) => (
            <SplideSlide key={index} className="max-h-[90px]">
              <img
                src={i}
                className="w-full h-full object-contain rounded-lg"
              ></img>
            </SplideSlide>
          ))}
      </Splide>
    </div>
  );
};
