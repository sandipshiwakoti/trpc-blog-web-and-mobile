import React from "react";
import { Button, Center, Heading, Image, Text, VStack } from "native-base";

interface ErrorBoundaryProps {
  message?: string;
  resetButtonLabel?: string;
  onReset?: () => void;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  message,
  resetButtonLabel,
  onReset,
}) => {
  return (
    <Center flex={1}>
      <VStack space="2">
        <Image src="/errorFallback.jpg" h="200" w="200" alt="Error fallback" />
        <Heading size="2xl">Oops!</Heading>
        <Heading size="xl">Something went wrong</Heading>
        <Text fontWeight="bold" color="gray.500" fontSize="xl">
          {message}
        </Text>
        {resetButtonLabel && (
          <Button colorScheme="blue" rounded="xl" onPress={onReset}>
            {resetButtonLabel}
          </Button>
        )}
      </VStack>
    </Center>
  );
};

export default ErrorBoundary;
