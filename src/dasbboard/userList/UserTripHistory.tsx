import {
  BankOutlined,
  CalendarOutlined,
  CarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Image, Table, Tag } from "antd";

// Sample Data
import {

} from "@ant-design/icons";

import dayjs from "dayjs";
import { useGetUserTripQuery } from "../../redux/features/trip/tripApi";
import { imageUrl } from "../../redux/base/baseAPI";


const UserTripHistory = ({data}:any) => {
  const {data: userTrip, isLoading} = useGetUserTripQuery(data?._id);

  const columns = [
  {
    title: (
      <span>
        <EnvironmentOutlined /> Place
      </span>
    ),
    dataIndex: "place",
    key: "place",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (text: string) => (
      <Image
        src={
          text?.startsWith("http")
            ? text
            : text
            ? `${imageUrl}${text}`
            : "/default-avatar.png"
        }
        alt="trip"
        style={{
          height: 50,
          width: 50,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    ),
  },
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

if(userTrip){
  console.log("userTrip", userTrip);
  
}
  return (
    <div>
      <h2 className="text-lg text-primary  font-semibold mb-3 text-center md:text-start md:py-2">
        User Trip History:{" "}
      </h2>
      <Table
        dataSource={userTrip?.pastTrips}
        columns={columns}
        loading={isLoading}
        rowKey="_id"
        bordered
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default UserTripHistory;
