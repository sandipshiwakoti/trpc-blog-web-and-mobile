import React from "react";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Box, Icon, Menu, Pressable, useDisclose, useToast } from "native-base";

import { api } from "../utils/api";
import AlertModal from "./common/AlertModal";
import EditPostFormModal from "./modals/EditPostFormModal";

interface PostPopupMenuButtonProps {
  id: string;
  title: string;
  content: string;
}

const PostPopupMenuButton: React.FC<PostPopupMenuButtonProps> = ({
  id,
  title,
  content,
}) => {
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclose();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclose();
  const router = useRouter();
  const toast = useToast();
  const utils = api.useContext();

  const { mutate: deletePost, isLoading: isDeleteLoading } =
    api.post.deletePost.useMutation({
      onSuccess: async ({ id }) => {
        await utils.post.posts.invalidate();
        await utils.post.getPostById.invalidate({ id });
        router.push("/posts");
      },
      onError: ({ message }) => {
        toast.show({
          description: message,
          duration: 9000,
        });
      },
    });

  const handleEditPress = () => onEditOpen();

  const handleDeletePost = () => {
    deletePost({ id });
  };

  return (
    <Box>
      <Menu
        w="190"
        defaultIsOpen={false}
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <Icon
                as={MaterialCommunityIcons}
                name="dots-vertical"
                size={5}
                color="gray.400"
              />
            </Pressable>
          );
        }}
      >
        <Menu.Item onPress={handleEditPress}>Edit post</Menu.Item>
        <Menu.Item onPress={onDeleteOpen}>Delete post</Menu.Item>
      </Menu>
      <AlertModal
        type="danger"
        title="Delete Post"
        content="Are you sure you want to delete this post?"
        buttonLabel="Delete"
        isOpen={isDeleteOpen}
        handleClose={onDeleteClose}
        handleConfirm={handleDeletePost}
        confirmLoading={isDeleteLoading}
      />
      <EditPostFormModal
        defaultValues={{
          id,
          title,
          content,
        }}
        isVisible={isEditOpen}
        handleClose={onEditClose}
      />
    </Box>
  );
};

export default PostPopupMenuButton;
