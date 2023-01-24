import React, { useEffect } from "react";
import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Button,
} from "@chakra-ui/react";
import { MinusIcon } from "@chakra-ui/icons";
import { DateRange } from "react-date-range";
import { useAtom, atom } from "jotai";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const selectionRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const rangeAtom = atom(selectionRange);

export const SidebarSearchForm = () => {
  const [range, setRange] = useAtom(rangeAtom);
  const navigate = useNavigate();

  // States
  const [priceRange, setPriceRange] = React.useState([0, 0]);
  const [bedroomRange, setBedroomRange] = React.useState([1, 1]);
  const [searchString, setSearchString] = React.useState("");
  const [searchType, setSearchType] = React.useState("date");

  useEffect(() => {
    // console.log(range);
  }, [range]);

  return (
    <Flex
      border="1px"
      borderColor="gray.200"
      rounded="2xl"
      justifyContent="center"
      p={4}
    >
      <Flex direction="column" alignItems="center" gap={4}>
        <Box border="1px" borderColor="gray.200">
          <DateRange
            onChange={(r) => {
              setRange({ ...(r.selection as typeof range) });
            }}
            ranges={[range]}
            rangeColors={["#ff395d"]}
          />
        </Box>
        <Divider />
        <FormControl>
          <FormLabel ml={2}>Keywords</FormLabel>
          <Input
            placeholder="Title or Location"
            defaultValue=" "
            onChange={(e) => setSearchString(e.target.value)}
            // value={searchString ?? " "}
          />
        </FormControl>
        {/* price */}
        <FormControl>
          <FormLabel ml={2}>Price Range</FormLabel>
          <Flex alignItems="center" gap={4}>
            <NumberInput
              defaultValue={0}
              min={0}
              onChange={(value) => {
                setPriceRange([parseInt(value), priceRange[1]]);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <MinusIcon />
            <NumberInput
              precision={0}
              defaultValue={0}
              min={0}
              onChange={(value) => {
                !isNaN(parseInt(value)) &&
                  setPriceRange([priceRange[0], parseInt(value)]);
              }}
              value={
                priceRange[1] <= priceRange[0] ? priceRange[0] : priceRange[1]
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        </FormControl>
        {/* bedrooms */}
        <FormControl>
          <FormLabel ml={2}>Bedrooms Range</FormLabel>
          <Flex alignItems="center" gap={4}>
            <NumberInput
              defaultValue={1}
              min={1}
              onChange={(value) => {
                setBedroomRange([parseInt(value), bedroomRange[1]]);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <MinusIcon />
            <NumberInput
              precision={0}
              defaultValue={0}
              min={1}
              onChange={(value) => {
                !isNaN(parseInt(value)) &&
                  setBedroomRange([bedroomRange[0], parseInt(value)]);
              }}
              value={
                bedroomRange[1] <= bedroomRange[0]
                  ? bedroomRange[0]
                  : bedroomRange[1]
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel ml={2}>Which type you want to search?</FormLabel>
          <Select onChange={(e) => setSearchType(e.target.value)}>
            <option value="date">Date Range</option>
            <option value="price">Price</option>
            <option value="bedroom">Bedrooms</option>
            <option value="keywords">Keywords</option>
          </Select>
        </FormControl>
        <Button
          w="full"
          rounded="2xl"
          onClick={() => {
            const dateRange = {
              startDate: dayjs(range.startDate).format("YYYY-MM-DD"),
              endDate: dayjs(range.endDate).format("YYYY-MM-DD"),
            };
            if (searchType === "date") {
              navigate(
                `/listings?dateRange=${dateRange.startDate},${dateRange.endDate}`
              );
            } else if (searchType === "price") {
              navigate(
                `/listings?priceRange=${priceRange[0]},${priceRange[1]}`
              );
            } else if (searchType === "bedroom") {
              navigate(
                `/listings?bedroomRange=${bedroomRange[0]},${bedroomRange[1]}`
              );
            } else if (searchType === "keywords") {
              const keywords = searchString
                .split(" ")
                .filter(Boolean)
                .join(",");
              navigate(`/listings?keywords=${keywords}`);
            }
          }}
        >
          Search
        </Button>
      </Flex>
    </Flex>
  );
};
