// src/components/shared/ConfirmModal.tsx
import { Modal } from "antd";

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
    <Modal centered open={openDelete} onCancel={onClose} footer={false} width={400}>
      <div className="p-6 text-center">
        <p className="text-[#D93D04] text-center font-semibold">{title}</p>
        <p className="pt-4 pb-12 text-center">{message}</p>
        <button
          onClick={onConfirm}
          className="bg-[#2E7A8A] py-2 px-5 text-white rounded-md"
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteItemsModal;
