import { Button, ConfigProvider, Table } from 'antd'
import { useState } from 'react';
import { SlEye } from 'react-icons/sl'
import UserDetailsModal from './UserDetailsModal';

const UserList = () => {
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);


    const userColumns = [
        { title: "Sl. No", dataIndex: "key", key: "key" },
        {
            title: "Name", render: (record: any) => (
                <div className="flex items-center gap-3">
                    <img src={record?.photo} className='w-14 h-14 rounded-full object-cover' alt="" />
                    <h4>{record?.name}</h4>
                </div>
            )
        },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Address", dataIndex: "address", key: "address" },
        { title: "Point", dataIndex: "point", key: "point" },
        {
            title: "Status", dataIndex: "status", key: "status", render: (status: string) => (
                <div className="flex items-center gap-2 ">
                    <Button type="primary" danger={status !== "active"} className='w-[100px]'>{status}</Button>
                    {/* <Button icon={<IoIosArrowDown />} /> */}
                </div>
            )
        },
        {
            title: "View", key: "view", render: (record: any) => (
                <div className="cursor-pointer" onClick={() => {
                    setSelectedUser(record);
                    setDetailsOpen(true);
                }}>
                    <SlEye size={15} />
                </div>
            )
        }
    ]
    return (
        <div>
            <h3 className='text-xl font-semibold text-grayMedium mb-10'>Total User</h3>
            <ConfigProvider theme={{
                components: {
                    Table: {
                        headerBg: "#F7F7F7",
                        bodySortBg: "#F7F7F7",
                        colorBgContainer: "#F7F7F7",
                    }
                }
            }}>

                <Table columns={userColumns} dataSource={users} pagination={{pageSize: 6}} className='subscriptionTable'/>
            </ConfigProvider>            
            <UserDetailsModal open={detailsOpen} setOpen={setDetailsOpen} data={selectedUser} />
        </div>
    )
}

export default UserList


export const users = [
    {
        key: 1,
        name: "Afsana Mimi",
        email: "afsana@example.com",
        address: "3890 Poplar Dr.",
        point: 120,
        status: "active",
        photo: "https://i.ibb.co/sJbPZbhw/494219200-2564029370601695-4810029999983361589-n.jpg"
    },
    {
        key: 2,
        name: "Lena Martins",
        email: "lena.martins@example.com",
        address: "1423 Oak Street",
        point: 95,
        status: "active",
        photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
    },
    {
        key: 3,
        name: "Ahmad Rafi",
        email: "ahmad.rafi@example.com",
        address: "78 Lakeview Blvd.",
        point: 135,
        status: "inactive",
        photo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
    },
    {
        key: 4,
        name: "Chloe Nguyen",
        email: "chloe.nguyen@example.com",
        address: "102 Sunset Ave.",
        point: 150,
        status: "active",
        photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    {
        key: 5,
        name: "Marco D'Souza",
        email: "marco.dsouza@example.com",
        address: "21 Hilltop Drive",
        point: 110,
        status: "inactive",
        photo: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
    },
    {
    key: 6,
    name: "Natalie Rodriguez",
    email: "natalie.rodriguez@example.com",
    address: "77 Sunset Boulevard",
    point: 130,
    status: "active",
    photo: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg"
  },
  {
    key: 7,
    name: "Liam O'Brien",
    email: "liam.obrien@example.com",
    address: "58 Riverfront Lane",
    point: 85,
    status: "inactive",
    photo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
  },
  {
    key: 8,
    name: "Sakura Tanaka",
    email: "sakura.tanaka@example.com",
    address: "90 Cherry Blossom Way",
    point: 102,
    status: "active",
    photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    key: 9,
    name: "Carlos Mendes",
    email: "carlos.mendes@example.com",
    address: "33 Oceanview Drive",
    point: 117,
    status: "inactive",
    photo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
  },
  {
    key: 10,
    name: "Fatima Noor",
    email: "fatima.noor@example.com",
    address: "19 Crescent Road",
    point: 142,
    status: "active",
    photo: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
  },
  {
    key: 11,
    name: "Ethan Zhang",
    email: "ethan.zhang@example.com",
    address: "72 Jade Street",
    point: 91,
    status: "inactive",
    photo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
  },
  {
    key: 12,
    name: "Maya Patel",
    email: "maya.patel@example.com",
    address: "10 Maple Leaf Road",
    point: 125,
    status: "active",
    photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
  },
  {
    key: 13,
    name: "Ahmed El-Sayed",
    email: "ahmed.elsayed@example.com",
    address: "38 Desert Rose Street",
    point: 106,
    status: "inactive",
    photo: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg"
  },
  {
    key: 14,
    name: "Sofia Marino",
    email: "sofia.marino@example.com",
    address: "82 Tuscany Lane",
    point: 97,
    status: "active",
    photo: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
  },
  {
    key: 15,
    name: "Noah Williams",
    email: "noah.williams@example.com",
    address: "25 Horizon Circle",
    point: 121,
    status: "active",
    photo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
  }
];
