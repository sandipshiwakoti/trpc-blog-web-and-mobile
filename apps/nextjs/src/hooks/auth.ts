import { useToast } from "@chakra-ui/react";

import { type ReactQueryOptions } from "@acme/api";

import { api } from "~/utils/api";

type LoginOptions = ReactQueryOptions["auth"]["login"];
type RegisterOptions = ReactQueryOptions["auth"]["register"];

export const useLogin = (options?: LoginOptions) => {
  const toast = useToast();

  return api.auth.login.useMutation({
    ...options,
    onError: ({ message }) => {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });
};

export const useRegister = (options?: RegisterOptions) => {
  const toast = useToast();

  return api.auth.register.useMutation({
    ...options,
    onError: ({ message }) => {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });
};
