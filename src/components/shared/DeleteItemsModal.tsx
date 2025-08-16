// src/components/shared/ConfirmModal.tsx
import { Button, Modal } from "antd";

interface ConfirmModalProps {
  openDelete: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
}

const DeleteItemsModal = ({
  openDelete,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "Do you want to delete this content?",
  confirmText = "Confirm",
}: ConfirmModalProps) => {
  return (
    <Modal
      centered
      open={openDelete}
      onCancel={onClose}
      footer={false}
      width={400}
    >
      <div className="px-6 pt-6 text-center">
        <p className="text-[#D93D04] text-center font-semibold text-lg mb-0">{title}</p>
        <p className="pt-4 pb-12 text-center">{message}</p>
        <Button
          type="primary"
          size="large"
          onClick={onConfirm}
          className="bg-[#2E7A8A] py-2 px-5 text-white rounded-md cursor-pointer"
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteItemsModal;
