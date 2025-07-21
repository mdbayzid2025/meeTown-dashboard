import { Button, Table } from 'antd'
import { useEffect, useState } from 'react'
import { SlEye } from 'react-icons/sl'
import { useSearchParams } from 'react-router-dom'

const SubscriberList = () => {
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const search = searchParams.get("searchQuery");        
            setSearchQuery(search || "")        
    }, [searchParams])

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
        { title: "Contact", dataIndex: "contact", key: "contact" },
        { title: "Booking Date", dataIndex: "bookingDate", key: "bookingDate" },
        { title: "Price", dataIndex: "price", key: "price" },
        {
            title: "Package Name", render: (record: any) => (
                <div className="">
                    {record?.duration} {record?.unit}{record?.duration > 1 && "s"}
                </div>
            )
        },
        { title: "Point", dataIndex: "point", key: "point" },
        {
            title: "Status", dataIndex: "status", key: "status", render: (status: string) => (
                <div className="flex items-center gap-2 ">
                    <Button type="primary" danger={status !== "active"} className='w-[100px] capitalize'>{status}</Button>
                    {/* <Button icon={<IoIosArrowDown />} /> */}
                </div>
            )
        },
        {
            title: "View", key: "view", render: (record: any) => (
                <div className="cursor-pointer">
                    {record && <SlEye size={15} />}
                </div>
            )
        }
    ]

    const filterSubscriber = subscribers.filter(subscriber=>subscriber?.name.toLowerCase().includes(searchQuery) || subscriber?.contact.toLowerCase().includes(searchQuery))
    return (
        <div>
            <h3 className='text-xl font-semibold text-grayMedium mb-6'>All Subscriber’s</h3>        
                {/* <Table columns={userColumns} dataSource={filterSubscriber} pagination={{ pageSize: 7, align: "center" }} className='subscriptionTable' />             */}
                <Table columns={userColumns} dataSource={filterSubscriber} className='subscriptionTable' />            
        </div>
    )
}

export default SubscriberList


export const subscribers = [
    {
        key: 1,
        name: "Afsana Mimi",
        email: "afsana@example.com",
        contact: "+8801700001101",
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
