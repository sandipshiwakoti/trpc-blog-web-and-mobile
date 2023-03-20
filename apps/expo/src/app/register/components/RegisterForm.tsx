import React from "react";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Icon,
  Input,
  useTheme,
} from "native-base";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import Logo from "../../../components/common/Logo";
import { useRegister } from "../../../hooks/auth";

const RegisterForm = () => {
  const registerSchema = z
    .object({
      name: z.string(),
      username: z.string(),
      email: z.string().email(),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password not matched",
      path: ["confirmPassword"],
    });
  type RegisterSchema = z.infer<typeof registerSchema>;

  const { colors } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate: register, isLoading } = useRegister();

  const onSubmit: SubmitHandler<RegisterSchema> = (data: RegisterSchema) => {
    register(data);
  };

  return (
    <Box w="full" bg="white" shadow="1" rounded="lg" p="5">
      <Center>
        <Logo />
      </Center>
      <Heading size="lg" textAlign="center">
        Register your account
      </Heading>
      <FormControl isInvalid={"name" in errors}>
        <FormControl.Label>Name</FormControl.Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Full name"
              InputLeftElement={
                <Icon
                  name="account"
                  as={MaterialCommunityIcon}
                  size="md"
                  ml="2"
                />
              }
            />
          )}
          name="name"
        />
        <FormControl.ErrorMessage
          leftIcon={<Icon name="warning" as={Ionicons} size="sm" />}
        >
          {errors.name?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isInvalid={"username" in errors}>
        <FormControl.Label>Username</FormControl.Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Username"
              InputLeftElement={
                <Icon
                  name="account"
                  as={MaterialCommunityIcon}
                  size="md"
                  ml="2"
                />
              }
            />
          )}
          name="username"
        />
        <FormControl.ErrorMessage
          leftIcon={<Icon name="warning" as={Ionicons} size="sm" />}
        >
          {errors.username?.message}
        </FormControl.ErrorMessage>
      </FormControl>
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
              placeholder="Email"
              InputLeftElement={
                <Icon
                  name="email"
                  as={MaterialCommunityIcon}
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
                <Icon name="lock" as={MaterialCommunityIcon} size="md" ml="2" />
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
      <FormControl isInvalid={"confirmPassword" in errors}>
        <FormControl.Label>Confirm password</FormControl.Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              type="password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Confirm password"
              InputLeftElement={
                <Icon name="lock" as={MaterialCommunityIcon} size="md" ml="2" />
              }
            />
          )}
          name="confirmPassword"
        />
        <FormControl.ErrorMessage
          leftIcon={<Icon name="warning" as={Ionicons} size="sm" />}
        >
          {errors.confirmPassword?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <Button mt="3" onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
        Register
      </Button>
      <Link
        href="/"
        style={{
          color: colors.blue["500"],
          textAlign: "center",
          marginTop: 10,
        }}
      >
        Already registered?
      </Link>
    </Box>
  );
};

export default RegisterForm;
