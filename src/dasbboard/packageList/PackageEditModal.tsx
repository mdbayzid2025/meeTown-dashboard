import { Button, Divider, Form, InputNumber, Modal, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect } from 'react';

type packagePropsType = {
    open: boolean;
    setOpen: (open: boolean) => void;
    editData: any,
    setEditData: (editData: any) => void;
    onSubmit: (data: any) => void;
}

const { Option } = Select;

const PackageEditModal = ({ open, setOpen, editData, setEditData, onSubmit }: packagePropsType) => {
    const [form] = Form.useForm()

    const handleClose = () => {
        form.resetFields()
        setOpen(false)
        setEditData(null)
    }

    useEffect(() => {
        if (editData) {
            form.setFieldsValue(editData);
        }
    }, [editData, setEditData])

    const onFinish = (values: any) => {

        console.log("data", values);
        onSubmit(values);
        form.resetFields();
        setEditData(null);
    }

    // Watch the Unit value to update Duration options dynamically
    const unit = Form.useWatch('Unit', form);

    const monthOptions = [
        "1 Month", "2 Months", "3 Months", "4 Months", "5 Months",
        "6 Months", "7 Months", "8 Months", "9 Months", "10 Months", "11 Months"
    ];

    const yearOptions = [
        "1 Year", "2 Years", "3 Years", "4 Years", "5 Years"
    ];
    return (
        <Modal
            open={open}
            onCancel={handleClose}
            onOk={() => form.submit()}
            width={800}
            title={<p className="text-2xl font-semibold text-primary text-center">{editData ? 'Edit Package' : 'Add Package'}</p>}
            footer={false}
            centered
            // styles={{
            //     content: {
            //         background: '#EBEBEB'
            //     },
            //     header: {
            //         background: '#EBEBEB'
            //     }
            // }}
        >
            <Divider />
            <Form
                onFinish={onFinish}
                layout='vertical'
                form={form}
                style={{ marginTop: 20 }}
            >
                <div className="grid grid-cols-2 gap-x-5">
                    <FormItem
                        name="unit"
                        label={<p className='font-semibold text-[16px] text-black'>Unit</p>}
                        rules={[{ required: true, message: "Select Package Unit" }]}
                    >
                        <Select placeholder="Select Unit" style={{ height: 42 }}>
                            <Option value="monthly" style={{ height: 42 }}>Monthly</Option>
                            <Option value="yearly" style={{ height: 42 }}>Yearly</Option>
                        </Select>
                    </FormItem>

                    <FormItem
                        name="duration"
                        label={<p className='font-semibold text-[16px] text-black'>Duration</p>}
                        rules={[{ required: true, message: "Select Package Duration" }]}
                    >
                        <Select placeholder="Select Duration" style={{ height: 42 }}>
                            {(unit === "monthly" ? monthOptions : yearOptions).map(option => (
                                <Option key={option} value={option} style={{ height: 42 }}>{option}</Option>
                            ))}
                        </Select>
                    </FormItem>

                    <FormItem
                        name="unitPrice"
                        label={<p className='font-semibold text-[16px] text-black'>Unit Price</p>}
                        rules={[{ required: true, message: "Enter unit price" }]}
                    >
                        <InputNumber name='unitPrice' placeholder="Unit price" style={{ height: 42, width: "100%" }} />
                    </FormItem>

                    <FormItem
                        name="price"
                        label={<p className='font-semibold text-[16px] text-black'>Price</p>}
                        rules={[{ required: true, message: "Enter unit price" }]}
                    >
                        <InputNumber name='price' placeholder="Price" style={{ height: 42, width: "100%" }} disabled/>
                    </FormItem>

                    <FormItem
                        name="discount"
                        label={<p className='font-semibold text-[16px] text-black'>Discount</p>}
                        rules={[{ required: true, message: "Enter discount price" }]}
                    >
                        <InputNumber name='discount' placeholder="Discount" style={{ height: 42, width: "100%" }} />
                    </FormItem>

                    <FormItem
                        name="total"
                        label={<p className='font-semibold text-[16px] text-black'>Total Price</p>}
                        rules={[{ required: true, message: "Enter total price" }]}
                    >
                        <InputNumber name='total' placeholder="Total" style={{ height: 42, width: "100%" }} disabled/>
                    </FormItem>

                    <FormItem
                        name="tag"
                        label={<p className='font-semibold text-[16px] text-black w-full'>Tag</p>}
                        rules={[{ required: true, message: "Select Tag" }]}
                    >
                        <Select placeholder="Select Tag" style={{ height: 42, width: "100%" }}>
                            <Option value="basic" style={{ height: 42 }}>Basic</Option>
                            <Option value="standard" style={{ height: 42 }}>Standard</Option>
                            <Option value="premium" style={{ height: 42 }}>Premium</Option>
                        </Select>
                    </FormItem>

                    {/* <FormItem
                        name="status"
                        label={<p className='font-semibold text-[16px] text-black'>Status</p>}
                        rules={[{ required: true, message: "Select Tag" }]}
                    >
                        <Select placeholder="Select Tag" style={{ height: 42 }}>
                            <Option value="active" style={{ height: 42 }}>Active</Option>
                            <Option value="inactive" style={{ height: 42 }}>Inactive</Option>
                        </Select>
                    </FormItem> */}
                </div>
                <div className="flex items-center justify-center">
                    <Button type='primary' size='large' htmlType='submit'>{editData ? "Edit Package" : "Add  Package"}</Button>
                </div>
            </Form>
        </Modal>
    )
}

export default PackageEditModal;
