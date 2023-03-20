import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { Box, Icon, Row, StatusBar, Text } from "native-base";

interface HeaderProps {
  title?: string;
  hasBack?: boolean;
  rightElement?: React.ReactElement;
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const { title, hasBack, rightElement, ...rest } = props;
  const router = useRouter();

  const handleBackPress = () => router.back();

  return (
    <Box
      backgroundColor="white"
      borderBottomColor="gray.200"
      borderBottomWidth="2"
    >
      <SafeAreaView edges={["top", "right", "left"]}>
        <StatusBar backgroundColor="red" />
        <Box px="5" py="3" {...rest}>
          <Row justifyContent="space-between" alignItems="center">
            {hasBack && (
              <TouchableOpacity activeOpacity={0.6} onPress={handleBackPress}>
                <Icon
                  as={MaterialCommunityIcon}
                  name="arrow-left"
                  color="black"
                  size={26}
                />
              </TouchableOpacity>
            )}
            {title && (
              <Text
                flex={1}
                ml={hasBack ? 5 : 0}
                fontWeight="bold"
                fontSize="xl"
                variant="title"
                color="black"
                textTransform="capitalize"
              >
                {title}
              </Text>
            )}
            {rightElement}
          </Row>
        </Box>
      </SafeAreaView>
    </Box>
  );
};

export default Header;
