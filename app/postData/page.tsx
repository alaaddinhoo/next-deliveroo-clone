"use client";

import { batchPostJsonDocuments } from "@/utils/firebase/firebase";

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
    name: "McDonald's",
    onlyOnDeliveroo: true,
    deliveryFee: 5,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/91c46997-0868-4cdd-b58f-32fbe971a1be/image.jpeg",
    rating: 4.5,
  },
  {
    name: "Burger King",
    onlyOnDeliveroo: false,
    deliveryFee: 3,
    open: false,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/ee7ccc59-e983-402d-abab-0c4aaea941df/image.jpeg",
    rating: 4.2,
  },
  {
    name: "Pizza Hut",
    onlyOnDeliveroo: true,
    deliveryFee: 4,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/ada9843a-6d46-43a8-8baf-ccceb75e6512/image.jpeg",
  },
  {
    name: "KFC",
    onlyOnDeliveroo: false,
    deliveryFee: 2,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/9d969e3c-b340-497b-8d87-3d83aeecb38e/image.jpeg",
    rating: 4.6,
  },
  {
    name: "Subway",
    onlyOnDeliveroo: true,
    deliveryFee: 10,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/17f4cd1e-7531-4dbb-b14c-47ea3ec4e7b3/image.jpeg",
  },
  {
    name: "Taco Bell",
    onlyOnDeliveroo: false,
    deliveryFee: 7,
    open: false,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/ccfff82d-8524-43f4-ba93-32b72a54e650/image.jpeg",
    rating: 4.3,
  },
  {
    name: "Domino's Pizza",
    onlyOnDeliveroo: true,
    deliveryFee: 6,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/1b02d725-e5c0-4fb6-8349-36741513b3e4/image.jpeg",
  },
  {
    name: "Panda Express",
    onlyOnDeliveroo: false,
    deliveryFee: 3,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/8fe5ba10-5644-4e51-b4a8-80e88def485f/image.jpeg",
    rating: 4.1,
  },
  {
    name: "Wendy's",
    onlyOnDeliveroo: true,
    deliveryFee: 5,
    open: false,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/626da4e1-33c3-4b2e-b127-b44f5b01de2a/image.jpeg",
  },
  {
    name: "Five Guys",
    onlyOnDeliveroo: false,
    deliveryFee: 6,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/debee31a-039b-4c2d-bcf8-4ffdc70ea9db/image.jpeg",
  },
  {
    name: "Chick-fil-A",
    onlyOnDeliveroo: true,
    deliveryFee: 4,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/7d3bc12e-e650-4056-bc59-e0e2306c3b6d/image.jpeg",
    rating: 4.4,
  },
  {
    name: "In-N-Out Burger",
    onlyOnDeliveroo: false,
    deliveryFee: 3,
    open: false,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/b066e65b-2b92-4702-b974-0b454144c48a/image.jpeg",
  },
  {
    name: "Shake Shack",
    onlyOnDeliveroo: true,
    deliveryFee: 6,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/f6575605-fa5e-4303-a8b8-4e3fc861f431/image.jpeg",
    rating: 4.7,
  },
  {
    name: "Chipotle",
    onlyOnDeliveroo: false,
    deliveryFee: 5,
    open: false,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/cc12492e-92e9-497e-83ec-12da2c769d47/image.jpeg",
  },
  {
    name: "Qdoba",
    onlyOnDeliveroo: true,
    deliveryFee: 7,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/78a5221f-332f-4d7e-8c69-7b42875d3312/image.jpeg",
    rating: 4.5,
  },
  {
    name: "El Pollo Loco",
    onlyOnDeliveroo: false,
    deliveryFee: 4,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/82ccbc79-222b-4ed6-b6d0-657ca3a4a508/image.jpeg",
  },
  {
    name: "Jersey Mike's",
    onlyOnDeliveroo: true,
    deliveryFee: 3,
    open: false,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/471c08f1-c38f-4975-82a7-3d4433f83ad7/image.jpeg",
  },
  {
    name: "Jimmy John's",
    onlyOnDeliveroo: false,
    deliveryFee: 5,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/ea041cba-c5ed-4140-9b9b-4648e5737f1f/image.jpeg",
    rating: 4.2,
  },
  {
    name: "Panera Bread",
    onlyOnDeliveroo: true,
    deliveryFee: 4,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/e33616ce-5bf9-49b4-bb94-d87764e2ce35/image.jpeg",
    rating: 4.5,
  },
  {
    name: "Sonic Drive-In",
    onlyOnDeliveroo: false,
    deliveryFee: 5,
    open: false,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/74b37c12-84d9-41eb-a84c-5d6624986769/image.jpeg",
    rating: 4.1,
  },
  {
    name: "Dairy Queen",
    onlyOnDeliveroo: true,
    deliveryFee: 3,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/e33616ce-5bf9-49b4-bb94-d87764e2ce35/image.jpeg",
  },
  {
    name: "Arby's",
    onlyOnDeliveroo: false,
    deliveryFee: 4,
    open: false,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/db75839b-88ff-4dbe-9cff-c2d8b3afc924/image.jpeg",
    rating: 4.2,
  },
  {
    name: "Popeyes",
    onlyOnDeliveroo: true,
    deliveryFee: 6,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/8bf77479-28ee-4efd-a7dd-93310b2c8e10/image.jpeg",
  },
  {
    name: "Quiznos",
    onlyOnDeliveroo: false,
    deliveryFee: 2,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/506dfeb1-ea9e-424d-b6ab-e06e09cf20a3/image.jpeg",
    rating: 4.4,
  },
  {
    name: "Del Taco",
    onlyOnDeliveroo: true,
    deliveryFee: 5,
    open: false,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/25a9a09f-6180-457c-b372-47d8957e5c9b/image.jpeg",
  },
  {
    name: "Baskin-Robbins",
    onlyOnDeliveroo: false,
    deliveryFee: 4,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/d27c0efd-a788-4695-b950-d1708d7696c3/image.jpeg",
    rating: 4.3,
  },
  {
    name: "Einstein Bros. Bagels",
    onlyOnDeliveroo: true,
    deliveryFee: 3,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/3ebaf7e0-4c84-4993-b663-245791e02054/image.jpeg",
  },
  {
    name: "Jamba Juice",
    onlyOnDeliveroo: false,
    deliveryFee: 5,
    open: false,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/0c3c1908-4a92-40a8-b135-b1ca6437f8a7/image.jpeg",
    rating: 4.5,
  },
  {
    name: "Smoothie King",
    onlyOnDeliveroo: true,
    deliveryFee: 4,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/001949bd-224f-48c2-8fd6-2b1d65b2b3ee/image.jpeg",
  },
  {
    name: "Five Guys",
    onlyOnDeliveroo: true,
    deliveryFee: 5,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/dfd6d6fe-1c7a-4bb0-b798-fc8739e9875f/image.jpeg",
    rating: 4.3,
  },
  {
    name: "Shake Shack",
    onlyOnDeliveroo: false,
    deliveryFee: 4,
    open: false,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/0a3560cf-257e-4535-8df5-ac9fea10c5d2/image.jpeg",
    rating: 4.4,
  },
  {
    name: "Taco Bell",
    onlyOnDeliveroo: true,
    deliveryFee: 3,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/7a45f1a1-739c-46d5-be9d-bdddaaa866df/image.jpeg",
  },
  {
    name: "Chipotle",
    onlyOnDeliveroo: false,
    deliveryFee: 6,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/fa043d20-595f-4b0b-bdfd-c60043c316f3/image.jpeg",
    rating: 4.2,
  },
  {
    name: "KFC",
    onlyOnDeliveroo: true,
    deliveryFee: 4,
    open: false,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/86d0f064-f49a-4f84-ae64-6129485608c9/image.jpeg",
  },
  {
    name: "Domino's Pizza",
    onlyOnDeliveroo: false,
    deliveryFee: 5,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/783205e9-717f-428e-9f83-27c6e6024a30/image.jpeg",
    rating: 4.1,
  },
  {
    name: "Little Caesars",
    onlyOnDeliveroo: true,
    deliveryFee: 3,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/77592afb-596f-41ca-8f2b-c49e259e8843/image.jpeg",
  },
  {
    name: "Wingstop",
    onlyOnDeliveroo: false,
    deliveryFee: 4,
    open: false,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/1b02d725-e5c0-4fb6-8349-36741513b3e4/image.jpeg",
    rating: 4.5,
  },
  {
    name: "Papa John's",
    onlyOnDeliveroo: true,
    deliveryFee: 5,
    open: true,
    coverImage:
      "https://rs-menus-api.roocdn.com/images/b86d010e-6035-474c-9fb1-7c9b681c85ab/image.jpeg",
  },
];

const offersOptions = [
  "Buy 1 get 1",
  "Free delivery",
  "Top daily deals",
  "Grocery deals",
];

const dietaryOptions = [
  "Gluten Free",
  "Halal",
  "Organic",
  "Paleo",
  "Vegan Friendly",
];

const cuisinesOptions = [
  "American",
  "Arabic",
  "Asian",
  "Breakfast",
  "Cafe",
  "Chinese",
];

function getRandomSelection(
  options: string[],
  min: number,
  max: number
): string[] {
  const shuffled = options.sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  return shuffled.slice(0, count);
}

const updatedJson = json.map((restaurant) => ({
  ...restaurant,
  offers: getRandomSelection(offersOptions, 1, 3),
  dietary: getRandomSelection(dietaryOptions, 1, 3),
  cuisines: getRandomSelection(cuisinesOptions, 1, 3),
}));

console.log(updatedJson);

// const json = [
//   {
//     restaurantID: "QbyVPK9ph0e2NYkilO10",
//     categories: [
//       {
//         name: "Appetizers",
//         description: "Start your meal with our delicious appetizers.",
//         items: [
//           {
//             name: "Spring Rolls",
//             image:
//               "https://rs-menus-api.roocdn.com/images/6db93162-550d-4fd3-ae18-e77ffba796c7/image.jpeg",
//             subTitle: "Crispy and delicious",
//             description: "Fried spring rolls with a savory filling.",
//             price: 5.99,
//             addons: [
//               {
//                 title: "Sauces",
//                 items: [
//                   { name: "Sweet Chili", type: "choice", price: 0.5 },
//                   { name: "Peanut Sauce", type: "choice", price: 0.75 },
//                   { name: "Remove Lettuce", type: "remove" },
//                 ],
//               },
//             ],
//           },
//           {
//             name: "Garlic Bread",
//             image:
//               "https://rs-menus-api.roocdn.com/images/d66470d6-1da9-48bb-9467-e3b24a752b14/image.jpeg",
//             subTitle: "Freshly baked",
//             description: "Warm garlic bread with herbs.",
//             price: 3.99,
//             addons: [
//               {
//                 title: "Extra Toppings",
//                 items: [
//                   { name: "Cheese", type: "choice", price: 1.0 },
//                   { name: "Remove Garlic", type: "remove" },
//                 ],
//               },
//             ],
//           },
//           {
//             name: "Garlic Bread",
//             image:
//               "https://rs-menus-api.roocdn.com/images/d66470d6-1da9-48bb-9467-e3b24a752b14/image.jpeg",
//             subTitle: "Freshly baked",
//             description: "Warm garlic bread with herbs.",
//             price: 3.99,
//             addons: [
//               {
//                 title: "Extra Toppings",
//                 items: [
//                   { name: "Cheese", type: "choice", price: 1.0 },
//                   { name: "Remove Garlic", type: "remove" },
//                 ],
//               },
//             ],
//           },

//           {
//             name: "Garlic Bread",
//             image:
//               "https://rs-menus-api.roocdn.com/images/d66470d6-1da9-48bb-9467-e3b24a752b14/image.jpeg",
//             subTitle: "Freshly baked",
//             description: "Warm garlic bread with herbs.",
//             price: 3.99,
//             addons: [
//               {
//                 title: "Extra Toppings",
//                 items: [
//                   { name: "Cheese", type: "choice", price: 1.0 },
//                   { name: "Remove Garlic", type: "remove" },
//                 ],
//               },
//             ],
//           },

//           {
//             name: "Garlic Bread",
//             image:
//               "https://rs-menus-api.roocdn.com/images/d66470d6-1da9-48bb-9467-e3b24a752b14/image.jpeg",
//             subTitle: "Freshly baked",
//             description: "Warm garlic bread with herbs.",
//             price: 3.99,
//             addons: [
//               {
//                 title: "Extra Toppings",
//                 items: [
//                   { name: "Cheese", type: "choice", price: 1.0 },
//                   { name: "Remove Garlic", type: "remove" },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         name: "Burgers",
//         description: "Our juicy and flavorful burgers.",
//         items: [
//           {
//             name: "Classic Cheeseburger",
//             image:
//               "https://rs-menus-api.roocdn.com/images/11a4e03c-4774-428a-93d2-69b6b5aa4448/image.jpeg",
//             subTitle: "Juicy beef patty with cheese",
//             description: "A classic cheeseburger with all the fixings.",
//             price: 7.99,
//             addons: [
//               {
//                 title: "Extras",
//                 items: [
//                   { name: "Bacon", type: "choice", price: 1.5 },
//                   { name: "Extra Cheese", type: "choice", price: 0.75 },
//                 ],
//               },
//             ],
//           },
//           {
//             name: "Veggie Burger",
//             image:
//               "https://rs-menus-api.roocdn.com/images/d2ea80df-75f9-4002-96dd-c1bfd8d3d15b/image.jpeg",
//             subTitle: "Plant-based patty",
//             description: "A delicious veggie burger with fresh toppings.",
//             price: 6.99,
//             addons: [
//               {
//                 title: "Extras",
//                 items: [
//                   { name: "Avocado", type: "choice", price: 1.0 },
//                   { name: "Remove Mayo", type: "remove" },
//                 ],
//               },
//             ],
//           },
//           {
//             name: "Veggie Burger",
//             image:
//               "https://rs-menus-api.roocdn.com/images/d2ea80df-75f9-4002-96dd-c1bfd8d3d15b/image.jpeg",
//             subTitle: "Plant-based patty",
//             description: "A delicious veggie burger with fresh toppings.",
//             price: 6.99,
//             addons: [
//               {
//                 title: "Extras",
//                 items: [
//                   { name: "Avocado", type: "choice", price: 1.0 },
//                   { name: "Remove Mayo", type: "remove" },
//                 ],
//               },
//             ],
//           },
//           {
//             name: "Veggie Burger",
//             image:
//               "https://rs-menus-api.roocdn.com/images/d2ea80df-75f9-4002-96dd-c1bfd8d3d15b/image.jpeg",
//             subTitle: "Plant-based patty",
//             description: "A delicious veggie burger with fresh toppings.",
//             price: 6.99,
//             addons: [
//               {
//                 title: "Extras",
//                 items: [
//                   { name: "Avocado", type: "choice", price: 1.0 },
//                   { name: "Remove Mayo", type: "remove" },
//                 ],
//               },
//             ],
//           },
//           {
//             name: "Veggie Burger",
//             image:
//               "https://rs-menus-api.roocdn.com/images/d2ea80df-75f9-4002-96dd-c1bfd8d3d15b/image.jpeg",
//             subTitle: "Plant-based patty",
//             description: "A delicious veggie burger with fresh toppings.",
//             price: 6.99,
//             addons: [
//               {
//                 title: "Extras",
//                 items: [
//                   { name: "Avocado", type: "choice", price: 1.0 },
//                   { name: "Remove Mayo", type: "remove" },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         name: "Salads",
//         description: "Fresh and healthy salads.",
//         items: [
//           {
//             name: "Caesar Salad",
//             image:
//               "https://rs-menus-api.roocdn.com/images/e2084183-3cb4-4320-afd5-59ce55fde7f8/image.jpeg",
//             subTitle: "Classic salad with Caesar dressing",
//             description:
//               "Crisp romaine lettuce, croutons, and Parmesan cheese.",
//             price: 4.99,
//             addons: [
//               {
//                 title: "Proteins",
//                 items: [
//                   { name: "Grilled Chicken", type: "choice", price: 2.0 },
//                   { name: "Shrimp", type: "choice", price: 3.0 },
//                 ],
//               },
//               {
//                 title: "Dressings",
//                 items: [
//                   { name: "Ranch", type: "choice", price: 0.5 },
//                   { name: "Balsamic Vinaigrette", type: "choice", price: 0.75 },
//                   { name: "No Dressing", type: "remove" },
//                 ],
//               },
//             ],
//           },
//           {
//             name: "Caesar Salad",
//             image:
//               "https://rs-menus-api.roocdn.com/images/e2084183-3cb4-4320-afd5-59ce55fde7f8/image.jpeg",
//             subTitle: "Classic salad with Caesar dressing",
//             description:
//               "Crisp romaine lettuce, croutons, and Parmesan cheese.",
//             price: 4.99,
//             addons: [
//               {
//                 title: "Proteins",
//                 items: [
//                   { name: "Grilled Chicken", type: "choice", price: 2.0 },
//                   { name: "Shrimp", type: "choice", price: 3.0 },
//                 ],
//               },
//               {
//                 title: "Dressings",
//                 items: [
//                   { name: "Ranch", type: "choice", price: 0.5 },
//                   { name: "Balsamic Vinaigrette", type: "choice", price: 0.75 },
//                   { name: "No Dressing", type: "remove" },
//                 ],
//               },
//             ],
//           },
//           {
//             name: "Caesar Salad",
//             image:
//               "https://rs-menus-api.roocdn.com/images/e2084183-3cb4-4320-afd5-59ce55fde7f8/image.jpeg",
//             subTitle: "Classic salad with Caesar dressing",
//             description:
//               "Crisp romaine lettuce, croutons, and Parmesan cheese.",
//             price: 4.99,
//             addons: [
//               {
//                 title: "Proteins",
//                 items: [
//                   { name: "Grilled Chicken", type: "choice", price: 2.0 },
//                   { name: "Shrimp", type: "choice", price: 3.0 },
//                 ],
//               },
//               {
//                 title: "Dressings",
//                 items: [
//                   { name: "Ranch", type: "choice", price: 0.5 },
//                   { name: "Balsamic Vinaigrette", type: "choice", price: 0.75 },
//                   { name: "No Dressing", type: "remove" },
//                 ],
//               },
//             ],
//           },
//           {
//             name: "Caesar Salad",
//             image:
//               "https://rs-menus-api.roocdn.com/images/e2084183-3cb4-4320-afd5-59ce55fde7f8/image.jpeg",
//             subTitle: "Classic salad with Caesar dressing",
//             description:
//               "Crisp romaine lettuce, croutons, and Parmesan cheese.",
//             price: 4.99,
//             addons: [
//               {
//                 title: "Proteins",
//                 items: [
//                   { name: "Grilled Chicken", type: "choice", price: 2.0 },
//                   { name: "Shrimp", type: "choice", price: 3.0 },
//                 ],
//               },
//               {
//                 title: "Dressings",
//                 items: [
//                   { name: "Ranch", type: "choice", price: 0.5 },
//                   { name: "Balsamic Vinaigrette", type: "choice", price: 0.75 },
//                   { name: "No Dressing", type: "remove" },
//                 ],
//               },
//             ],
//           },
//           {
//             name: "Greek Salad",
//             image:
//               "https://rs-menus-api.roocdn.com/images/480ca15f-8a01-4b8e-9cf8-30ede99b7268/image.jpeg",
//             subTitle: "Fresh and tangy",
//             description:
//               "Mixed greens, olives, feta cheese, and Greek dressing.",
//             price: 5.49,
//             addons: [
//               {
//                 title: "Extras",
//                 items: [
//                   { name: "Extra Feta", type: "choice", price: 1.0 },
//                   { name: "Remove Olives", type: "remove" },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         name: "Desserts",
//         description: "Sweet and delightful desserts.",
//         items: [
//           {
//             name: "Chocolate Cake",
//             image:
//               "https://rs-menus-api.roocdn.com/images/ed1869d5-576c-4881-8a6f-a4bbd6e3f1da/image.jpeg",
//             subTitle: "Decadent and rich",
//             description: "Moist chocolate cake with chocolate frosting.",
//             price: 3.99,
//             addons: [
//               {
//                 title: "Toppings",
//                 items: [
//                   { name: "Vanilla Ice Cream", type: "choice", price: 1.5 },
//                   { name: "Remove Nuts", type: "remove" },
//                 ],
//               },
//             ],
//           },
//           {
//             name: "Cheesecake",
//             image:
//               "https://rs-menus-api.roocdn.com/images/46432300-8c44-4723-ae2f-e98f67ebc10c/image.jpeg",
//             subTitle: "Creamy and smooth",
//             description: "New York style cheesecake with graham cracker crust.",
//             price: 4.49,
//             addons: [
//               {
//                 title: "Toppings",
//                 items: [
//                   { name: "Strawberry Sauce", type: "choice", price: 0.75 },
//                   { name: "Remove Whipped Cream", type: "remove" },
//                 ],
//               },
//             ],
//           },
//           {
//             name: "Cheesecake",
//             image:
//               "https://rs-menus-api.roocdn.com/images/46432300-8c44-4723-ae2f-e98f67ebc10c/image.jpeg",
//             subTitle: "Creamy and smooth",
//             description: "New York style cheesecake with graham cracker crust.",
//             price: 4.49,
//             addons: [
//               {
//                 title: "Toppings",
//                 items: [
//                   { name: "Strawberry Sauce", type: "choice", price: 0.75 },
//                   { name: "Remove Whipped Cream", type: "remove" },
//                 ],
//               },
//             ],
//           },
//           {
//             name: "Cheesecake",
//             image:
//               "https://rs-menus-api.roocdn.com/images/46432300-8c44-4723-ae2f-e98f67ebc10c/image.jpeg",
//             subTitle: "Creamy and smooth",
//             description: "New York style cheesecake with graham cracker crust.",
//             price: 4.49,
//             addons: [
//               {
//                 title: "Toppings",
//                 items: [
//                   { name: "Strawberry Sauce", type: "choice", price: 0.75 },
//                   { name: "Remove Whipped Cream", type: "remove" },
//                 ],
//               },
//             ],
//           },
//           {
//             name: "Cheesecake",
//             image:
//               "https://rs-menus-api.roocdn.com/images/46432300-8c44-4723-ae2f-e98f67ebc10c/image.jpeg",
//             subTitle: "Creamy and smooth",
//             description: "New York style cheesecake with graham cracker crust.",
//             price: 4.49,
//             addons: [
//               {
//                 title: "Toppings",
//                 items: [
//                   { name: "Strawberry Sauce", type: "choice", price: 0.75 },
//                   { name: "Remove Whipped Cream", type: "remove" },
//                 ],
//               },
//             ],
//           },
//           {
//             name: "Cheesecake",
//             image:
//               "https://rs-menus-api.roocdn.com/images/46432300-8c44-4723-ae2f-e98f67ebc10c/image.jpeg",
//             subTitle: "Creamy and smooth",
//             description: "New York style cheesecake with graham cracker crust.",
//             price: 4.49,
//             addons: [
//               {
//                 title: "Toppings",
//                 items: [
//                   { name: "Strawberry Sauce", type: "choice", price: 0.75 },
//                   { name: "Remove Whipped Cream", type: "remove" },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

const postData = () => {
  const handlePostData = async () => {
    try {
      await batchPostJsonDocuments(updatedJson, "restaurants");
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
};

export default postData;
