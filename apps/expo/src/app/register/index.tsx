import React from "react";
import { Center } from "native-base";

import RegisterForm from "./components/RegisterForm";

const Register = () => {
  return (
    <Center bg="gray.200" flex="1" p="5">
      <RegisterForm />
    </Center>
  );
};

export default Register;
