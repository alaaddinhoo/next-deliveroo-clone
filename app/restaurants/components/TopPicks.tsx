"use client";
import { Restaurant } from "@/utils/typesFirebase";
import Slider from "./Slider";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase/firebase";
import { collection, onSnapshot, DocumentData } from "firebase/firestore";
export default function TopPicks() {
  const [data, setData] = useState<Restaurant[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "restaurants"),
      (snapshot) => {
        const newData: Restaurant[] = snapshot.docs.map((doc) => {
          // Ensure data conforms to Restaurant interface
          const data = doc.data() as DocumentData;
          return {
            id: doc.id,
            ...data,
          } as Restaurant;
        });
        console.log("New data:", newData);
        setData(newData); // Update state with fetched data
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="font-normal">
      {/* <Suspense fallback="loading"> */}
      {data != null ? <Slider data={data} /> : "loading"}
      {/* </Suspense> */}
    </div>
  );
}
