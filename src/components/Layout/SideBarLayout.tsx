import React from "react";
import { ChildrenProps } from "@/types";
import { MainLayout } from "./MainLayout";
import { Flex } from "@chakra-ui/react";

export const SideBarLayout = ({ children }: ChildrenProps) => {
  return (
    <>
      <MainLayout>
        <Flex
          direction={{ base: "column-reverse", lg: "row" }}
          gap={{ base: "12", lg: "16" }}
          flex="1"
          mt={{ base: "2", lg: "12" }}
        >
          {children}
        </Flex>
      </MainLayout>
    </>
  );
};
