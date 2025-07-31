import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { FiLock, FiUnlock } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { SlEye } from "react-icons/sl";
import { useGetAdminQuery } from "../../redux/features/user/userApi";
import AddAdmin from "./AddAdmin";
import AdminDetailsModal from "./AdminDetailsModal";

const AllAdmin = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false);


  const [form] = Form.useForm();

  const { data: adminData, isLoading } = useGetAdminQuery(undefined);



  const userColumns = [
    {
      title: <span style={{ width: 50, display: "inline-block" }}>Sl. No</span>,
      dataIndex: "key",
      key: "key",
      width: 50,
      render: (_: any, __: any, index: number) => <span>{index + 1}</span>,
    },
    {
      title: "Name",
      render: (_: any, record: any) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
            paddingInline: 20,
          }}
        >
          <div className="h-[50px] w-[50px]">
            <img
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                objectFit: "cover",
              }}
              src={
                record?.image && record?.image.startsWith("http")
                  ? record?.image
                  : record?.image
                  ? `imageUrl${record?.image}`
                  : "/default-avatar.png"
              }
            />
          </div>

          <h4 className="whitespace-nowrap">{record?.name}</h4>
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Designation",
      dataIndex: "role",
      key: "role",
      render: (_: any, record: any) => (
        <p className="whitespace-nowrap text-nowrap">{record?.role}</p>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <div className="flex items-center gap-2 ">
          <p
            className={`w-[100px] capitalize ${
              status == "unblock" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <div className="flex items-center gap-3">
          <div
            className="cursor-pointer"
            onClick={() => {
              setSelectedUser(record);
              setDetailsOpen(true);
            }}
          >
            <SlEye size={16} />
          </div>
          {record?.status == "unblock" ? (
            <FiUnlock size={16} className="text-green-600 cursor-pointer" />
          ) : (
            <FiLock size={16} className="text-red-600 cursor-pointer" />
          )}
        </div>
      ),
    },
  ];

  // const searchInput = Form.useWatch("search", form);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const handleSubmit = (values: any) => {
    console.log("value", values);
    setOpen(!open);
  };

  return (
    <div className="md:p-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-grayMedium ">Manage Admin</h3>
      </div>

      <div className="flex items-center justify-between md:flex-row flex-col">
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
        <div className=" flex md:w-auto w-full items-center justify-between md:gap-3 ">
          <Select
            placeholder="Status"
            allowClear
            style={{ width: 120, height: 42 }}
            onChange={handleChange}
            options={[
              { value: "unblock", label: "unblock" },
              { value: "block", label: "Block" },
            ]}
          />

          <Button
            onClick={() => setOpen(!open)}
            type="primary"
            size="large"
            icon={<PlusCircleOutlined style={{ fontSize: 20 }} />}
            iconPosition="end"
          >
            Add Admin
          </Button>
        </div>
      </div>

      <Table
        columns={userColumns}
        dataSource={adminData?.users}
        loading={isLoading}
        scroll={{ x: "max-content" }}
        className={` subscriptionTable`}
      />
      <AdminDetailsModal
        open={detailsOpen}
        setOpen={setDetailsOpen}
        data={selectedUser}
      />
      <AddAdmin open={open} setOpen={setOpen} onSubmit={handleSubmit} />
    </div>
  );
};

export default AllAdmin;

export const users = [
  {
    key: 1,
    name: "Mimi Akter",
    email: "afsana@example.com",
    role: "Super Admin",
    nationality: "Bangladesh",
    address: "3890 Poplar Dr.",
    interests: ["Business partner", "Love", "Friends", "Nearby"],
    reportedStatus: "suspend",
    point: 120,
    status: "unblock",
    contact: "+8801700001101",
    photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    createdAt: "12-10-2025",
  },
  {
    key: 2,
    name: "Lena Martins",
    email: "lena.martins@example.com",
    role: "Support Admin",
    nationality: "Bangladesh",
    address: "1423 Oak Street",
    interests: ["Business partner", "Love", "Friends", "Nearby"],
    reportedStatus: "suspend",
    point: 95,
    status: "block",
    contact: "+8801700001102",
    photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    createdAt: "12-10-2025",
  },
];
