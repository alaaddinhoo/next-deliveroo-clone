"use client";
import { Restaurant } from "@/utils/typesFirebase";
import Slider from "./PromoSlider";
import { useEffect, useState } from "react";
import { db, getAllDocumentsFromCollection } from "@/utils/firebase/firebase";
import { collection, onSnapshot, DocumentData } from "firebase/firestore";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function TopPicks() {
  const [data, setData] = useState<Restaurant[]>([]);

  // real-time fetch
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     collection(db, "restaurants"),
  //     (snapshot) => {
  //       const newData: Restaurant[] = snapshot.docs.map((doc) => {
  //         // Ensure data conforms to Restaurant interface
  //         const data = doc.data() as DocumentData;
  //         return {
  //           id: doc.id,
  //           ...data,
  //         } as Restaurant;
  //       });
  //       console.log("New data:", newData);
  //       setData(newData); // Update state with fetched data
  //     }
  //   );
  //   return () => unsubscribe();
  // }, []);

  // single fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurants = await getAllDocumentsFromCollection<Restaurant>(
          "restaurants"
        );
        setData(restaurants);
        console.log(restaurants);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="font-normal">
      {/* {data != null ? <Slider data={data} /> : "loading"} */}

      {data != null ? (
        <div className="grid grid-cols-6 gap-4 w-full justify-evenly  ">
          {data.map((t: Restaurant) => (
            <Link
              href={"/menu/" + t.id}
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
                    <p className="text-[#4d7c1b]">
                      {t?.rating + " Excellent (500+)"}
                    </p>
                  ) : (
                    <p className="text-[#4d7c1b]">New on Deliveroo</p>
                  )}
                  <p className="line-clamp-1">• 0.3 km</p>
                </div>
                {t?.deliveryFee && <p>AED {t?.deliveryFee + " delivery"}</p>}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
}
