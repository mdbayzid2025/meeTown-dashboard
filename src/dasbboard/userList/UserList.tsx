import React from 'react'
import { Button, ConfigProvider, Table } from 'antd'
import { IoIosArrowDown } from 'react-icons/io'
import { SlEye } from 'react-icons/sl'
import { TbEyeClosed } from 'react-icons/tb'

const UserList = () => {

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
                    <Button type="primary"  danger={status !== "active"} className='w-[100px]'>{status}</Button>
                    <Button icon={<IoIosArrowDown />} />
                </div>
            )
        },
        {
            title: "View", key: "view", render: (record: any) => (
                <div className="">
                    {record?.status === "active" ? <SlEye size={15} /> : <TbEyeClosed size={15} />}
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
                        colorBgContainer: "#F7F7F7"
                    }
                }
            }}>

            <Table columns={userColumns} dataSource={users} />
            </ConfigProvider>
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
