"use client";

import { useEffect, useState } from "react";
import { db } from "@/utils/firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
const sampleRestaurants = [
  {
    fields: {
      name: { stringValue: "McDonald's" },
      onlyOnDeliveroo: { booleanValue: true },
      deliveryFee: { doubleValue: 10 },
      coverImage: {
        stringValue:
          "https://rs-menus-api.roocdn.com/images/9d969e3c-b340-497b-8d87-3d83aeecb38e/image.jpeg?width=533&height=300&auto=webp&format=jpg&fit=crop&quot",
      },
    },
  },
  {
    fields: {
      name: { stringValue: "Burger King" },
      onlyOnDeliveroo: { booleanValue: false },
      deliveryFee: { doubleValue: 10 },
      coverImage: {
        stringValue:
          "https://rs-menus-api.roocdn.com/images/91c46997-0868-4cdd-b58f-32fbe971a1be/image.jpeg?width=658&height=446&auto=webp&format=jpg&fit=crop&quot",
      },
    },
  },
  {
    fields: {
      name: { stringValue: "Subway" },
      onlyOnDeliveroo: { booleanValue: true },
      deliveryFee: { doubleValue: 10 },
      coverImage: {
        stringValue:
          "https://rs-menus-api.roocdn.com/images/17f4cd1e-7531-4dbb-b14c-47ea3ec4e7b3/image.jpeg?width=533&height=300&auto=webp&format=jpg&fit=crop&quot",
      },
    },
  },
];

const postToFirebase = async (restaurant: any) => {
  const response = await fetch(
    "https://firestore.googleapis.com/v1/projects/nextjs-test-8e44c/databases/(default)/documents/restaurants?key=YOUR_API_KEY",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurant),
    }
  );

  if (!response.ok) {
    throw new Error("Error posting to Firebase");
  }

  return await response.json();
};

export default function Home() {
  // const handlePostData = async () => {
  //   try {
  //     const results = await Promise.all(
  //       sampleRestaurants.map((restaurant) => postToFirebase(restaurant))
  //     );
  //     console.log("Posted successfully:", results);
  //   } catch (error) {
  //     console.error("Error posting data:", error);
  //   }
  // };

  return (
    <div>
      {/* <button
        onClick={handlePostData}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Post Sample Data to Firebase
      </button> */}
    </div>
  );
}
