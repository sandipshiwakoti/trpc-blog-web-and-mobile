import React from "react";
import { Box, HStack, Heading, Row, Text } from "native-base";

import PostPopupMenuButton from "../../../components/PostPopupMenuButton";
import InitialsAvatar from "../../../components/common/InitialsAvatar";
import { api } from "../../../utils/api";
import { getRelativeTime } from "../../../utils/helper";

interface PostDetailProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  authorId: string;
}

const PostDetail: React.FC<PostDetailProps> = (props) => {
  const { id, title, content, createdAt, authorId } = props;

  const { isLoading: isCurrentUserLoading, data: currentUser } =
    api.user.currentUser.useQuery();

  const isOwnPost =
    !isCurrentUserLoading && currentUser ? currentUser.id === authorId : false;

  const { isLoading: isAuthorLoading, data: author } =
    api.user.getUserById.useQuery({ id: authorId });

  return (
    <>
      <Box
        flex={1}
        rounded="lg"
        p="5"
        overflow="hidden"
        bg="white"
        shadow="100"
      >
        {!isAuthorLoading && author ? (
          <HStack mb="2" space="3">
            <InitialsAvatar
              name={author.name}
              size="md"
              source={{
                uri: "",
              }}
            />
            <Box flexGrow="1">
              <Row
                justifyContent="space-between"
                alignItems="center"
                flexGrow="1"
              >
                <Text bold fontSize="lg">
                  {author.name}
                </Text>
                {isOwnPost && (
                  <PostPopupMenuButton
                    id={id}
                    title={title}
                    content={content}
                  />
                )}
              </Row>
              <Text color="gray.600">{getRelativeTime(createdAt)}</Text>
            </Box>
          </HStack>
        ) : null}
        <Heading size="lg" mb="2">
          {title}
        </Heading>

        <Text color="gray.600">{content}</Text>
      </Box>
    </>
  );
};

export default PostDetail;
