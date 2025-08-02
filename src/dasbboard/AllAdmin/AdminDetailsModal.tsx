import { Modal, Tag, Divider, Button, Tooltip } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any | null;
};

const AdminDetailsModal = ({ open, setOpen, data }: Props) => {
  const handleClose = () => setOpen(false);

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
        {/* Admin Photo */}
        <img
          src={
            data?.image && data?.image.startsWith("http")
              ? data?.image
              : data?.image
              ? `imageUrl${data?.image}`
              : "/default-avatar.png"
          }
          alt="Admin"
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mb-3 mx-auto"
        />

        <div className="text-center">
          {/* Status */}
          <Tag
            color={data?.status === "active" ? "green" : "red"}
            className="text-sm mb-2 px-4 py-1 rounded-full"
          >
            {data?.status?.toUpperCase()}
          </Tag>

          {/* Name */}
          <h2 className="text-2xl font-semibold text-primary mb-1">
            {data?.name}
          </h2>

          {/* Role */}
          <p className="text-gray-600 text-sm">{data?.role ?? ""}</p>
        </div>

        <Divider className="bg-gray-300 !my-3 w-full" />

        {/* Info Section */}
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

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-3">
          <Tooltip title="Suspend the admin temporarily">
            <Button type="default" danger size="large">
              Block
            </Button>
          </Tooltip>
          <Tooltip title="Permanently delete this admin account">
            <Button
              type="primary"
              danger
              size="large"
              icon={<ExclamationCircleOutlined />}
            >
              Delete Admin
            </Button>
          </Tooltip>
        </div>
      </div>
    </Modal>
  );
};

export default AdminDetailsModal;
