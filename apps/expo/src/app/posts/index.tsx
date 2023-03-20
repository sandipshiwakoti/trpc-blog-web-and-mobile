import React from "react";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import {
  Box,
  Divider,
  Fab,
  HStack,
  Icon,
  Text,
  useDisclose,
} from "native-base";

import AlertModal from "../../components/common/AlertModal";
import ErrorBoundary from "../../components/common/ErrorBoundary";
import FullSpinner from "../../components/common/FulSpinner";
import Header from "../../components/common/Header";
import InitialsAvatar from "../../components/common/InitialsAvatar";
import CreatePostFormModal from "../../components/modals/CreatePostFormModal";
import { useRefresh } from "../../hooks/refresh";
import { api } from "../../utils/api";
import { getFirstName } from "../../utils/helper";
import Post from "./components/Post";

const Posts = () => {
  const {
    isOpen: isSignOutOpen,
    onOpen: onSignOutOpen,
    onClose: onSignOutClose,
  } = useDisclose();
  const { isOpen, onOpen, onClose } = useDisclose();
  const router = useRouter();

  const { isLoading: isCurrentUserLoading, data: currentUser } =
    api.user.currentUser.useQuery();
  const { data: posts, isLoading, error, refetch } = api.post.posts.useQuery();

  const { refreshing, handleRefresh } = useRefresh(refetch);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("@token");
    router.replace("/");
  };

  if (isLoading) {
    return <FullSpinner />;
  }

  if (error) {
    return (
      <ErrorBoundary
        message={error.message}
        onReset={() => router.back()}
        resetButtonLabel="Go Back"
      />
    );
  }

  return (
    <>
      <Header
        title="Posts"
        rightElement={
          <Box>
            {!isCurrentUserLoading && currentUser && (
              <HStack space="2" alignItems="center">
                <HStack space="1" alignItems="center">
                  <InitialsAvatar
                    name={currentUser.name}
                    size="xs"
                    source={{
                      uri: "",
                    }}
                  />
                  <Text fontWeight="bold" fontSize="sm">
                    {getFirstName(currentUser.name)}
                  </Text>
                </HStack>
                <Icon
                  as={MaterialCommunityIcons}
                  name="logout"
                  color="black"
                  onPress={onSignOutOpen}
                  size="md"
                />
              </HStack>
            )}
          </Box>
        }
      />
      <Box bg="gray.200" flex={1} p="4">
        <FlashList
          data={posts}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={3}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <Post
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              createdAt={item.createdAt.toString()}
              authorId={item.authorId}
            />
          )}
        />
        <Fab
          renderInPortal={false}
          shadow={2}
          bg="red.500"
          icon={
            <Icon color="white" as={MaterialCommunityIcons} name="plus-thick" />
          }
          onPress={onOpen}
        />
        <CreatePostFormModal isVisible={isOpen} handleClose={onClose} />
      </Box>
      <AlertModal
        type="danger"
        title="Sign out"
        content="Are you sure you want to sign out?"
        buttonLabel="Confirm"
        isOpen={isSignOutOpen}
        handleClose={onSignOutClose}
        handleConfirm={handleSignOut}
      />
    </>
  );
};

export default Posts;
