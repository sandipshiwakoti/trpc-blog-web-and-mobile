import React from "react";
import { HStack, Heading, Image, type IBoxProps } from "native-base";

type LogoProps = IBoxProps;

const Logo: React.FC<LogoProps> = ({ ...props }) => {
  return (
    <HStack justifyContent="center" alignItems="center" mb="2" {...props}>
      <Image
        source={require("../../../assets/logo.png")} // eslint-disable-line
        alt="Logo"
        size="9"
      />
      <Heading fontWeight="extrabold" ml="2">
        tRPC Blog
      </Heading>
    </HStack>
  );
};

export default Logo;
