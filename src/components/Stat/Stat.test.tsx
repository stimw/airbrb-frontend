import React from "react";
import { render, screen } from "@testing-library/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Stat } from "./Stat";

const fakeProps = {
  icon: HamburgerIcon,
  label: "Hamburger",
  value: "10",
};

// test if the stat renders
it("renders stat", () => {
  render(
    <Stat
      icon={fakeProps.icon}
      label={fakeProps.label}
      value={fakeProps.value}
    />
  );
  const linkElement = screen.getByTestId("stat");
  expect(linkElement).toBeInTheDocument();
});

// test if the stat renders the correct label and value through props
it("renders stat with correct label", () => {
  render(
    <Stat
      icon={fakeProps.icon}
      label={fakeProps.label}
      value={fakeProps.value}
    />
  );
  const linkElement = screen.getByText(/Hamburger/i);
  expect(linkElement).toBeInTheDocument();
  const linkElement2 = screen.getByText(/10/i);
  expect(linkElement2).toBeInTheDocument();
});
