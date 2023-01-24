import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import ImageUploading from "react-images-uploading";
import { Schema } from "./UpdateForm";
import {
  Box,
  Container,
  FormControl,
  Divider,
  Button,
  Center,
  HStack,
  Icon,
  Square,
  Text,
  VStack,
  Image,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { FiUploadCloud } from "react-icons/fi";
import { ListingDetails } from "../../types";

type PropsType = {
  isMultiple?: boolean;
  listing: ListingDetails;
};

export const UploadCard = (props: PropsType) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Schema>();

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
          <FormControl
            isInvalid={!!errors?.thumbnail || !!errors?.metadata?.images}
          >
            <Controller
              name={props.isMultiple ? "metadata.images" : "thumbnail"}
              control={control}
              defaultValue={
                props.isMultiple ? listing.metadata.images : listing.thumbnail
              }
              render={({ field: { value, onChange } }) => (
                <ImageUploading
                  value={value}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  maxNumber={10}
                  multiple={props.isMultiple}
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                    dragProps,
                  }) => (
                    <Box>
                      <Center
                        borderWidth="1px"
                        borderRadius="lg"
                        px="6"
                        py="4"
                        bg="white"
                      >
                        <VStack spacing="3">
                          <Square size="10" bg="bg-subtle" borderRadius="lg">
                            <IconButton
                              aria-label="Upload"
                              onClick={onImageUpload}
                              icon={<Icon as={FiUploadCloud} />}
                              boxSize="10"
                              variant={"ghost"}
                              {...dragProps}
                            />
                          </Square>
                          <VStack spacing="1">
                            <HStack spacing="1" whiteSpace="nowrap">
                              <Button
                                variant="link"
                                colorScheme="blue"
                                size="sm"
                                onClick={onImageUpload}
                                {...dragProps}
                              >
                                Click to upload
                              </Button>
                              <Text fontSize="sm" color="muted">
                                or drag and drop
                              </Text>
                            </HStack>
                          </VStack>
                        </VStack>
                      </Center>
                      {!props.isMultiple && errors.thumbnail && (
                        <Text mt={2} color="red.500" fontSize="sm">
                          {errors.thumbnail.message}
                        </Text>
                      )}
                      <Divider mt={5} />
                      {imageList.map((image, index) => (
                        <Box key={index}>
                          <Flex>
                            <Image src={image.dataURL} alt="img" maxW={200} />
                            <Flex
                              direction="column"
                              alignSelf="center"
                              flex={1}
                              alignItems="end"
                            >
                              <Button
                                variant="link"
                                onClick={() => onImageUpdate(index)}
                                fontSize="sm"
                              >
                                Update
                              </Button>
                              <Button
                                variant="link"
                                onClick={() => onImageRemove(index)}
                                fontSize="sm"
                              >
                                Remove
                              </Button>
                            </Flex>
                          </Flex>
                          <Divider />
                        </Box>
                      ))}
                    </Box>
                  )}
                </ImageUploading>
              )}
            />
          </FormControl>
        </Container>
      </Box>
      <Divider />
    </Box>
  );
};
