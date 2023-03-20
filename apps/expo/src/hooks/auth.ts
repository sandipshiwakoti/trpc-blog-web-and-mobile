import { useToast } from "native-base";

import { type ReactQueryOptions } from "@acme/api";

import { api } from "../utils/api";

type LoginOptions = ReactQueryOptions["auth"]["login"];
type RegisterOptions = ReactQueryOptions["auth"]["register"];

export const useLogin = (options?: LoginOptions) => {
  const toast = useToast();

  return api.auth.login.useMutation({
    ...options,
    onError: ({ message }) => {
      toast.show({
        variant: "solid",
        description: message,
        duration: 9000,
      });
    },
  });
};

export const useRegister = (options?: RegisterOptions) => {
  const toast = useToast();

  return api.auth.register.useMutation({
    ...options,
    onError: ({ message }) => {
      toast.show({
        variant: "solid",
        description: message,
        duration: 9000,
      });
    },
  });
};
