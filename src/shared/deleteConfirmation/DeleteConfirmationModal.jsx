import { Modal, Button } from 'react-bootstrap';

// interface DeleteConfirmModalProps {
//   show: boolean;
//   title?: string;
//   message?: string;
//   confirmText?: string;
//   cancelText?: string;
//   loading?: boolean;
//   onConfirm: () => void;
//   onCancel: () => void;
// }

export default function DeleteConfirmModal({
  show,
  title = 'Confirm Deletion',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  loading = false,
  onConfirm,
  onCancel,
  itemId,
}) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="mb-0">{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          {cancelText}
        </Button>
        <Button
          variant="danger"
          onClick={() => onConfirm(itemId)}
          disabled={loading}
        >
          {loading ? 'Deleting...' : confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
