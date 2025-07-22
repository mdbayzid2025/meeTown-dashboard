import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { SlEye } from "react-icons/sl";
import { useSearchParams } from "react-router-dom";
import UserDetailsModal from "./UserDetailsModal";



const UserList = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

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
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Point", dataIndex: "point", key: "point" },
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

  return (
    <div>
      <h3 className="text-xl font-semibold text-grayMedium mb-10">
        Total User
      </h3>
      <Table
        columns={userColumns}
        dataSource={filterUser}
        pagination={{ pageSize: 6 }}                
         scroll={{ x: 'max-content' }}
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
    address: "3890 Poplar Dr.",
    point: 120,
    status: "active",
    contact: "+8801700001101",
    photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    key: 2,
    name: "Lena Martins",
    email: "lena.martins@example.com",
    address: "1423 Oak Street",
    point: 95,
    status: "active",
    contact: "+8801700001102",
    photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    key: 3,
    name: "Ahmad Rafi",
    email: "ahmad.rafi@example.com",
    address: "78 Lakeview Blvd.",
    point: 135,
    status: "inactive",
    contact: "+8801700001103",
    photo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
  },
  {
    key: 4,
    name: "Chloe Nguyen",
    email: "chloe.nguyen@example.com",
    address: "102 Sunset Ave.",
    point: 150,
    status: "active",
    contact: "+8801700001104",
    photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
  },
  {
    key: 5,
    name: "Marco D'Souza",
    email: "marco.dsouza@example.com",
    address: "21 Hilltop Drive",
    point: 110,
    status: "inactive",
    contact: "+8801700001105",
    photo: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
  {
    key: 6,
    name: "Natalie Rodriguez",
    email: "natalie.rodriguez@example.com",
    address: "77 Sunset Boulevard",
    point: 130,
    status: "active",
    contact: "+8801700001106",
    photo: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
  },
  {
    key: 7,
    name: "Liam O'Brien",
    email: "liam.obrien@example.com",
    address: "58 Riverfront Lane",
    point: 85,
    status: "inactive",
    contact: "+8801700001107",
    photo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
  },
  {
    key: 8,
    name: "Sakura Tanaka",
    email: "sakura.tanaka@example.com",
    address: "90 Cherry Blossom Way",
    point: 102,
    status: "active",
    contact: "+8801700001108",
    photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    key: 9,
    name: "Carlos Mendes",
    email: "carlos.mendes@example.com",
    address: "33 Oceanview Drive",
    point: 117,
    status: "inactive",
    contact: "+8801700001109",
    photo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
  },
  {
    key: 10,
    name: "Fatima Noor",
    email: "fatima.noor@example.com",
    address: "19 Crescent Road",
    point: 142,
    status: "active",
    contact: "+8801700001110",
    photo: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
  },
  {
    key: 11,
    name: "Ethan Zhang",
    email: "ethan.zhang@example.com",
    address: "72 Jade Street",
    point: 91,
    status: "inactive",
    contact: "+8801700001111",
    photo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
  },
  {
    key: 12,
    name: "Maya Patel",
    email: "maya.patel@example.com",
    address: "10 Maple Leaf Road",
    point: 125,
    status: "active",
    contact: "+8801700001112",
    photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
  },
  {
    key: 13,
    name: "Ahmed El-Sayed",
    email: "ahmed.elsayed@example.com",
    address: "38 Desert Rose Street",
    point: 106,
    status: "inactive",
    contact: "+8801700001113",
    photo: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
  },
  {
    key: 14,
    name: "Sofia Marino",
    email: "sofia.marino@example.com",
    address: "82 Tuscany Lane",
    point: 97,
    status: "active",
    contact: "+8801700001114",
    photo: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
  },
  {
    key: 15,
    name: "Noah Williams",
    email: "noah.williams@example.com",
    address: "25 Horizon Circle",
    point: 121,
    status: "active",
    contact: "+8801700001115",
    photo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
  },
];
