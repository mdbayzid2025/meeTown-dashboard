import { Button, ConfigProvider, Table } from 'antd'
import { SlEye } from 'react-icons/sl'
import { TbEyeClosed } from 'react-icons/tb'

const SubscriberList = () => {

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
                <div className="">
                    {record?.status === "active" ? <SlEye size={15} /> : <TbEyeClosed size={15} />}
                </div>
            )
        }
    ]

    return (
        <div>
            <h3 className='text-xl font-semibold text-grayMedium mb-6'>All Subscriber’s</h3>
            <ConfigProvider theme={{
                components: {
                    Table: {
                        headerBg: "#F7F7F7",
                        bodySortBg: "#F7F7F7",
                        colorBgContainer: "#F7F7F7",
                        lineHeight: 0,                                            
                    },
                    Pagination: {
                        itemActiveBg: "rgb(0,44,102)",
                        itemBg: "rgba(0,42,96,0.3215686274509804)",
                        colorPrimary: "rgb(255,255,255)",
                        colorText: "#000000",
                        borderRadius: 25,
                        itemSize: 40,
                        colorPrimaryHover: "#ffffff"                                                               
                    }
                }
            }}>

                <Table columns={userColumns} dataSource={users} pagination={{ pageSize: 7, align:"center" }} className='subscriptionTable'  />
            </ConfigProvider>            
        </div>
    )
}

export default SubscriberList


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
        name: "Lara Mitchell",
        email: "lara.mitchell@example.com",
        address: "45 Sunset Blvd",
        point: 95,
        status: "active",
        photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
    },
    {
        key: 7,
        name: "Daniel Kim",
        email: "daniel.kim@example.com",
        address: "88 Oak Lane",
        point: 120,
        status: "active",
        photo: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
    },
    {
        key: 8,
        name: "Sophia Hernandez",
        email: "sophia.hernandez@example.com",
        address: "312 Maple Street",
        point: 105,
        status: "inactive",
        photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    {
        key: 9,
        name: "Ethan Walker",
        email: "ethan.walker@example.com",
        address: "29 Elm Avenue",
        point: 85,
        status: "active",
        photo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
    },
    {
        key: 10,
        name: "Amelia Zhang",
        email: "amelia.zhang@example.com",
        address: "16 Pine Ridge",
        point: 130,
        status: "active",
        photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
    },
    {
        key: 11,
        name: "Lucas Johnson",
        email: "lucas.johnson@example.com",
        address: "72 Brookside Rd",
        point: 78,
        status: "inactive",
        photo: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
    },
    {
        key: 12,
        name: "Isla Patel",
        email: "isla.patel@example.com",
        address: "390 River Road",
        point: 140,
        status: "active",
        photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    {
        key: 13,
        name: "Owen Carter",
        email: "owen.carter@example.com",
        address: "57 Cypress Court",
        point: 102,
        status: "inactive",
        photo: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg"
    },
    {
        key: 14,
        name: "Zoe Nguyen",
        email: "zoe.nguyen@example.com",
        address: "84 Willow Way",
        point: 115,
        status: "active",
        photo: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg"
    },
    {
        key: 15,
        name: "Jayden Brooks",
        email: "jayden.brooks@example.com",
        address: "200 Birch Lane",
        point: 98,
        status: "inactive",
        photo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
    }
];
