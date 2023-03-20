import React from "react";
import { useRouter } from "expo-router";
import { Box, HStack, Heading, Pressable, Row, Text } from "native-base";

import PostPopupMenuButton from "../../../components/PostPopupMenuButton";
import InitialsAvatar from "../../../components/common/InitialsAvatar";
import { api } from "../../../utils/api";
import { getRelativeTime } from "../../../utils/helper";

interface PostProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  authorId: string;
}

const Post: React.FC<PostProps> = (props) => {
  const { id, title, content, createdAt, authorId } = props;
  const router = useRouter();

  const { isLoading: isCurrentUserLoading, data: currentUser } =
    api.user.currentUser.useQuery();

  const { isLoading: isAuthorLoading, data: author } =
    api.user.getUserById.useQuery({ id: authorId });

  const isOwnPost =
    !isCurrentUserLoading && currentUser ? currentUser.id === authorId : false;

  return (
    <Pressable onPress={() => router.push(`/posts/${id}`)}>
      <Box mb="4" rounded="lg" p="5" overflow="hidden" bg="white" shadow="100">
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
        <Heading size="lg" mb="2" numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Heading>

        <Text color="gray.600" numberOfLines={3} ellipsizeMode="tail">
          {content}
        </Text>
      </Box>
    </Pressable>
  );
};

export default Post;
