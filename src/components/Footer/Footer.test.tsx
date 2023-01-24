import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

// test if the footer renders
it("renders footer", () => {
  render(<Footer />);
  const linkElement = screen.getByText(/All rights reserved./i);
  expect(linkElement).toBeInTheDocument();
});

// test if the footer renders the correct year
it("renders footer with correct year", () => {
  render(<Footer />);
  const re = new RegExp("" + `${new Date().getFullYear()}`, "i");
  const linkElement = screen.getByText(re);
  expect(linkElement).toBeInTheDocument();
});

// test if the footer hide the icons on mobile
const resizeWindow = (x: number, y: number) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event("resize"));
};

it("hide the icons on mobile", () => {
  resizeWindow(400, 700);
  render(<Footer />);
  const linkElement = screen.queryByTestId("social-icons");
  expect(linkElement).not.toBeInTheDocument();
});
