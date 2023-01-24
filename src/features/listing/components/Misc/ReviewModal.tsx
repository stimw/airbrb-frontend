import React, { useState } from "react";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import { Rating } from "react-simple-star-rating";
import "./star.css";
import { useWriteReviewMutation } from "@/features/listing/hooks/useWriteReviewMutation";
import tokenHandler from "@/utils/tokenHandler";

type Props = {
  listingId: number;
  bookingId: number;
};

export function ReviewModal(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { mutate } = useWriteReviewMutation(props.bookingId, props.listingId);
  const user = tokenHandler.getToken().user as string;

  return (
    <>
      <Button
        onClick={onOpen}
        size="lg"
        variant="outline"
        colorScheme="gray"
        borderColor="gray.700"
        borderWidth="2px"
      >
        Write a review
      </Button>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Write a review</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Stack>
              <Rating SVGclassName="inline-block" onClick={setRating} />
              <Textarea
                placeholder="how are you feeling with the place?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                focusBorderColor="gray.700"
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                mutate({ review: { user, comment, rating } });
                onClose();
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
