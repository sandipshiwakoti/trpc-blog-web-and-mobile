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

interface CreatePostFormModalProps {
  isVisible: boolean;
  handleClose: () => void;
}

const CreatePostFormModal: React.FC<CreatePostFormModalProps> = ({
  isVisible,
  handleClose,
}) => {
  const utils = api.useContext();
  const toast = useToast();
  const postSchema = z.object({
    title: z.string(),
    content: z.string(),
  });
  type PostSchema = z.infer<typeof postSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
  });

  const { isLoading, mutate: createPost } = api.post.createPost.useMutation({
    onSuccess: async () => {
      await utils.post.posts.invalidate();
      handleClose();
      reset({ title: "", content: "" });
    },
    onError: ({ message }) => {
      toast.show({
        description: message,
        duration: 9000,
      });
    },
  });

  const onSubmit: SubmitHandler<PostSchema> = (data: PostSchema) => {
    createPost(data);
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
          <Modal.Header>Create Post</Modal.Header>
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
                Create
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default CreatePostFormModal;
