import {
  Text,
  Box,
  BoxProps,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Stack,
  FormErrorMessage,
  Button,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Center,
} from "@chakra-ui/react";
import * as React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Schema } from "./CreateForm";
import { BiBed } from "react-icons/bi";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";

export const BedroomCard = (props: BoxProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();
  const { fields, append, remove } = useFieldArray({
    name: "metadata.bedrooms",
  });

  // React.useEffect(() => {
  //   append({ single: 1, double: 1, queen: 1, king: 1 });
  // }, [append]);

  return (
    <Box bg="bg-surface" boxShadow="md" borderRadius="lg" {...props} flex="1">
      <Stack
        spacing="3"
        px={{ base: "4", md: "6" }}
        py={{ base: "5", md: "6" }}
      >
        {errors?.metadata?.bedrooms && (
          <Text color="red.600" fontSize="sm">
            {errors.metadata.bedrooms.message}
          </Text>
        )}
        {fields.map((field, index) => (
          <Box key={field.id}>
            <Stack spacing="6" direction={{ base: "column", md: "row" }}>
              <Flex alignItems="center" justifyContent="center">
                <BiBed />
              </Flex>
              <FormControl
                isInvalid={!!errors?.metadata?.bedrooms?.[index]?.single}
                isRequired
              >
                <FormLabel htmlFor={`metadata.bedrooms.${index}.single`}>
                  Single
                </FormLabel>
                <NumberInput defaultValue={0} min={0}>
                  <NumberInputField
                    id={`metadata.bedrooms.${index}.single`}
                    {...register(`metadata.bedrooms.${index}.single` as const, {
                      valueAsNumber: true,
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>
                  {errors?.metadata?.bedrooms?.[index]?.single?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors?.metadata?.bedrooms?.[index]?.double}
                isRequired
              >
                <FormLabel htmlFor={`metadata.bedrooms.${index}.double`}>
                  Double
                </FormLabel>
                <NumberInput defaultValue={0} min={0}>
                  <NumberInputField
                    id={`metadata.bedrooms.${index}.double`}
                    {...register(`metadata.bedrooms.${index}.double` as const, {
                      valueAsNumber: true,
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>
                  {errors?.metadata?.bedrooms?.[index]?.double?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors?.metadata?.bedrooms?.[index]?.queen}
                isRequired
              >
                <FormLabel htmlFor={`metadata.bedrooms.${index}.queen`}>
                  Queen
                </FormLabel>
                <NumberInput defaultValue={0} min={0}>
                  <NumberInputField
                    id={`metadata.bedrooms.${index}.queen`}
                    {...register(`metadata.bedrooms.${index}.queen` as const, {
                      valueAsNumber: true,
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>
                  {errors?.metadata?.bedrooms?.[index]?.queen?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors?.metadata?.bedrooms?.[index]?.king}
                isRequired
              >
                <FormLabel htmlFor={`metadata.bedrooms.${index}.king`}>
                  King
                </FormLabel>
                <NumberInput defaultValue={0} min={0}>
                  <NumberInputField
                    id={`metadata.bedrooms.${index}.king`}
                    {...register(`metadata.bedrooms.${index}.king` as const, {
                      valueAsNumber: true,
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>
                  {errors?.metadata?.bedrooms?.[index]?.king?.message}
                </FormErrorMessage>
              </FormControl>
              <IconButton
                aria-label="delete"
                variant="outline"
                border={0}
                colorScheme="red"
                alignSelf="center"
                icon={<DeleteIcon />}
                onClick={() => remove(index)}
              ></IconButton>
            </Stack>
            {errors?.metadata?.bedrooms?.[index] && (
              <Center mt={2} color="red.600" fontSize="sm">
                {errors.metadata.bedrooms?.[index]?.message}
              </Center>
            )}
            <Divider mt={5} />
          </Box>
        ))}
        <Button
          name="add-bedroom-button"
          colorScheme="gray"
          variant="outline"
          onClick={() => append({ single: 0, double: 0, queen: 0, king: 0 })}
        >
          <AddIcon mr={2} /> Add Bedroom
        </Button>
      </Stack>
      <Divider />
    </Box>
  );
};
