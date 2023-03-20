import React from "react";
import { AlertDialog, Button, Center } from "native-base";

interface AlertModalProps {
  type: "success" | "danger";
  title: string;
  content: string;
  buttonLabel: string;
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  confirmLoading?: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  type,
  title,
  content,
  buttonLabel,
  isOpen,
  handleClose,
  handleConfirm,
  confirmLoading,
}) => {
  const cancelRef = React.useRef(null);

  const getBackgroundColor = () => {
    if (type === "danger") {
      return "red.600";
    }
    return "green.500";
  };
  return (
    <Center>
      <AlertDialog
        size="xl"
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header _text={{ fontSize: "xl" }}>
            {title}
          </AlertDialog.Header>
          <AlertDialog.Body _text={{ color: "gray.600", fontSize: "lg" }}>
            {content}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                ref={cancelRef}
                variant="subtle"
                px="5"
                _text={{ color: "gray.700" }}
                onPress={handleClose}
              >
                Cancel
              </Button>
              <Button
                px="5"
                bg={getBackgroundColor()}
                onPress={handleConfirm}
                isLoading={confirmLoading}
              >
                {buttonLabel}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default AlertModal;
