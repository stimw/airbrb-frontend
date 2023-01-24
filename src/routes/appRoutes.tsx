import React from "react";
import { NotFound } from "@/features/misc";
import { BookingRequestsRoute, LandingRoute } from "@/features/listing/routes";
import {
  CreateFormRoute,
  HostedListings,
  UpdateFormRoute,
  ListingsRoute,
  ListingDetailRoute,
} from "@/features/listing/routes";

import { Login, Register } from "@/features/auth";

export const appRoutes = [
  { path: "/", element: <LandingRoute /> },
  { path: "/listings", element: <ListingsRoute /> },
  { path: "/listing/:listingId", element: <ListingDetailRoute /> },
  ////////////  Begin Hosted Listings  ////////////
  { path: "/hostedlistings", element: <HostedListings /> },
  { path: "/hostedlistings/create", element: <CreateFormRoute /> },
  { path: "/hostedlistings/:listingId/edit", element: <UpdateFormRoute /> },
  {
    path: "/hostedlistings/:listingId/bookings",
    element: <BookingRequestsRoute />,
  },
  ////////////  End Hosted Listings  ////////////
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
];
