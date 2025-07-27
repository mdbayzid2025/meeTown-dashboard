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
    title: <span><EnvironmentOutlined /> Destination</span>,
    dataIndex: "toCity",
    key: "toCity",
  },
  {
    title: <span><CalendarOutlined /> Start Date</span>,
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: <span><CalendarOutlined /> End Date</span>,
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: <span><CarOutlined /> Transport</span>,
    dataIndex: "transport",
    key: "transport",
    render: (text: string) => <Tag color="blue">{text}</Tag>,
  },
  {
    title: <span><BankOutlined /> Airline</span>,
    dataIndex: "airline",
    key: "airline",
  },
  {
    title: <span><BankOutlined /> Stay</span>,
    dataIndex: "stay",
    key: "stay",
  },  
];

const UserTripHistory = () => {
  return (
    <div>
      <h2 className="text-lg text-primary  font-semibold mb-3 text-center md:text-start md:py-2">User Trip History: </h2>
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
