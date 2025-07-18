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
        { title: "Booking Date", dataIndex: "bookingDate", key: "bookingDate" },
        { title: "Price", dataIndex: "price", key: "price" },
        { title: "Package Name", render:(record:any)=>(
            <div className="">
                 {record?.duration} {record?.unit}{record?.duration > 1 && "s"}
            </div>
        ) },
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
                <div className="cursor-pointer">
                    <SlEye size={15} />
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
        bookingDate: "2/12/25",
        price: 60,
        unit: "Month",
        duration: 2,
        address: "3890 Poplar Dr.",
        point: 120,
        status: "active",
        photo: "https://i.ibb.co/sJbPZbhw/494219200-2564029370601695-4810029999983361589-n.jpg"
    },
];
