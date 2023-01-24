import React from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  HStack,
  Button,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRegister } from "../hooks/useRegister";

const schema = z
  .object({
    email: z.string().min(1, "Required"),
    firstName: z.string().min(1, "Required"),
    lastName: z.string(),
    password: z.string().min(1, "Required"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

type Schema = z.infer<typeof schema>;

const processData = (data: Schema) => {
  return {
    email: data.email,
    name: `${data.firstName} ${data.lastName}`,
    password: data.password,
  };
};

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const mutation = useRegister();

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={(e) =>
        handleSubmit(async (value) => {
          const data = processData(value);
          return await mutation.mutateAsync(data);
        })(e).catch(() => {})
      }
    >
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Hi, nice to meet you!
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl isInvalid={!!errors?.firstName} isRequired>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input
                      id="firstName"
                      type="text"
                      {...register("firstName")}
                    />
                    <FormErrorMessage>
                      {errors?.firstName?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input
                      id="lastName"
                      type="text"
                      {...register("lastName")}
                    />
                    <FormErrorMessage>
                      {errors?.lastName?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl isInvalid={!!errors?.email} isRequired>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input id="email" type="email" {...register("email")} />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors?.password} isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"unstyled"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors?.confirm} isRequired>
                <FormLabel htmlFor="confirm">Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    id="confirm"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirm")}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"unstyled"}
                      onClick={() =>
                        setShowConfirmPassword(
                          (showConfirmPassword) => !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors?.confirm?.message}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  name="register"
                  loadingText="Submitting"
                  size="lg"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link as={RouterLink} to="/login" color={"brand.500"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}
