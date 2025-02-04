import React from "react";
import Restaurants from "../page"; // Adjust the path if necessary
import { render, screen, waitFor } from "@testing-library/react";
import { expect } from "@jest/globals";
import { ReactNode } from "react";

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

// Mock the searchRestaurants function:
jest.mock("@/utils/http", () => ({
  searchRestaurants: jest.fn().mockResolvedValue({
    hits: [
      {
        id: "1",
        objectID: "1",
        coverImage: "/someimage.jpg",
        name: "Test Restaurant",
        rating: 4.5,
        deliveryFee: 10,
        onlyOnDeliveroo: true,
      },
    ],
    nbHits: 1,
  }),
}));

// The issue you are encountering with Jest is likely due to the react-splide package or another dependency using syntax or features that Jest does not understand out of the box. Here are some steps you can take to resolve this issue:
// Transform Modules: Update your Jest configuration to transform the react-splide module using Babel.
// Global Setup: Ensure that your global.d.ts file is properly recognized and that the module declaration for @splidejs/react-splide is correct.
// Polyfills: Ensure that any necessary polyfills or configuration for react-splide are included in your Jest setup.
jest.mock("@splidejs/react-splide", () => ({
  Splide: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  SplideSlide: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

// ReferenceError: ResizeObserver is not defined.. Fix:
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

it("should render All Restaurantst text", async () => {
  render(<Restaurants />);
  const allRestaurantsElement = await screen.findByTestId("all-restaurants");
  expect(allRestaurantsElement).toHaveTextContent("All Restaurants");
});

it("should render only one restaurant", async () => {
  render(<Restaurants />);
  const allRestaurantsElement = await screen.findAllByTestId("restaurant-item"); // should be findAll cuz it'll return an array then we can check length
  expect(allRestaurantsElement).toHaveLength(1); // expect 1 element
});

it("should render mock's restaurant name: Test Restaurant", async () => {
  render(<Restaurants />);
  const allRestaurantsElement = await screen.findByText("Test Restaurant");
  expect(allRestaurantsElement).not.toBeNull;
});
