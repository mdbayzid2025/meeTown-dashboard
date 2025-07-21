import { Button, ConfigProvider, Form, Input, Modal, Select, Table, Tag } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import { LiaEdit } from 'react-icons/lia';
import { SlEye } from 'react-icons/sl';

const Support = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [viewOpen, setViewOpen] = useState<boolean>(false);
    const [editData, setEditData] = useState<any | null>(null);
    const [viewData, setViewData] = useState<any | null>(null);
    const [form] = Form.useForm();

    const [data, setData] = useState([
        {
            key: 1,
            email: "support@example.com",
            contact: "+880123456789",
            message: "issue pending and we are looking into it. This message is deliberately long to test the view modal functionality.",
            status: "Pending"
        }
    ]);

    const supportColumns = [
        { title: "ID", dataIndex: "key", key: "key" },
        {
            title: "Email / Contact", render: (record: any) => (
                <h3>{record?.contact || record?.email}</h3>
            )
        },
        {
            title: "Message", key: "message",
            render: (record: any) => (
                <span>{record?.message?.slice(0, 100)}{record?.message?.length > 100 ? '...' : ''}</span>
            )
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag
                    color={
                        status === "Pending" ? "orange" : status === "Resolved" ? "green" : status === "Closed" ? "red" : "default"
                    }
                    className="capitalize"
                >
                    {status}
                </Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (record: any) => (
                <div className="flex items-center gap-5">
                    <LiaEdit size={20} onClick={() => {
                        setEditData(record);
                        setOpen(true);
                    }} className="!text-primary cursor-pointer" />
                    <SlEye
                        size={20}
                        className='cursor-pointer'
                        onClick={() => {
                            setViewData(record);
                            setViewOpen(true);
                        }}
                    />
                </div>
            )
        }
    ];

    const handleClose = () => {
        form.resetFields();
        setEditData(null);
        setOpen(false);
    };

    const handleSubmit = (values: any) => {
        if (editData) {
            const updated = data.map(item =>
                item.key === editData.key ? { ...item, ...values } : item
            );
            setData(updated);
        } else {
            const newKey = data.length + 1;
            setData([...data, { key: newKey, ...values }]);
        }
        handleClose();
    };

    useEffect(() => {
        if (editData) {
            form.setFieldsValue(editData);
        }
    }, [editData]);

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-grayMedium mb-6">Support Information</h3>
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
                <Table
                    columns={supportColumns}
                    dataSource={data}
                    pagination={{ pageSize: 9 }}
                    className="subscriptionTable"
                />
            </ConfigProvider>

            {/* Add/Edit Modal */}
            <Modal
                open={open}
                onCancel={handleClose}
                onOk={() => form.submit()}
                width={600}
                title={
                    <p className="text-2xl font-semibold text-primary text-center">
                        {editData ? 'Edit Support Info' : 'Add Support Info'}
                    </p>
                }
                footer={false}
                centered
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    style={{ marginTop: 20 }}
                >
                    <FormItem
                        name="email"
                        label={<p className="font-semibold text-[16px] text-black">Email</p>}
                        rules={[
                            { required: true, message: "Enter email address" },
                            { type: "email", message: "Enter a valid email address" }
                        ]}
                    >
                        <Input placeholder="Enter support email" style={{ height: 42 }} />
                    </FormItem>

                    <FormItem
                        name="contact"
                        label={<p className="font-semibold text-[16px] text-black">Contact Number</p>}
                        rules={[{ required: true, message: "Enter contact number" }]}
                    >
                        <Input placeholder="Enter contact number" style={{ height: 42 }} />
                    </FormItem>

                    <FormItem
                        name="message"
                        label={<p className="font-semibold text-[16px] text-black">Support Message</p>}
                        rules={[{ required: true, message: "Enter message" }]}
                    >
                        <Input.TextArea rows={4} placeholder="Enter message" />
                    </FormItem>

                    <FormItem
                        name="status"
                        label={<p className="font-semibold text-[16px] text-black">Status</p>}
                        rules={[{ required: true, message: "Select status" }]}
                    >
                        <Select placeholder="Select status" style={{ height: 42 }}>
                            <Select.Option value="Pending">Pending</Select.Option>
                            <Select.Option value="Resolved">Resolved</Select.Option>
                            <Select.Option value="Closed">Closed</Select.Option>
                        </Select>
                    </FormItem>

                    <div className="flex items-center justify-center mt-4">
                        <Button type="primary" size="large" htmlType="submit">
                            {editData ? "Edit Support Info" : "Add Support Info"}
                        </Button>
                    </div>
                </Form>
            </Modal>

            {/* View Modal */}
            <Modal
                open={viewOpen}
                onCancel={() => setViewOpen(false)}
                footer={null}
                centered
                title={<p className="text-xl font-semibold text-primary text-center">Support Details</p>}
            >
                <div className="mt-4 space-y-3 text-base">
                    <p><strong>Email:</strong> {viewData?.email}</p>
                    <p><strong>Contact:</strong> {viewData?.contact}</p>
                    <p><strong>Status:</strong> {viewData?.status}</p>
                    <p><strong>Message:</strong></p>
                    <p className="bg-gray-100 p-3 rounded">{viewData?.message}</p>
                </div>
            </Modal>
        </div>
    );
};

export default Support;
