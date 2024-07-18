import React from "react";
import Restaurants from "../page"; // Adjust the path if necessary
import { render, screen } from "@testing-library/react";

it("should render", async () => {
  render(<Restaurants />);
  const allRestaurantsElement = screen.getByTestId("all-restaurants");
  expect(allRestaurantsElement).toBeInTheDocument();
});
