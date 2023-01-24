import React from "react";
import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  ButtonProps,
} from "@chakra-ui/react";

type Props = {
  name: string;
  title: string;
  message: string;
  onConfirm: () => void;
  buttonProps?: ButtonProps;
  children?: React.ReactNode;
};

export function Confirm(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  return (
    <>
      <Button onClick={onOpen} {...props.buttonProps} name={props.name}>
        {props.children}
        {props.name}
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{props.title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{props.message}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              variant="ghost"
              colorScheme="gray"
            >
              No
            </Button>
            <Button
              ml={3}
              onClick={() => {
                props.onConfirm();
                onClose();
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
