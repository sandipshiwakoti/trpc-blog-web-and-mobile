import React from "react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

import { api } from "~/utils/api";
import CenterContainer from "~/components/common/CenterContainer";
import ErrorBoundary from "~/components/common/ErrorBoundary";
import FullSpinner from "~/components/common/FulSpinner";
import MainContainer from "~/components/common/MainContainer";
import Navbar from "~/components/common/Navbar";
import Post from "~/pages/posts/components/Post";

const Posts = () => {
  const router = useRouter();
  const { data: posts, isLoading, error } = api.post.posts.useQuery();

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

  if (posts) {
    return (
      <>
        <Navbar />
        <MainContainer p="5">
          <CenterContainer minH="100vh">
            <Box maxW="40rem" mx="auto">
              {posts.map((post) => {
                return (
                  <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    createdAt={post.createdAt.toString()}
                    authorId={post.authorId}
                  />
                );
              })}
            </Box>
          </CenterContainer>
        </MainContainer>
      </>
    );
  }

  return null;
};

export default Posts;
