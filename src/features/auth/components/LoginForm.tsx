import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink } from "react-router-dom";
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
  Button,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useLogin } from "../hooks/useLogin";

const schema = z.object({
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

type Schema = z.infer<typeof schema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const mutation = useLogin();

  return (
    <form
      onSubmit={(e) =>
        handleSubmit(async (value) => await mutation.mutateAsync(value))(
          e
        ).catch(() => {})
      }
    >
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign in to your account
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Hi, nice to meet you!
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
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
              <Stack spacing={10} pt={2}>
                <Button
                  name="login"
                  loadingText="Submitting"
                  size="lg"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Do not have an account?{" "}
                  <Link as={RouterLink} to="/register" color={"brand.500"}>
                    Sign up
                  </Link>{" "}
                  now
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}
