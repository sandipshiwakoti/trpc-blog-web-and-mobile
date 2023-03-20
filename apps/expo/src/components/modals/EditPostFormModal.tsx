import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControl,
  Icon,
  Input,
  Modal,
  TextArea,
  useToast,
} from "native-base";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { api } from "../../utils/api";

interface EditPostFormModalProps {
  isVisible: boolean;
  handleClose: () => void;
  defaultValues: {
    id: string;
    title: string;
    content: string;
  };
}

const EditPostFormModal: React.FC<EditPostFormModalProps> = ({
  defaultValues,
  isVisible,
  handleClose,
}) => {
  const utils = api.useContext();
  const toast = useToast();
  const postSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
  });
  type PostSchema = z.infer<typeof postSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues,
  });

  const { isLoading, mutate: editPost } = api.post.editPost.useMutation({
    onSuccess: async ({ id }) => {
      await utils.post.posts.invalidate();
      await utils.post.getPostById.invalidate({ id });

      handleClose();
    },
    onError: ({ message }) => {
      toast.show({
        description: message,
        duration: 9000,
      });
    },
  });

  const onSubmit: SubmitHandler<PostSchema> = (data: PostSchema) => {
    editPost(data);
  };

  return (
    <>
      <Modal
        isOpen={isVisible}
        onClose={handleClose}
        size="xl"
        overlayVisible
        backdropVisible
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Edit Post</Modal.Header>
          <Modal.Body>
            <FormControl isInvalid={"title" in errors}>
              <FormControl.Label>Title</FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Title"
                  />
                )}
                name="title"
              />
              <FormControl.ErrorMessage
                leftIcon={<Icon name="warning" as={Ionicons} size="sm" />}
              >
                {errors.title?.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={"content" in errors}>
              <FormControl.Label>Content</FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextArea
                    autoCompleteType="none"
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Content"
                  />
                )}
                name="content"
              />
              <FormControl.ErrorMessage
                leftIcon={<Icon name="warning" as={Ionicons} size="sm" />}
              >
                {errors.content?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="subtle"
                px="5"
                _text={{ color: "gray.700" }}
                onPress={handleClose}
              >
                Cancel
              </Button>

              <Button
                px="5"
                onPress={handleSubmit(onSubmit)}
                isLoading={isLoading}
              >
                Edit
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default EditPostFormModal;
