import {
    BankOutlined,
    CalendarOutlined,
    CarOutlined,
    EnvironmentOutlined
} from "@ant-design/icons";
import { Divider, Modal, Table, Tag } from "antd";
import dayjs from "dayjs";
import { SlLocationPin } from "react-icons/sl";

const TripsModal = ({ open, onClose, data }: any) => {
  console.log("place", data);

  // columns for trip history table
  const columns = [
    {
      title: "User Name",
      dataIndex: "user",
      key: "user",
      render: (user: any) => <span className="font-bold">{user?.name}</span>,
    },
    {
      title: (
        <span>
          <EnvironmentOutlined /> Place
        </span>
      ),
      dataIndex: "place",
      key: "place",
    },

    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   key: "image",
    //   render: (image: any) => (
    //     <Image
    //       src={
    //         image?.startsWith("http")
    //           ? image
    //           : image
    //           ? `${imageUrl}${image}`
    //           : "/placeholder.png"
    //       }
    //       alt="trip"
    //       style={{
    //         height: 50,
    //         width: 50,
    //         borderRadius: "50%",
    //         objectFit: "cover",
    //       }}
    //     />
    //   ),
    // },
    {
      title: (
        <span>
          <CalendarOutlined /> Start Date
        </span>
      ),
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: (
        <span>
          <CalendarOutlined /> End Date
        </span>
      ),
      dataIndex: "endDate",
      key: "endDate",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: (
        <span>
          <CarOutlined /> Vehicle
        </span>
      ),
      dataIndex: "vehicle",
      key: "vehicle",
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: (
        <span>
          <BankOutlined /> Accommodation
        </span>
      ),
      dataIndex: "accommodation",
      key: "accommodation",
    },
    {
      title: (
        <span>
          <BankOutlined /> Travel With
        </span>
      ),
      dataIndex: "travelWith",
      key: "travelWith",
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={
        <p className="text-xl font-semibold text-primary ">
          Trip Details
        </p>
      }
      width={1000}
      centered
    >
      {/* User Info */}

      <div className="text-center ">       
        
          <p className="   top-0 flex items-center justify-center text-3xl font-semibold text-slate-600  gap-2 text-shadow">
            <SlLocationPin size={25}/> {data?.place} <img src={`https://flagsapi.com/${data?.countryCode}/flat/64.png`} className="w-10 ml-3" alt="flug" />
          </p>
                  
      </div>      

      <Divider style={{ background: "#ededed" }} />

      {/* Trip Table */}
      <Table
        dataSource={data?.trips} // single trip record wrapped in array
        columns={columns}
        rowKey="_id"
        pagination={false}
        bordered
        scroll={{ x: "max-content" }}
      />
    </Modal>
  );
};

export default TripsModal;
