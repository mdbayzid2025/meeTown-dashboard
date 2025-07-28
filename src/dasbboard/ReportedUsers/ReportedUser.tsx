import { Form, Input, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { SlEye } from "react-icons/sl";
import ReportViewModal from "./ReportViewModal";
// Assuming the details modal is generic enough to be reused.
// import UserDetailsModal from "./AdminDetailsModal";

const ReportedUsers = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [form] = Form.useForm();

  // Use Ant Design's Form.useWatch to get real-time input value for searching.
  const searchInput = Form.useWatch("search", form) || "";

  // The menu for the "Status" action dropdown
  // const items: MenuProps["items"] = [
  //   { key: "1", label: "Suspend User" },
  //   { key: "2", label: "Warn User" },
  //   { key: "3", label: "Delete Report", danger: true },
  // ];

  // const menu = <Menu items={items} />;

  const reportedUserColumns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
      width: 80,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user: { name: string; photo: string }) => (
        <div className="flex items-center gap-3">
          <img
            style={{
              height: 40,
              width: 40,
              borderRadius: 50,
              objectFit: "cover",
            }}
            src={user.photo}
            alt={user.name}
          />
          <h4 className="whitespace-nowrap font-medium">{user.name}</h4>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Report Date",
      dataIndex: "reportDate",
      key: "reportDate",
    },
    // {
    //   title: "Status",
    //   key: "status",
    //   render: () => (
    //     <Dropdown overlay={menu} trigger={["click"]}>
    //       <Button type="primary">
    //         Activate <DownOutlined />
    //       </Button>
    //     </Dropdown>
    //   ),
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <div className="flex items-center gap-2 ">
          <p
            className={`w-[100px] capitalize font-semibold 
                ${
                  status == "Resolved"
                    ? "text-green-600"
                    : status == "Pending"
                    ? "text-[#D97706]"
                    : "text-gray-400"
                }`}
          >
            {status}
          </p>
        </div>
      ),
    },
    {
      title: "Reported By",
      dataIndex: "reportedBy",
      key: "reportedBy",
      render: (reporter: { name: string; photo: string }) => (
        <div className="flex items-center gap-3">
          <img
            style={{
              height: 40,
              width: 40,
              borderRadius: 50,
              objectFit: "cover",
            }}
            src={reporter.photo}
            alt={reporter.name}
          />
          <h4 className="whitespace-nowrap font-medium">{reporter.name}</h4>
        </div>
      ),
    },
    {
      title: "View",
      key: "view",      
      render: (record: any) => (
        <div
          className="cursor-pointer"
          onClick={() => {
            setSelectedUser(record);
            setDetailsOpen(true);
          }}
        >
          <SlEye size={20} className="text-gray-600" />
        </div>
      ),
    },
  ];

  // Filter data based on the search input
  const filteredData = reportedUsersData.filter(
    (item) =>
      item.user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.email.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.reportedBy.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-grayMedium">Reported Users</h3>
      </div>

      <div className="mb-4">
        <div className="w-full md:w-1/3 mt-3 md:mt-0 pt-0">          
          <Form form={form}>
            <FormItem name="search">
              <Input
                name="search"
                style={{
                  background: "#EBEBEB",
                  height: 40,
                  borderRadius: 14,
                  border: "none",
                  color: "#767676",
                  fontSize: 15,
                }}
                className="font-medium"
                prefix={<IoSearch size={16} />}
                placeholder="Search here..."
              />
            </FormItem>
          </Form>
        </div>
      </div>

      <Table
        columns={reportedUserColumns}
        dataSource={filteredData}
        scroll={{ x: "max-content" }}
        pagination={{ defaultPageSize: 10, showSizeChanger: false }}
        rowKey="key"
      />

      <ReportViewModal
        open={detailsOpen}
        setOpen={setDetailsOpen}
        data={selectedUser}
      />
    </div>
  );
};

export default ReportedUsers;

// Sample data modeled after the provided image
const reportedUsersData = [
  {
    key: 1,
    user: { name: "Giring Furqon", photo: "https://i.pravatar.cc/150?img=1" },
    email: "jennings@example.com",
    reportDate: "2/12/25",
    status: "Pending",
    reason:
      "The user repeatedly posted offensive and inappropriate content in the discussion forums, despite multiple warnings from moderators.",
    reportedBy: {
      name: "Giring Furqon",
      photo: "https://i.pravatar.cc/150?img=11",
    },
  },
  {
    key: 2,
    user: { name: "John-W-BOSTON", photo: "https://i.pravatar.cc/150?img=2" },
    email: "mitc@example.com",
    reportDate: "2/12/25",
    status: "Pending",
    reason:
      "This account was found spamming users with unsolicited promotional links and advertisements through private messages.",
    reportedBy: {
      name: "John-W-BOSTON",
      photo: "https://i.pravatar.cc/150?img=12",
    },
  },
  {
    key: 3,
    user: { name: "Yanto Jericho", photo: "https://i.pravatar.cc/150?img=3" },
    email: "immons@example.com",
    reportDate: "2/12/25",
    status: "Ignored",
    reason:
      "User was engaged in harassment by sending threatening and offensive messages to other community members over a disagreement.",
    reportedBy: {
      name: "Yanto Jericho",
      photo: "https://i.pravatar.cc/150?img=13",
    },
  },
  {
    key: 4,
    user: { name: "Lukman Farhan", photo: "https://i.pravatar.cc/150?img=4" },
    email: "hill@example.com",
    reportDate: "2/12/25",
    status: "Resolved",
    reason:
      "The user deliberately shared misleading or false information in several public posts, which could potentially harm other users.",
    reportedBy: {
      name: "Lukman Farhan",
      photo: "https://i.pravatar.cc/150?img=14",
    },
  },
  {
    key: 5,
    user: { name: "Dimas Kamal", photo: "https://i.pravatar.cc/150?img=5" },
    email: "lawson@example.com",
    reportDate: "2/12/25",
    status: "Pending",
    reason:
      "The profile appears to be fake and exhibits behavior consistent with bot activity, such as posting repetitive comments at high frequency.",
    reportedBy: {
      name: "Dimas Kamal",
      photo: "https://i.pravatar.cc/150?img=15",
    },
  },
];
