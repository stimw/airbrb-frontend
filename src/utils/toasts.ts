import { createStandaloneToast } from "@chakra-ui/react";

const { toast: errorToast } = createStandaloneToast();
const { toast: successToast } = createStandaloneToast();

export const popErrorToast = (errorMsg: string) => {
  errorToast({
    title: "An error occurred.",
    description: errorMsg,
    status: "error",
    duration: 9000,
    isClosable: true,
  });
};

export const popSuccessToast = (successMsg: string) => {
  successToast({
    title: "Success!",
    description: successMsg,
    status: "success",
    duration: 9000,
    isClosable: true,
  });
};
