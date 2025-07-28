import { Button, Form, Input, Select, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { SlEye } from "react-icons/sl";
import { useSearchParams } from "react-router-dom";
import NationalityFilter from "./NationalityFilter";
import UserDetailsModal from "./UserDetailsModal";

const UserList = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const [form] = Form.useForm();

  // const { data: usersData } = useGetUsersQuery(null); // Get all users

  useEffect(() => {
    const search = searchParams.get("searchQuery");
    if (search) {
      setSearchQuery(search || "");
    }
  }, [searchParams]); // ✅ watch the whole object

  const userColumns = [
    {
      title: <span style={{ width: 50, display: "inline-block" }}>Sl. No</span>,
      dataIndex: "key",
      key: "key",
      width: 50,
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
              src={record?.photo}
            />
          </div>

          <h4 className="whitespace-nowrap">{record?.name}</h4>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_: any, record: any) => (
        <p className="whitespace-nowrap text-nowrap">{record?.email}</p>
      ),
    },
    { title: "Contact", dataIndex: "contact", key: "contact" },
    // { title: "Address", dataIndex: "address", key: "address" },        
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <div className="flex items-center gap-2 ">
          <Button
            type="primary"
            danger={status !== "active"}
            className="w-[100px] capitalize"
          >
            {status}
          </Button>
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
          <SlEye size={15} />
        </div>
      ),
    },
  ];

  const filterUser = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const searchInput = Form.useWatch("search", form);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="md:p-4">
      <h3 className="text-xl font-semibold text-grayMedium mb-6">Total User</h3>

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
          <NationalityFilter />
          <Select            
            placeholder="Status"
            allowClear
            style={{ width: 120, height: 42, }}
            onChange={handleChange}
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inative" },                            
            ]}
          />
        </div>
      </div>

      <Table
        columns={userColumns}
        dataSource={filterUser}
        scroll={{ x: "max-content" }}
        className={` subscriptionTable`}
      />
      <UserDetailsModal
        open={detailsOpen}
        setOpen={setDetailsOpen}
        data={selectedUser}
      />
    </div>
  );
};

export default UserList;

export const users = [
  {
    key: 1,
    name: "Mimi Akter",
    email: "afsana@example.com",
    nationality: "Bangladesh",
    address: "3890 Poplar Dr.",    
    interests: [ "Business partner", "Love", "Friends", "Nearby"],
    reportedStatus: "suspend",
    point: 120,
    status: "active",
    contact: "+8801700001101",
    photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    createdAt: "12-10-2025"
  },
  {
    key: 2,
    name: "Lena Martins",
    email: "lena.martins@example.com",
    nationality: "Bangladesh",
    address: "1423 Oak Street",
    interests: [ "Business partner", "Love", "Friends", "Nearby"],
    reportedStatus: "suspend",
    point: 95,
    status: "active",
    contact: "+8801700001102",
    photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    createdAt: "12-10-2025"
  },
  {
    key: 3,
    name: "Ahmad Rafi",
    email: "ahmad.rafi@example.com",
    nationality: "Bangladesh",
    address: "78 Lakeview Blvd.",
    interests: [ "Business partner", "Love", "Friends", "Nearby"],
    reportedStatus: "suspend",
    point: 135,
    status: "inactive",
    contact: "+8801700001103",
    photo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    createdAt: "12-10-2025"
  },
  {
    key: 4,
    name: "Chloe Nguyen",
    email: "chloe.nguyen@example.com",
    nationality: "Bangladesh",
    address: "102 Sunset Ave.",
    interests: [ "Business partner", "Love", "Friends", "Nearby"],
    reportedStatus: "suspend",
    point: 150,
    status: "active",
    contact: "+8801700001104",
    photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    createdAt: "12-10-2025"
  },
  {
    key: 5,
    name: "Marco D'Souza",
    email: "marco.dsouza@example.com",
    nationality: "Bangladesh",
    address: "21 Hilltop Drive",
    interests: [ "Business partner", "Love", "Friends", "Nearby"],
    reportedStatus: "suspend",
    point: 110,
    status: "inactive",
    contact: "+8801700001105",
    photo: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    createdAt: "12-10-2025"
  },
  {
    key: 6,
    name: "Natalie Rodriguez",
    email: "natalie.rodriguez@example.com",
    nationality: "Bangladesh",
    address: "77 Sunset Boulevard",
    interests: [ "Business partner", "Love", "Friends", "Nearby"],
    reportedStatus: "suspend",
    point: 130,
    status: "active",
    contact: "+8801700001106",
    photo: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    createdAt: "12-10-2025"
  },
  {
    key: 7,
    name: "Liam O'Brien",
    email: "liam.obrien@example.com",
    nationality: "Bangladesh",
    address: "58 Riverfront Lane",
    interests: [ "Business partner", "Love", "Friends", "Nearby"],
    reportedStatus: "suspend",
    point: 85,
    status: "inactive",
    contact: "+8801700001107",
    photo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    createdAt: "12-10-2025"
  },
  {
    key: 8,
    name: "Sakura Tanaka",
    email: "sakura.tanaka@example.com",
    nationality: "Bangladesh",
    address: "90 Cherry Blossom Way",
    interests: [ "Business partner", "Love", "Friends", "Nearby"],
    reportedStatus: "suspend",
    point: 102,
    status: "active",
    contact: "+8801700001108",
    photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    createdAt: "12-10-2025"
  },
  {
    key: 9,
    name: "Carlos Mendes",
    email: "carlos.mendes@example.com",
    nationality: "Bangladesh",
    address: "33 Oceanview Drive",
    interests: [ "Business partner", "Love", "Friends", "Nearby"],
    reportedStatus: "suspend",
    point: 117,
    status: "inactive",
    contact: "+8801700001109",
    photo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    createdAt: "12-10-2025"
  },
  {
    key: 10,
    name: "Fatima Noor",
    email: "fatima.noor@example.com",
    nationality: "Bangladesh",
    address: "19 Crescent Road",
    interests: [ "Business partner", "Love", "Friends", "Nearby"],
    reportedStatus: "suspend",
    point: 142,
    status: "active",
    contact: "+8801700001110",
    photo: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    createdAt: "12-10-2025"
  },
  {
    key: 11,
    name: "Ethan Zhang",
    email: "ethan.zhang@example.com",
    nationality: "Bangladesh",
    address: "72 Jade Street",
    interests: [ "Business partner", "Love", "Friends", "Nearby"],
    reportedStatus: "suspend",
    point: 91,
    status: "inactive",
    contact: "+8801700001111",
    photo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    createdAt: "12-10-2025"
  },
  {
    key: 12,
    name: "Maya Patel",
    email: "maya.patel@example.com",
    nationality: "Bangladesh",
    address: "10 Maple Leaf Road",
    interests: [ "Business partner", "Love", "Friends", "Nearby"],
    reportedStatus: "suspend",
    point: 125,
    status: "active",
    contact: "+8801700001112",
    photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    createdAt: "12-10-2025"
  },
  {
    key: 13,
    name: "Ahmed El-Sayed",
    email: "ahmed.elsayed@example.com",
    nationality: "Bangladesh",
    address: "38 Desert Rose Street",
    interests: [ "Business partner", "Love", "Friends", "Nearby"],
    reportedStatus: "suspend",
    point: 106,
    status: "inactive",
    contact: "+8801700001113",
    photo: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
    createdAt: "12-10-2025"
  },
  {
    key: 14,
    name: "Sofia Marino",
    email: "sofia.marino@example.com",
    nationality: "Bangladesh",
    address: "82 Tuscany Lane",
    interests: [ "Business partner", "Love", "Friends", "Nearby"],
    reportedStatus: "suspend",
    point: 97,
    status: "active",
    contact: "+8801700001114",
    photo: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
    createdAt: "12-10-2025"
  },
  {
    key: 15,
    name: "Noah Williams",
    email: "noah.williams@example.com",
    nationality: "Bangladesh",
    address: "25 Horizon Circle",
    interests: [ "Business partner", "Love", "Friends", "Nearby"],
    reportedStatus: "suspend",
    point: 121,
    status: "active",
    contact: "+8801700001115",
    photo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    createdAt: "12-10-2025"
  },
];
