import { Avatar, Button, Divider, Modal } from "antd";
import { imageUrl } from "../../redux/base/baseAPI";
import DeleteItemsModal from "../../components/shared/DeleteItemsModal";
import { useState } from "react";
import {
  useDeleteUserMutation,
  useUpdateStatusMutation,
} from "../../redux/features/user/userApi";
import { toast } from "react-toastify";
import { useUpdateReportMutation } from "../../redux/features/reports/reportsApi";

// Define the shape of the data prop
interface ReportViewModalProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  data: any | null;
  refetch: () => void;
}

const ReportViewModal = ({
  open,
  setOpen,
  data,
  refetch,
}: ReportViewModalProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const [updateReport, { isLoading: updating }] = useUpdateReportMutation();
  const [updateStatus] = useUpdateStatusMutation();

  const handleReport = async (status: any) => {
    if (status === "Inactive") {
      const res = await updateReport({ id: data?._id, status: "Resolved" });
      const userRes = await updateStatus(data?.user?._id);

      console.log("Report response:", res);
      console.log("User status update response:", userRes);
      setOpen(false);
      refetch();
      toast.success("User blocked successfully");
    } else if (status === "Rejected") {
      const res = await updateReport({ id: data?._id, status: "Rejected" });
      console.log("Report response: Rejected", res);
      setOpen(false);
      refetch();
    } else if (status === "Delete") {
      setOpenDelete(true);
    }
  };

  const handleDelete = async () => {
    setOpenDelete(false);
    try {
      console.log("Deleting user:", data?.user?._id);

      const res = await deleteUser(data?.user?._id);
      await updateReport({ id: data?._id, status: "Resolved" });
      if (res?.data) {
        setOpen(!open);
        toast.success("User deleted successfully");
        refetch();
      }
    } catch (error) {
      console.error("Error deleting package:", error);
      toast.error("Failed to delete package");
    }
  };

  const isDisabled = data?.status === "Rejected"
  
  console.log("asdfasdf", data);
  
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null} // We use custom buttons, so we hide the default footer
      centered
      width={600}
    >
      <div className="flex flex-col items-center gap-4 text-center w-full p-6 rounded-lg ">
        <Avatar
          src={
            data?.user?.image && data?.user?.image.startsWith("http")
              ? data?.user?.image
              : data?.user?.image
              ? `${imageUrl}${data?.user?.image}`
              : "/placeholder.png"
          }
          size={128}
          className="mb-2"
        />

        <h2 className="text-2xl font-bold text-primary leading-2">
          {data?.user?.name}
        </h2>
        <Divider size="small" />

        <div className="text-start w-full px-4">
          <h4 className="text-lg font-bold text-blue-600 underline">Reason:</h4>
          <p className="mt-2 text-lg text-[#D97706] text-justify leading-7">
            {data?.reason}
          </p>
        </div>

        <div className="flex items-center justify-around gap-4 mt-6 w-full">
          <ActionButton
            label="Block"
            color="#D97706"
            onClick={() => handleReport("Inactive")}
            loading={updating}            
          />

          <ActionButton
            label="Delete"
            color="#ff4d4f"
            onClick={() => handleReport("Delete")}
            loading={isLoading}            
          />

          <ActionButton
            label="Rejected"
            color="#06b6d4"
            onClick={() => handleReport("Rejected")}
            loading={updating}
            disabled={isDisabled}
          />
        </div>
        <DeleteItemsModal
          openDelete={openDelete}
          onClose={() => {
            setOpenDelete(false);
          }}
          onConfirm={handleDelete}
          message="Do you want to delete this user?"
        />
      </div>
    </Modal>
  );
};

export default ReportViewModal;

const ActionButton = ({
  label,
  color,
  onClick,
  loading = false,
  disabled = false,
}: {
  label: string;
  color: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}) => {
  const disabledStyle = {
    backgroundColor: "#f1f1f1",
    borderColor: "#d4d4d4",
    color: "#9ca3af",
    cursor: "not-allowed",
    opacity: 0.6,
  };

  const activeStyle = {
    backgroundColor: color,
    borderColor: color,
    color: "#ffffff",
    cursor: "pointer",
    opacity: 1,
  };

  return (
    <Button
      type="primary"
      loading={loading}
      disabled={disabled}
      style={{
        width: 120,
        height: 50,
        fontSize: "1.1rem",
        fontWeight: "600",
        transition: "all 0.3s ease",
        ...(disabled ? disabledStyle : activeStyle),
      }}
      onClick={onClick}
      className={`hover:opacity-80 ${!disabled ? `hover:bg-[${color}]` : ""}`}
    >
      {label}
    </Button>
  );
};
