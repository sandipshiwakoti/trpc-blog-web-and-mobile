import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

import { api } from "~/utils/api";
import Post from "~/pages/posts/components/Post";

interface PostDetailModalProps {
  isVisible: boolean;
  handleClose: () => void;
  id: string;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({
  isVisible,
  handleClose,
  id,
}) => {
  const { isLoading, data: post } = api.post.getPostById.useQuery({ id });

  return (
    <Modal
      isOpen={isVisible}
      onClose={handleClose}
      isCentered
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          {!isLoading && post && (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              createdAt={post.createdAt}
              authorId={post.authorId}
              isDetail
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostDetailModal;
