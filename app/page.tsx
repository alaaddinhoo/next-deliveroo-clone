"use client";

import { useEffect, useState } from "react";
import { batchPostJsonDocuments } from "@/utils/firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
// const json = [
//   {
//     fields: {
//       name: { stringValue: "McDonald's" },
//       onlyOnDeliveroo: { booleanValue: true },
//       deliveryFee: { doubleValue: 10 },
//       coverImage: {
//         stringValue:
//           "https://rs-menus-api.roocdn.com/images/9d969e3c-b340-497b-8d87-3d83aeecb38e/image.jpeg?width=533&height=300&auto=webp&format=jpg&fit=crop&quot",
//       },
//     },
//   },
//   {
//     fields: {
//       name: { stringValue: "Burger King" },
//       onlyOnDeliveroo: { booleanValue: false },
//       deliveryFee: { doubleValue: 10 },
//       coverImage: {
//         stringValue:
//           "https://rs-menus-api.roocdn.com/images/91c46997-0868-4cdd-b58f-32fbe971a1be/image.jpeg?width=658&height=446&auto=webp&format=jpg&fit=crop&quot",
//       },
//     },
//   },
//   {
//     fields: {
//       name: { stringValue: "Subway" },
//       onlyOnDeliveroo: { booleanValue: true },
//       deliveryFee: { doubleValue: 10 },
//       coverImage: {
//         stringValue:
//           "https://rs-menus-api.roocdn.com/images/17f4cd1e-7531-4dbb-b14c-47ea3ec4e7b3/image.jpeg?width=533&height=300&auto=webp&format=jpg&fit=crop&quot",
//       },
//     },
//   },
// ];

const json = [
  {
    restaurantID: "QbyVPK9ph0e2NYkilO10",
    categories: [
      {
        name: "Appetizers",
        description: "Start your meal with our delicious appetizers.",
        items: [
          {
            name: "Spring Rolls",
            image:
              "https://rs-menus-api.roocdn.com/images/6db93162-550d-4fd3-ae18-e77ffba796c7/image.jpeg",
            subTitle: "Crispy and delicious",
            description: "Fried spring rolls with a savory filling.",
            price: 5.99,
            addons: [
              {
                title: "Sauces",
                items: [
                  { name: "Sweet Chili", type: "choice", price: 0.5 },
                  { name: "Peanut Sauce", type: "choice", price: 0.75 },
                  { name: "Remove Lettuce", type: "remove" },
                ],
              },
            ],
          },
          {
            name: "Garlic Bread",
            image:
              "https://rs-menus-api.roocdn.com/images/d66470d6-1da9-48bb-9467-e3b24a752b14/image.jpeg",
            subTitle: "Freshly baked",
            description: "Warm garlic bread with herbs.",
            price: 3.99,
            addons: [
              {
                title: "Extra Toppings",
                items: [
                  { name: "Cheese", type: "choice", price: 1.0 },
                  { name: "Remove Garlic", type: "remove" },
                ],
              },
            ],
          },
          {
            name: "Garlic Bread",
            image:
              "https://rs-menus-api.roocdn.com/images/d66470d6-1da9-48bb-9467-e3b24a752b14/image.jpeg",
            subTitle: "Freshly baked",
            description: "Warm garlic bread with herbs.",
            price: 3.99,
            addons: [
              {
                title: "Extra Toppings",
                items: [
                  { name: "Cheese", type: "choice", price: 1.0 },
                  { name: "Remove Garlic", type: "remove" },
                ],
              },
            ],
          },

          {
            name: "Garlic Bread",
            image:
              "https://rs-menus-api.roocdn.com/images/d66470d6-1da9-48bb-9467-e3b24a752b14/image.jpeg",
            subTitle: "Freshly baked",
            description: "Warm garlic bread with herbs.",
            price: 3.99,
            addons: [
              {
                title: "Extra Toppings",
                items: [
                  { name: "Cheese", type: "choice", price: 1.0 },
                  { name: "Remove Garlic", type: "remove" },
                ],
              },
            ],
          },

          {
            name: "Garlic Bread",
            image:
              "https://rs-menus-api.roocdn.com/images/d66470d6-1da9-48bb-9467-e3b24a752b14/image.jpeg",
            subTitle: "Freshly baked",
            description: "Warm garlic bread with herbs.",
            price: 3.99,
            addons: [
              {
                title: "Extra Toppings",
                items: [
                  { name: "Cheese", type: "choice", price: 1.0 },
                  { name: "Remove Garlic", type: "remove" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Burgers",
        description: "Our juicy and flavorful burgers.",
        items: [
          {
            name: "Classic Cheeseburger",
            image:
              "https://rs-menus-api.roocdn.com/images/11a4e03c-4774-428a-93d2-69b6b5aa4448/image.jpeg",
            subTitle: "Juicy beef patty with cheese",
            description: "A classic cheeseburger with all the fixings.",
            price: 7.99,
            addons: [
              {
                title: "Extras",
                items: [
                  { name: "Bacon", type: "choice", price: 1.5 },
                  { name: "Extra Cheese", type: "choice", price: 0.75 },
                ],
              },
            ],
          },
          {
            name: "Veggie Burger",
            image:
              "https://rs-menus-api.roocdn.com/images/d2ea80df-75f9-4002-96dd-c1bfd8d3d15b/image.jpeg",
            subTitle: "Plant-based patty",
            description: "A delicious veggie burger with fresh toppings.",
            price: 6.99,
            addons: [
              {
                title: "Extras",
                items: [
                  { name: "Avocado", type: "choice", price: 1.0 },
                  { name: "Remove Mayo", type: "remove" },
                ],
              },
            ],
          },
          {
            name: "Veggie Burger",
            image:
              "https://rs-menus-api.roocdn.com/images/d2ea80df-75f9-4002-96dd-c1bfd8d3d15b/image.jpeg",
            subTitle: "Plant-based patty",
            description: "A delicious veggie burger with fresh toppings.",
            price: 6.99,
            addons: [
              {
                title: "Extras",
                items: [
                  { name: "Avocado", type: "choice", price: 1.0 },
                  { name: "Remove Mayo", type: "remove" },
                ],
              },
            ],
          },
          {
            name: "Veggie Burger",
            image:
              "https://rs-menus-api.roocdn.com/images/d2ea80df-75f9-4002-96dd-c1bfd8d3d15b/image.jpeg",
            subTitle: "Plant-based patty",
            description: "A delicious veggie burger with fresh toppings.",
            price: 6.99,
            addons: [
              {
                title: "Extras",
                items: [
                  { name: "Avocado", type: "choice", price: 1.0 },
                  { name: "Remove Mayo", type: "remove" },
                ],
              },
            ],
          },
          {
            name: "Veggie Burger",
            image:
              "https://rs-menus-api.roocdn.com/images/d2ea80df-75f9-4002-96dd-c1bfd8d3d15b/image.jpeg",
            subTitle: "Plant-based patty",
            description: "A delicious veggie burger with fresh toppings.",
            price: 6.99,
            addons: [
              {
                title: "Extras",
                items: [
                  { name: "Avocado", type: "choice", price: 1.0 },
                  { name: "Remove Mayo", type: "remove" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Salads",
        description: "Fresh and healthy salads.",
        items: [
          {
            name: "Caesar Salad",
            image:
              "https://rs-menus-api.roocdn.com/images/e2084183-3cb4-4320-afd5-59ce55fde7f8/image.jpeg",
            subTitle: "Classic salad with Caesar dressing",
            description:
              "Crisp romaine lettuce, croutons, and Parmesan cheese.",
            price: 4.99,
            addons: [
              {
                title: "Proteins",
                items: [
                  { name: "Grilled Chicken", type: "choice", price: 2.0 },
                  { name: "Shrimp", type: "choice", price: 3.0 },
                ],
              },
              {
                title: "Dressings",
                items: [
                  { name: "Ranch", type: "choice", price: 0.5 },
                  { name: "Balsamic Vinaigrette", type: "choice", price: 0.75 },
                  { name: "No Dressing", type: "remove" },
                ],
              },
            ],
          },
          {
            name: "Caesar Salad",
            image:
              "https://rs-menus-api.roocdn.com/images/e2084183-3cb4-4320-afd5-59ce55fde7f8/image.jpeg",
            subTitle: "Classic salad with Caesar dressing",
            description:
              "Crisp romaine lettuce, croutons, and Parmesan cheese.",
            price: 4.99,
            addons: [
              {
                title: "Proteins",
                items: [
                  { name: "Grilled Chicken", type: "choice", price: 2.0 },
                  { name: "Shrimp", type: "choice", price: 3.0 },
                ],
              },
              {
                title: "Dressings",
                items: [
                  { name: "Ranch", type: "choice", price: 0.5 },
                  { name: "Balsamic Vinaigrette", type: "choice", price: 0.75 },
                  { name: "No Dressing", type: "remove" },
                ],
              },
            ],
          },
          {
            name: "Caesar Salad",
            image:
              "https://rs-menus-api.roocdn.com/images/e2084183-3cb4-4320-afd5-59ce55fde7f8/image.jpeg",
            subTitle: "Classic salad with Caesar dressing",
            description:
              "Crisp romaine lettuce, croutons, and Parmesan cheese.",
            price: 4.99,
            addons: [
              {
                title: "Proteins",
                items: [
                  { name: "Grilled Chicken", type: "choice", price: 2.0 },
                  { name: "Shrimp", type: "choice", price: 3.0 },
                ],
              },
              {
                title: "Dressings",
                items: [
                  { name: "Ranch", type: "choice", price: 0.5 },
                  { name: "Balsamic Vinaigrette", type: "choice", price: 0.75 },
                  { name: "No Dressing", type: "remove" },
                ],
              },
            ],
          },
          {
            name: "Caesar Salad",
            image:
              "https://rs-menus-api.roocdn.com/images/e2084183-3cb4-4320-afd5-59ce55fde7f8/image.jpeg",
            subTitle: "Classic salad with Caesar dressing",
            description:
              "Crisp romaine lettuce, croutons, and Parmesan cheese.",
            price: 4.99,
            addons: [
              {
                title: "Proteins",
                items: [
                  { name: "Grilled Chicken", type: "choice", price: 2.0 },
                  { name: "Shrimp", type: "choice", price: 3.0 },
                ],
              },
              {
                title: "Dressings",
                items: [
                  { name: "Ranch", type: "choice", price: 0.5 },
                  { name: "Balsamic Vinaigrette", type: "choice", price: 0.75 },
                  { name: "No Dressing", type: "remove" },
                ],
              },
            ],
          },
          {
            name: "Greek Salad",
            image:
              "https://rs-menus-api.roocdn.com/images/480ca15f-8a01-4b8e-9cf8-30ede99b7268/image.jpeg",
            subTitle: "Fresh and tangy",
            description:
              "Mixed greens, olives, feta cheese, and Greek dressing.",
            price: 5.49,
            addons: [
              {
                title: "Extras",
                items: [
                  { name: "Extra Feta", type: "choice", price: 1.0 },
                  { name: "Remove Olives", type: "remove" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Desserts",
        description: "Sweet and delightful desserts.",
        items: [
          {
            name: "Chocolate Cake",
            image:
              "https://rs-menus-api.roocdn.com/images/ed1869d5-576c-4881-8a6f-a4bbd6e3f1da/image.jpeg",
            subTitle: "Decadent and rich",
            description: "Moist chocolate cake with chocolate frosting.",
            price: 3.99,
            addons: [
              {
                title: "Toppings",
                items: [
                  { name: "Vanilla Ice Cream", type: "choice", price: 1.5 },
                  { name: "Remove Nuts", type: "remove" },
                ],
              },
            ],
          },
          {
            name: "Cheesecake",
            image:
              "https://rs-menus-api.roocdn.com/images/46432300-8c44-4723-ae2f-e98f67ebc10c/image.jpeg",
            subTitle: "Creamy and smooth",
            description: "New York style cheesecake with graham cracker crust.",
            price: 4.49,
            addons: [
              {
                title: "Toppings",
                items: [
                  { name: "Strawberry Sauce", type: "choice", price: 0.75 },
                  { name: "Remove Whipped Cream", type: "remove" },
                ],
              },
            ],
          },
          {
            name: "Cheesecake",
            image:
              "https://rs-menus-api.roocdn.com/images/46432300-8c44-4723-ae2f-e98f67ebc10c/image.jpeg",
            subTitle: "Creamy and smooth",
            description: "New York style cheesecake with graham cracker crust.",
            price: 4.49,
            addons: [
              {
                title: "Toppings",
                items: [
                  { name: "Strawberry Sauce", type: "choice", price: 0.75 },
                  { name: "Remove Whipped Cream", type: "remove" },
                ],
              },
            ],
          },
          {
            name: "Cheesecake",
            image:
              "https://rs-menus-api.roocdn.com/images/46432300-8c44-4723-ae2f-e98f67ebc10c/image.jpeg",
            subTitle: "Creamy and smooth",
            description: "New York style cheesecake with graham cracker crust.",
            price: 4.49,
            addons: [
              {
                title: "Toppings",
                items: [
                  { name: "Strawberry Sauce", type: "choice", price: 0.75 },
                  { name: "Remove Whipped Cream", type: "remove" },
                ],
              },
            ],
          },
          {
            name: "Cheesecake",
            image:
              "https://rs-menus-api.roocdn.com/images/46432300-8c44-4723-ae2f-e98f67ebc10c/image.jpeg",
            subTitle: "Creamy and smooth",
            description: "New York style cheesecake with graham cracker crust.",
            price: 4.49,
            addons: [
              {
                title: "Toppings",
                items: [
                  { name: "Strawberry Sauce", type: "choice", price: 0.75 },
                  { name: "Remove Whipped Cream", type: "remove" },
                ],
              },
            ],
          },
          {
            name: "Cheesecake",
            image:
              "https://rs-menus-api.roocdn.com/images/46432300-8c44-4723-ae2f-e98f67ebc10c/image.jpeg",
            subTitle: "Creamy and smooth",
            description: "New York style cheesecake with graham cracker crust.",
            price: 4.49,
            addons: [
              {
                title: "Toppings",
                items: [
                  { name: "Strawberry Sauce", type: "choice", price: 0.75 },
                  { name: "Remove Whipped Cream", type: "remove" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function Home() {
  const handlePostData = async () => {
    try {
      await batchPostJsonDocuments(json, "menu");
      console.log("Posted successfully");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handlePostData}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Post Sample Data to Firebase
      </button>
    </div>
  );
}
