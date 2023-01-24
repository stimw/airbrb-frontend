import React from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  Image,
  Avatar,
  Highlight,
  Button,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

type CardProps = {
  imageSrc: string;
  avatarSrc: string;
  review: string;
  name: string;
  country: string;
};

const Card = (props: CardProps) => {
  const { imageSrc, avatarSrc, review, name, country } = props;

  return (
    <Box
      width={{ base: "100%", lg: 1 / 3 }}
      px={{ lg: 1.5 }}
      mb={{ base: "6", lg: "0" }}
    >
      <Image src={imageSrc} objectFit="cover" borderRadius="md" w="100%" />
      <Flex my={3} alignItems="center" justify="start">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <StarIcon key={i} color="gray.800" />
          ))}
        <Text ml={2} color="gray.600" fontSize="sm" fontWeight="bold">
          5.0
        </Text>
      </Flex>
      <Text fontSize="sm" lineHeight="short">
        {review}
      </Text>

      <Flex my={4} alignItems="center">
        <Avatar size="md" src={avatarSrc} />
        <Flex pl={4} fontSize="sm" direction="column">
          <Text fontWeight="bold">{name}</Text>
          <Text color="gray.700">{country}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

const Reviews = () => {
  const navigate = useNavigate();

  return (
    <>
      <Heading size="lg" fontWeight="bold" mb={{ base: "4", lg: "2" }}>
        <Highlight
          query={["Airbrb"]}
          styles={{
            px: "2",
            py: "1",
            rounded: "full",
            bg: "brand.500",
            color: "white",
          }}
        >
          What users are saying about Airbrb
        </Highlight>
      </Heading>
      <Flex alignItems={{ base: "start", lg: "center" }}>
        <Highlight
          query={["4.9 out of 5 stars", "10,000+"]}
          styles={{ fontWeight: "bold", px: "1" }}
        >
          Airbrb were rated 4.9 out of 5 stars with 10,000+ reviews
        </Highlight>
      </Flex>
      <Flex
        justifyContent="between"
        direction={{ base: "column", lg: "row" }}
        my={{ base: 1, lg: 4 }}
      >
        <Card
          imageSrc="/images/1.webp"
          avatarSrc="/images/cat.jpg"
          review="Definitely will be talking about this place for years to come! It's 
          truly one-of-a-kind. It's so beautiful, peaceful, and..."
          name="Mark"
          country="Australia"
        />
        <Card
          imageSrc="/images/2.webp"
          avatarSrc="/images/jiu.png"
          review="Definitely will be talking about this place for years to come! It's 
          truly one-of-a-kind. It's so beautiful, peaceful, and..."
          name="Tony"
          country="Australia"
        />
        <Card
          imageSrc="/images/3.webp"
          avatarSrc="/images/openpees2.png"
          review="Definitely will be talking about this place for years to come! It's 
          truly one-of-a-kind. It's so beautiful, peaceful, and..."
          name="Noah"
          country="Australia"
        />
      </Flex>
      <Box mt={{ base: 4, lg: 8 }}>
        <Heading mb={{ base: "4", lg: "2" }} size="lg">
          Are you looking for a place to travel?
        </Heading>
        <Text fontSize="1rem" fontWeight="300">
          Airbrb is the best place to find a place to stay. We have over 10,000
          places to stay in 100+ countries.
        </Text>
        <Button onClick={() => navigate("/listings")} mt={2}>
          Find a listing
        </Button>
      </Box>
    </>
  );
};

export default Reviews;
