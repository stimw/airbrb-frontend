import React from "react";
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
  Flex,
  Stack,
} from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { usePublishMutation } from "../../hooks/usePublishMutation";
import { DateRangePicker } from "react-date-range";
import dayjs from "dayjs";
import { useAtom, atom } from "jotai";

type Props = {
  id: number;
};

type Ranges = {
  [key: string]: {
    startDate: Date;
    endDate: Date;
  };
};

const selectionRanges = {
  0: {
    startDate: new Date(),
    endDate: new Date(),
    key: "0",
  },
};

const rangesAtom = atom<Ranges>(selectionRanges);
const addRangeAtom = atom(
  null,
  (get, set, range: typeof selectionRanges["0"]) => {
    set(rangesAtom, (prev) => {
      const newKey = Object.keys(prev).length + 1;
      return {
        ...prev,
        [newKey]: {
          ...range,
          key: newKey.toString(),
        },
      };
    });
  }
);
const resetRangeAtom = atom(null, (get, set) => {
  set(rangesAtom, selectionRanges);
});

const rangesToString = (ranges: Ranges) => {
  return {
    availability: Object.values(ranges).map((range) => {
      return {
        startDate: dayjs(range.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(range.endDate).format("YYYY-MM-DD"),
      };
    }),
  };
};

export function PublishModal(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const publishMutation = usePublishMutation(props.id);

  const [ranges, setRanges] = useAtom(rangesAtom);
  const [, addRange] = useAtom(addRangeAtom);
  const [, resetRange] = useAtom(resetRangeAtom);

  return (
    <>
      <Button onClick={onOpen} variant="link" fontSize="sm" fontWeight="bold">
        <WarningTwoIcon mr={2} />
        Unpublished
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
          <ModalHeader>Publish Listing</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex justifyContent="space-between">
              <DateRangePicker
                onChange={(r) => {
                  setRanges({ ...ranges, ...(r as Ranges) });
                }}
                ranges={Object.values(ranges)}
                rangeColors={["#ff395d"]}
              />
              <Stack>
                <Button
                  onClick={() => addRange(selectionRanges["0"])}
                  size="sm"
                >
                  Add
                </Button>
                <Button onClick={resetRange} size="sm">
                  Reset
                </Button>
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              name="publish-modal-submit"
              onClick={() => {
                publishMutation.mutate(rangesToString(ranges));
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
