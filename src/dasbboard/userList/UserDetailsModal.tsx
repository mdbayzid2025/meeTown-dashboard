import { Modal, Tag, Divider } from "antd";
import UserTripHistory from "./UserTripHistory";
import moment from 'moment';


type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any | null;
};

const UserDetailsModal = ({ open, setOpen, data }: Props) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      centered
      open={open}
      onCancel={handleClose}
      footer={null}
      width={1000}
      title={null}
    >
      <div className="overflow-y-auto max-h-[600px] md:max-h-[700px]">
        {/* User Photo */}
        <img
          src={data?.image && data?.image.startsWith("http")
                  ? data?.image
                  : data?.image
                  ? `imageUrl${data?.image}`
                  : "/default-avatar.png"}
          alt="User"
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
        </div>
        <Divider className="bg-gray-300 !my-3 w-full" />

        {/* Info Section */}
        {/* <div className="grid md:grid-cols-2 text-[15px]"> */}
        <div className="grid md:grid-cols-2 text-[15px]">
          <div className="text-start mb-2">
            <p className="text-gray-500 font-medium mb-1">Nationality</p>
            <p className="text-gray-800 font-semibold">{data?.nationality}</p>
          </div>

          <div className="text-start mb-2">
            <p className="text-gray-500 font-medium mb-1">A/C Creation Date</p>
            <p className="text-gray-800 font-semibold">
               {moment(data?.date).format("MMMM D, YYYY")}
              </p>
          </div>

          <div className="text-start mb-2">
            <p className="text-gray-500 font-medium mb-1">Travel Preferance</p>
            {data?.interests.map((interest: any, index: number) => (
              <Tag
                key={index}
                color="purple"
                className="text-sm mb-2 px-4 py-1 rounded-full"
              >
                {interest.toUpperCase()}
              </Tag>
            ))}
          </div>

          <div className="text-start mb-2">
            <p className="text-gray-500 font-medium mb-1">Reported Status</p>
            <p
              className={`text-gray-800 font-semibold capitalize ${
                data?.reportedStatus === "" ? "text-green-600" : "text-red-600"
              }`}
            >
              {data?.reportedStatus ?? "N/A"}
            </p>
          </div>
        </div>
        <UserTripHistory />
      </div>
    </Modal>
  );
};

export default UserDetailsModal;
