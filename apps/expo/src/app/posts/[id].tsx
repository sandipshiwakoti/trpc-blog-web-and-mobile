import React from "react";
import { useRouter, useSearchParams } from "expo-router";
import { Box } from "native-base";

import ErrorBoundary from "../../components/common/ErrorBoundary";
import FullSpinner from "../../components/common/FulSpinner";
import Header from "../../components/common/Header";
import { api } from "../../utils/api";
import PostDetail from "./components/PostDetail";

const Post = () => {
  const { id } = useSearchParams();
  const router = useRouter();
  const {
    isLoading,
    data: post,
    error,
  } = api.post.getPostById.useQuery({ id: id ?? "" });

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

  if (post) {
    return (
      <Box bg="gray.200" flex={1}>
        <Header hasBack />
        <PostDetail
          id={post.id}
          title={post.title}
          content={post.content}
          createdAt={post.createdAt.toString()}
          authorId={post.authorId}
        />
      </Box>
    );
  }

  return null;
};

export default Post;
