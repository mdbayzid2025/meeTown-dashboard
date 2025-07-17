import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Table } from 'antd'
import { useState } from 'react'
import { LiaEdit } from 'react-icons/lia'
import { SlEye } from 'react-icons/sl'
import PackageDetailsModal from './PackageDetailsModal'
import PackageEditModal from './PackageEditModal'

const PackageList = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [editData, setEditData] = useState<any | null>(null);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [selectedData, setSelectedData] = useState<any | null>(null)
    


    const userColumns = [
        { title: "Id", dataIndex: "key", key: "key" },
        { title: "Unit", dataIndex: "unit", key: "unit" },
        { title: "Duration", dataIndex: "duration", key: "duration" },
        { title: "Unit Price", dataIndex: "unitPrice", key: "unitPrice" },
        {
            title: "Price", dataIndex: "price", key: "price",
            render: (price: number) => (<p className='text-primary font-semibold'>{price}</p>)
        },
        { title: "Discount", dataIndex: "discount", key: "discount" },
        { title: "Total Price", dataIndex: "total", key: "total" },
        { title: "Tag", dataIndex: "tag", key: "tag" },
        // {
        //     title: "Status", dataIndex: "status", key: "status", render: (status: string) => (
        //         <div className="flex items-center gap-2 ">
        //             <Button type="primary" danger={status !== "active"} className='w-[100px]'>{status}</Button>
        //             {/* <Button icon={<IoIosArrowDown />} /> */}
        //         </div>
        //     )
        // },
        {
            title: "View", key: "view", render: (record:any) => (
                <div className="flex items-center gap-5 ">
                    <Button onClick={() => { setEditData(record); setOpen(!open) }} icon={<LiaEdit size={20} className='!text-primary' />} />
                    <SlEye onClick={()=>{setShowDetails(!showDetails); setSelectedData(record)}} size={15}  className='cursor-pointer !text-primary'/>
                </div>
            )
        }
    ]

    const handleSubmit = (values: any) => {
        console.log("value", values);

    }
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h3 className='text-xl font-semibold text-grayMedium mb-6'>All Subscriber’s</h3>
                <Button onClick={() => setOpen(!open)} type='primary' size='large' icon={<PlusCircleOutlined style={{ fontSize: 20 }} />} iconPosition='end'>Add New</Button>
            </div>
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

                <Table columns={userColumns} dataSource={packageData} pagination={{ pageSize: 9, }} className='subscriptionTable' />
            </ConfigProvider>

            <PackageEditModal open={open} setOpen={setOpen} editData={editData} setEditData={setEditData} onSubmit={handleSubmit} />
            <PackageDetailsModal open={showDetails} setOpen={setShowDetails} data={selectedData} />
        </div>
    )
}

export default PackageList


export const packageData = [
    {
        key: 1,
        unit: "Monthly",
        duration: "1 Month",
        unitPrice: 12.50,
        price: 12.50,
        discount: 30,
        total: 50,
        tag: "Basic",
        status: "active",
    },
    {
        key: 2,
        unit: "Monthly",
        duration: "3 Months",
        unitPrice: 12.50,
        price: 35.00,
        discount: 25,
        total: 46.67,
        tag: "Standard",
        status: "active",
    },
    {
        key: 3,
        unit: "Monthly",
        duration: "6 Months",
        unitPrice: 12.50,
        price: 65.00,
        discount: 35,
        total: 100.00,
        tag: "Premium",
        status: "active",
    },
    {
        key: 4,
        unit: "Yearly",
        duration: "1 Year",
        unitPrice: 12.50,
        price: 120.00,
        discount: 40,
        total: 200.00,
        tag: "Basic",
        status: "inactive",
    },
    {
        key: 5,
        unit: "Weekly",
        duration: "1 Week",
        unitPrice: 12.50,
        price: 5.00,
        discount: 0,
        total: 5.00,
        tag: "Standart",
        status: "active",
    },
    {
        key: 6,
        unit: "Monthly",
        duration: "2 Months",
        unitPrice: 12.50,
        price: 24.00,
        discount: 20,
        total: 30.00,
        tag: "Premium",
        status: "active",
    },
    {
        key: 7,
        unit: "Quarterly",
        duration: "3 Months",
        unitPrice: 12.50,
        price: 32.00,
        discount: 36,
        total: 50.00,
        tag: "Premium",
        status: "inactive",
    },
    {
        key: 8,
        unit: "Half-Yearly",
        duration: "6 Months",
        unitPrice: 12.50,
        price: 58.00,
        discount: 42,
        total: 100.00,
        tag: "Basic",
        status: "active",
    },
    {
        key: 9,
        unit: "Yearly",
        duration: "1 Year",
        unitPrice: 12.50,
        price: 100.00,
        discount: 50,
        total: 200.00,
        tag: "Premium",
        status: "active",
    },
    {
        key: 10,
        unit: "Monthly",
        duration: "1 Month",
        unitPrice: 12.50,
        price: 15.00,
        discount: 0,
        total: 15.00,
        tag: "Standard",
        status: "inactive",
    },
    {
        key: 11,
        unit: "Weekly",
        duration: "2 Weeks",
        unitPrice: 12.50,
        price: 9.00,
        discount: 10,
        total: 10.00,
        tag: "Basic",
        status: "active",
    }
];
