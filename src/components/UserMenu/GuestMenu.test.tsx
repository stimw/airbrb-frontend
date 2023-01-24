import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { GuestMenu } from "./GuestMenu";
import { BrowserRouter } from "react-router-dom";

const MockGuestMenu = () => {
  return (
    <BrowserRouter>
      <GuestMenu />
    </BrowserRouter>
  );
};

// test if the guest menu rendering and navigating correctly
it("should full app rendering/navigating", async () => {
  render(<MockGuestMenu />);
  const user = userEvent.setup();
  const linkElement = screen.getByTestId("guest-menu");
  expect(linkElement).toBeInTheDocument();

  expect(screen.getByTestId("all-listings")).toBeInTheDocument();
  expect(screen.getByTestId("login-button")).toBeInTheDocument();
  expect(screen.getByTestId("register-button")).toBeInTheDocument();
  await user.click(screen.getByTestId("login-button"));
  expect(window.location.pathname).toBe("/login");
  await user.click(screen.getByTestId("register-button"));
  expect(window.location.pathname).toBe("/register");
  await user.click(screen.getByTestId("all-listings"));
  expect(window.location.pathname).toBe("/listings");
});

// test if the mobile menu is "display: block" when the screen is small
const resizeWindow = (x: number, y: number) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event("resize"));
};

it("should the style of mobile menu be 'display: block' when screen is small", () => {
  render(<MockGuestMenu />);
  resizeWindow(400, 700);
  const linkElement = screen.getByTestId("mobile-menu");
  const style = window.getComputedStyle(linkElement);
  expect(linkElement).toBeVisible();
  expect(style.display).toBe("block");
});
