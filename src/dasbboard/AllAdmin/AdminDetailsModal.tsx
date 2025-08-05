import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Modal, Tag, Tooltip } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import DeleteItemsModal from "../../components/shared/DeleteItemsModal";
import { imageUrl } from "../../redux/base/baseAPI";
import { useDeleteUserMutation } from "../../redux/features/user/userApi";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any | null;
  onStatusChange: (id: string) => void;
  refetch: () => void;
};

const AdminDetailsModal = ({
  open,
  setOpen,
  data,
  onStatusChange,
  refetch,
}: Props) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    setOpenDelete(false);
    try {
      const res = await deleteUser(data?._id);
      if (res?.data) {
        setOpen(!open)
        toast.success("Package deleted successfully");
        refetch();
      }
    } catch (error) {
      console.error("Error deleting package:", error);
      toast.error("Failed to delete package");
    }
  };
  return (
    <Modal
      centered
      open={open}
      onCancel={handleClose}
      footer={null}
      width={900}
      title={null}
    >
      <div className="overflow-y-auto max-h-[600px] md:max-h-[700px]">
        <img
          src={
            data?.image && data?.image.startsWith("http")
              ? data?.image
              : data?.image
              ? `${imageUrl}${data?.image}`
              : "/placeholder.png"
          }
          alt="Admin"
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mb-3 mx-auto"
        />

        <div className="text-center">
          <Tag
            color={data?.status === "Active" ? "green" : "red"}
            className="text-sm mb-2 px-4 py-1 rounded-full"
          >
            {data?.status?.toUpperCase()}
          </Tag>

          <h2 className="text-2xl font-semibold text-primary mb-1">
            {data?.name}
          </h2>

          <p className="text-gray-600 text-sm">{data?.role ?? ""}</p>
        </div>

        <Divider className="bg-gray-300 !my-3 w-full" />

        <div className="grid md:grid-cols-2 text-[15px] gap-4">
          <div>
            <p className="text-gray-500 font-medium mb-1">Email</p>
            <p className="text-gray-800 font-semibold">{data?.email}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium mb-1">Phone</p>
            <p className="text-gray-800 font-semibold">
              {data?.phone || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 font-medium mb-1">Account Created</p>
            <p className="text-gray-800 font-semibold">{data?.createdAt}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium mb-1">Last Login</p>
            <p className="text-gray-800 font-semibold">
              {data?.lastLogin || "N/A"}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500 font-medium mb-1">Privileges</p>
            {data?.privileges?.length > 0 ? (
              data.privileges.map((priv: string, i: number) => (
                <Tag
                  key={i}
                  color="blue"
                  className="text-sm mb-2 px-4 py-1 rounded-full"
                >
                  {priv.toUpperCase()}
                </Tag>
              ))
            ) : (
              <p className="text-gray-600">No extra privileges</p>
            )}
          </div>
        </div>

        <Divider className="bg-gray-300 !my-4 w-full" />

        <div className="flex flex-wrap justify-center gap-3">
          {data?.status === "Active" ? (
            <Tooltip title="Suspend this admin temporarily">
              <Button
                type="default"
                danger
                size="large"
                onClick={() => onStatusChange(data?._id)}
              >
                Block
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Reactivate this admin">
              <Button
                type="primary"
                size="large"
                onClick={() => onStatusChange(data?._id)}
              >
                Unblock
              </Button>
            </Tooltip>
          )}
          <Tooltip title="Permanently delete this admin account">
            <Button
              onClick={() => setOpenDelete(true)}
              loading={isLoading}
              type="primary"
              danger
              size="large"
              icon={<ExclamationCircleOutlined />}
            >
              Delete Admin
            </Button>
          </Tooltip>
        </div>
        <DeleteItemsModal
          openDelete={openDelete}
          onClose={() => {
            setOpenDelete(false);
          }}
          onConfirm={handleDelete}
          message="Do you want to delete this package?"
        />
      </div>
    </Modal>
  );
};

export default AdminDetailsModal;
