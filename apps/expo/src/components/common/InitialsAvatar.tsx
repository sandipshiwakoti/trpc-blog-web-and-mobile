import React from "react";
import { type ImageSourcePropType } from "react-native";
import { Avatar, type IBoxProps } from "native-base";

interface InitialsAvatarProps extends IBoxProps {
  name?: string;
  size?: string;
  source?: ImageSourcePropType; //TODO: add user's profile image upload feature and pass source
  children?: React.ReactNode;
}

const InitialsAvatar: React.FC<InitialsAvatarProps> = ({
  name,
  size = "sm",
  source, //eslint-disable-line
  children,
  ...props
}) => {
  const initials = name
    ?.split(" ")
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return (
    <Avatar bg="green.500" size={size} {...props}>
      {initials}
      {children}
    </Avatar>
  );
};

export default InitialsAvatar;
