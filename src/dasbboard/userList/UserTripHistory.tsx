import {
  BankOutlined,
  CalendarOutlined,
  CarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Table, Tag } from "antd";

// Sample Data
const dataSource = [
  {
    key: "1",
    toCity: "Miami",
    startDate: "15/12/25",
    endDate: "18/12/25",
    transport: "Flight",
    airline: "Delta Airlines",
    stay: "Hotel",
  },
  {
    key: "2",
    toCity: "New York",
    startDate: "20/01/26",
    endDate: "25/01/26",
    transport: "Train",
    airline: "Amtrak Express",
    stay: "Airbnb",
  },
];

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
    title: (
      <span>
        Image
      </span>
    ),
    dataIndex: "image",
    key: "image",
    render: (text: string) => (
      <div className="">
        <img
          src={
            text && text.startsWith("http" || "https")
              ? text
              : text
              ? `imageUrl${text}`
              : "/default-avatar.png"
          }
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            objectFit: "cover",
          }}
        />
      </div>
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
  },
  {
    title: (
      <span>
        <CalendarOutlined /> End Date
      </span>
    ),
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: (
      <span>
        <CarOutlined /> Transport
      </span>
    ),
    dataIndex: "vahicle",
    key: "vahicle",
    render: (text: string) => <Tag color="blue">{text}</Tag>,
  },
  {
    title: (
      <span>
        <BankOutlined /> Airline
      </span>
    ),
    dataIndex: "airlineType",
    key: "airlineType",
  },
  {
    title: (
      <span>
        <BankOutlined /> Accommodation
      </span>
    ),
    dataIndex: "accomodation",
    key: "accomodation",
  },
  {
    title: (
      <span>
        <BankOutlined /> Stay
      </span>
    ),
    dataIndex: "stay",
    key: "stay",
  },
];

const UserTripHistory = () => {
  return (
    <div>
      <h2 className="text-lg text-primary  font-semibold mb-3 text-center md:text-start md:py-2">
        User Trip History:{" "}
      </h2>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default UserTripHistory;
