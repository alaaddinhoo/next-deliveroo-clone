// app/restaurants/page.tsx
// "use client";

// import Image from "next/image";
// import TopPicks from "./components/TopPicks";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import Header from "@/components/header";
// import { searchRestaurants } from "@/utils/http";
// import { Restaurant } from "@/utils/typesFirebase";
// import { useEffect, useState } from "react";
// import { Star } from "lucide-react";
// import Link from "next/link";
// import { getAllDocumentsFromCollection } from "@/utils/firebase/firebase";

// export default function Restaurants() {
//   const [data, setData] = useState<Restaurant[] | null>(null);
//   const [page, setPage] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setData(null);
//         const data = await searchRestaurants({ page: 0 });
//         setData(data.hits);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // useEffect(() => {
//   //   console.log(user);
//   //   console.log(loading);

//   //   if (user == null) {
//   //     router.push("/login");
//   //   } else if (!user?.emailVerified) {
//   //     router.push("/verifyAccount");
//   //   }
//   // }, [user, loading]);

//   return (
//     <div className="">
//       <Header
//         searchPlaceholder="Restaurants, groceries, dishes"
//         type="restaurants"
//       />
//       <div className="flex gap-4 px-[64px] my-8 ">
//         {/* ////////////////// sidebar ////////////////// */}
//         <div className="mr-[24px] h-full space-y-6  ">
//           <div className="flex gap-24">
//             <div className="flex gap-4">
//               <Image
//                 src="https://dbhq-deliveroo-riders-website.cdn.prismic.io/dbhq-deliveroo-riders-website/2a9890a1-027e-4017-9954-01954dc5fa3c_new-riders.svg"
//                 alt="rider"
//                 width="36"
//                 height="36"
//               ></Image>
//               <div>
//                 <div className="text-[#585C5C] text-[12px] font-normal">
//                   Now
//                 </div>
//                 <div>Al Musalla</div>
//               </div>
//             </div>
//             <div className="text-[#00b8a9] text-[14px] self-center">Change</div>
//           </div>

//           <div className="w-full border-b border-[#eee]"></div>

//           <div className="space-y-6 h-[100%] overflow-auto">
//             <RadioGroup defaultValue="option-one" className="pt-4 pl-2">
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="option-one" id="option-one" />
//                 <Label htmlFor="option-one">Delivery</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="option-two" id="option-two" />
//                 <Label htmlFor="option-two">Pickup</Label>
//               </div>
//             </RadioGroup>

//             <div className="w-full border-b border-[#eee]"></div>

//             <Accordion type="single" collapsible defaultValue="item-1">
//               <AccordionItem value="item-1">
//                 <AccordionTrigger>
//                   <p className="text-[#2e3333] text-[14px]">Sort</p>
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   <RadioGroup defaultValue="option-one" className="pt-4 pl-2">
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="option-one" id="option-one" />
//                       <Label htmlFor="option-one">Distance</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="option-two" id="option-two" />
//                       <Label htmlFor="option-two">Quickest delivery</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="option-three" id="option-three" />
//                       <Label htmlFor="option-three">Recommended</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="option-four" id="option-four" />
//                       <Label htmlFor="option-four">Top-rated</Label>
//                     </div>
//                   </RadioGroup>
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>

//             <div className="w-full border-b border-[#eee]"></div>

//             <Accordion type="single" collapsible defaultValue="item-2">
//               <AccordionItem value="item-2">
//                 <AccordionTrigger>
//                   <p className="text-[#2e3333] text-[14px]">Sort</p>
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   <RadioGroup defaultValue="option-one" className="pt-4 pl-2">
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="option-one" id="option-one" />
//                       <Label htmlFor="option-one">Distance</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="option-two" id="option-two" />
//                       <Label htmlFor="option-two">Quickest delivery</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="option-three" id="option-three" />
//                       <Label htmlFor="option-three">Recommended</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="option-four" id="option-four" />
//                       <Label htmlFor="option-four">Top-rated</Label>
//                     </div>
//                   </RadioGroup>
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//             <div className="w-full border-b border-[#eee]"></div>

//             <Accordion type="single" collapsible defaultValue="item-3">
//               <AccordionItem value="item-3">
//                 <AccordionTrigger>
//                   <p className="text-[#2e3333] text-[14px]">Sort</p>
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   <RadioGroup defaultValue="option-one" className="pt-4 pl-2">
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="option-one" id="option-one" />
//                       <Label htmlFor="option-one">Distance</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="option-two" id="option-two" />
//                       <Label htmlFor="option-two">Quickest delivery</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="option-three" id="option-three" />
//                       <Label htmlFor="option-three">Recommended</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="option-four" id="option-four" />
//                       <Label htmlFor="option-four">Top-rated</Label>
//                     </div>
//                   </RadioGroup>
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//             <div className="w-full border-b border-[#eee]"></div>

//             <Accordion type="single" collapsible defaultValue="item-4">
//               <AccordionItem value="item-4">
//                 <AccordionTrigger>
//                   <p className="text-[#2e3333] text-[14px]">Sort</p>
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   <RadioGroup defaultValue="option-one" className="pt-4 pl-2">
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="option-one" id="option-one" />
//                       <Label htmlFor="option-one">Distance</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="option-two" id="option-two" />
//                       <Label htmlFor="option-two">Quickest delivery</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="option-three" id="option-three" />
//                       <Label htmlFor="option-three">Recommended</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="option-four" id="option-four" />
//                       <Label htmlFor="option-four">Top-rated</Label>
//                     </div>
//                   </RadioGroup>
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           </div>
//         </div>

//         {/* ////////////////// main content ////////////////// */}
//         <div className=" w-full">
//           <div className="space-y-4">
//             {/* <div className="text-[22px]">Top picks in your neighbourhood</div> */}
//             {/* <TopPicks /> */}

//             {data != null ? (
//               <div className="grid grid-cols-6 gap-4 w-full justify-evenly font-normal ">
//                 {data.map((t: Restaurant) => (
//                   <Link
//                     href={"/menu/" + t.objectID}
//                     key={t.id}
//                     className="shadow-md rounded-md "
//                   >
//                     <div className="h-[147px]  relative">
//                       <Image
//                         src={t.coverImage}
//                         alt="restaurant image"
//                         fill
//                         sizes="200"
//                         className="absolute z-[1]"
//                       ></Image>
//                       <div className="space-y-2 absolute z-[2] top-[10px] text-xs font-semibold">
//                         <div className="bg-[#bf3f35] text-white py-1 px-2">
//                           Low delivery fee
//                         </div>
//                         {t.onlyOnDeliveroo && (
//                           <div className="bg-[#00ccbd] text-black py-1 px-2">
//                             Only on Deliveroo
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     <div className="p-[12px] space-y-2 text-sm">
//                       <div className="font-semibold">{t.name}</div>
//                       <div className="flex gap-1 items-center overflow-auto">
//                         <span>
//                           <Star
//                             className="fill-[#4d7c1b] text-[#4d7c1b]"
//                             size="14"
//                           />
//                         </span>
//                         {t?.rating ? (
//                           <p className="text-[#4d7c1b]">
//                             {t?.rating + " Excellent (500+)"}
//                           </p>
//                         ) : (
//                           <p className="text-[#4d7c1b]">New on Deliveroo</p>
//                         )}
//                         <p className="line-clamp-1">• 0.3 km</p>
//                       </div>
//                       {t?.deliveryFee && (
//                         <p>AED {t?.deliveryFee + " delivery"}</p>
//                       )}
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             ) : (
//               "loading"
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/restaurants/page.tsx

import Image from "next/image";
import TopPicks from "./components/TopPicks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Header from "@/components/header";
import { searchRestaurants } from "@/utils/http";
import { Restaurant } from "@/utils/typesFirebase";
import { Star } from "lucide-react";
import Link from "next/link";

// Ensure this component is treated as a server component
export const dynamic = "force-dynamic";

interface RestaurantsProps {
  data: Restaurant[] | null;
}

const fetchRestaurants = async () => {
  try {
    const data = await searchRestaurants({ page: 0 });
    return data.hits;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
};

const Restaurants: React.FC<RestaurantsProps> = async () => {
  const data = await fetchRestaurants();

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
          <div className="space-y-4">
            {/* <div className="text-[22px]">Top picks in your neighbourhood</div> */}
            {/* <TopPicks /> */}

            {data != null ? (
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
            ) : (
              "loading"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
