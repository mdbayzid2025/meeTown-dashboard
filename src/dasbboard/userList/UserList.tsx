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

                <Table columns={userColumns} dataSource={users} />
            </ConfigProvider>
            <div className="flex items-center justify-between gap-10 pr-10">
                <div className="w-full bg-white h-full py-5 px-3 pr-24">
                    <p className='text-2xl text-primary text-center '>Hello, This User 19s Starting A New profile. <br /> </p>
                    <p className='text-orange-500 text-xl font-semibold text-center mt-3'>If Any Problem You Can Report And Block This Accounts</p>
                </div>
                <div className="flex flex-col gap-3 w-[200px]">
                    <Button type='primary' size='large'>Active</Button>
                    <Button type='primary' size='large' danger>Report</Button>
                </div>
            </div>
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
    }
];
