import {
  Box,
  Divider,
  Container,
  Text,
  Flex,
  SimpleGrid,
  Checkbox,
  CheckboxGroup,
  FormControl,
} from "@chakra-ui/react";
import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Schema } from "./UpdateForm";
import {
  FaWifi,
  FaParking,
  FaTv,
  FaShower,
  FaFirstAid,
  FaSwimmingPool,
} from "react-icons/fa";
import { CardProps } from "../../types";

const amenities = ["wifi", "parking", "tv", "shower", "firstAid", "pool"];
const amenitiesNames = ["Wifi", "Parking", "TV", "Shower", "First Aid", "Pool"];
const amenitiesIcons = [
  FaWifi,
  FaParking,
  FaTv,
  FaShower,
  FaFirstAid,
  FaSwimmingPool,
];

type CheckboxNames = "wifi" | "parking" | "tv" | "shower" | "firstAid" | "pool";

export const AmenitiesCard = (props: CardProps) => {
  const { control } = useFormContext<Schema>();
  const listing = props.listing;

  return (
    <Box
      bg="bg-surface"
      boxShadow="md"
      borderRadius="lg"
      maxW={{ lg: "3xl" }}
      flex="1"
    >
      <Box as="section" bg="bg-surface" py={{ base: "4", md: "8" }}>
        <Container maxW="lg">
          <FormControl>
            <CheckboxGroup defaultValue={["wifi"]}>
              <SimpleGrid columns={[2, null, 3]} spacing="40px">
                {amenities.map((amenity, index) => {
                  const Icon = amenitiesIcons[index];
                  const name = amenitiesNames[index];
                  return (
                    <Controller
                      key={amenity}
                      control={control}
                      name={`metadata.amenities.${amenity as CheckboxNames}`}
                      defaultValue={
                        listing.metadata.amenities[amenity as CheckboxNames]
                      }
                      render={({ field: { onChange, value, ref, onBlur } }) => (
                        <Checkbox
                          onChange={onChange}
                          ref={ref}
                          isChecked={value}
                          onBlur={onBlur}
                        >
                          <Flex w={20} direction="column" alignItems="center">
                            <Icon />
                            <Text
                              color="emphasized"
                              fontWeight="medium"
                              fontSize="sm"
                            >
                              {name}
                            </Text>
                          </Flex>
                        </Checkbox>
                      )}
                    />
                  );
                })}
              </SimpleGrid>
            </CheckboxGroup>
          </FormControl>
        </Container>
      </Box>
      <Divider />
    </Box>
  );
};
