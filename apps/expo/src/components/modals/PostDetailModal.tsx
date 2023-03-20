import { Modal } from "native-base";

import PostDetail from "../../app/posts/components/PostDetail";
import { api } from "../../utils/api";

interface PostDetailModalProps {
  isVisible: boolean;
  handleClose: () => void;
  id: string;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({
  id,
  isVisible,
  handleClose,
}) => {
  const { isLoading, data: post } = api.post.getPostById.useQuery({ id });

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
          <Modal.Body p="0">
            {!isLoading && post && (
              <PostDetail
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                createdAt={post.createdAt.toString()}
                authorId={post.authorId}
              />
            )}
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default PostDetailModal;
