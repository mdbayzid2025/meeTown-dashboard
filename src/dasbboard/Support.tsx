import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Input, Modal, Table } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import { LiaEdit } from 'react-icons/lia';

const Support = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [editData, setEditData] = useState<any | null>(null);
    const [form] = Form.useForm();

    const [data, setData] = useState([
        { key: 1, email: "support@example.com", contact: "+880123456789" },
    ]);

    const supportColumns = [
        { title: "ID", dataIndex: "key", key: "key" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Contact Number", dataIndex: "contact", key: "contact" },
        {
            title: "Action",
            key: "action",
            render: (record: any) => (
                <div className="flex items-center gap-5">
                    <Button
                        onClick={() => {
                            setEditData(record);
                            setOpen(true);
                        }}
                        icon={<LiaEdit size={20} className="!text-primary" />}
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
                <Button
                    onClick={() => {
                        setEditData(null);
                        setOpen(true);
                    }}
                    type="primary"
                    size="large"
                    icon={<PlusCircleOutlined style={{ fontSize: 20 }} />}
                    iconPosition="end"
                >
                    Add New
                </Button>
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

                    <div className="flex items-center justify-center mt-4">
                        <Button type="primary" size="large" htmlType="submit">
                            {editData ? "Update Support Info" : "Add Support Info"}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default Support;
