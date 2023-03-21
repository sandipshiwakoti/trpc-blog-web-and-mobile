import React from "react";
import { Link, useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Icon,
  Input,
} from "native-base";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import Logo from "../components/common/Logo";
import { useLogin } from "../hooks/auth";

const Login = () => {
  const router = useRouter();
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  type LoginSchema = z.infer<typeof loginSchema>;

  const { isLoading, mutate: login } = useLogin({
    onSuccess: async ({ accessToken }) => {
      await AsyncStorage.setItem("@token", accessToken);
      router.push("/posts");
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = (data: LoginSchema) => {
    login(data);
  };

  return (
    <Center bg="gray.200" flex="1" p="5">
      <Box w="full" bg="white" shadow="1" rounded="lg" p="5">
        <Center>
          <Logo />
        </Center>
        <Heading size="lg" textAlign="center">
          Login to your account
        </Heading>
        <FormControl isInvalid={"email" in errors}>
          <FormControl.Label>Email</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email address"
                InputLeftElement={
                  <Icon
                    name="email"
                    as={MaterialCommunityIcons}
                    size="md"
                    ml="2"
                  />
                }
              />
            )}
            name="email"
          />
          <FormControl.ErrorMessage
            leftIcon={<Icon name="warning" as={Ionicons} size="sm" />}
          >
            {errors.email?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={"password" in errors}>
          <FormControl.Label>Password</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                type="password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Password"
                InputLeftElement={
                  <Icon
                    name="lock"
                    as={MaterialCommunityIcons}
                    size="md"
                    ml="2"
                  />
                }
              />
            )}
            name="password"
          />
          <FormControl.ErrorMessage
            leftIcon={<Icon name="warning" as={Ionicons} size="sm" />}
          >
            {errors.password?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <Button mt="2" onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
          Login
        </Button>

        <Link
          href="/register"
          style={{
            color: "blue",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Not registered?
        </Link>
      </Box>
    </Center>
  );
};

export default Login;
