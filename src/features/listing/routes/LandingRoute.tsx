import React from "react";
import { Box } from "@chakra-ui/react";
import { SideBarLayout } from "@/components/Layout";
import { SidebarSearch } from "@/features/listing/components/Sidebar/SidebarSearch";
import Reviews from "@/components/StaticLanding/Reviews";

export const LandingRoute = () => {
  return (
    <SideBarLayout>
      <Box as="main" flex={1}>
        <Reviews />
      </Box>
      <SidebarSearch />
    </SideBarLayout>
  );
};
