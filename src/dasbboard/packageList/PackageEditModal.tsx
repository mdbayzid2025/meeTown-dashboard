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

    const duration = Form.useWatch('duration', form); // watch the 'unit' field
    const unit = Form.useWatch('unit', form); // watch the 'unit' field
    const unitPrice = Form.useWatch('unitPrice', form); // watch the 'unit' field
    const price = Form.useWatch('price', form); // watch the 'unit' field
    const discount = Form.useWatch('discount', form); // watch the 'unit' field
   
    useEffect(() => {
  const calculatedPrice = duration && unitPrice ? duration * unitPrice : 0;
  const calculatedTotal = discount ? +(calculatedPrice - (calculatedPrice * discount / 100)).toFixed(2) : calculatedPrice;

  form.setFieldsValue({
    price: calculatedPrice,
    total: calculatedTotal,
  });
}, [duration, unitPrice, discount]);

    return (
        <Modal
            open={open}
            onCancel={handleClose}
            onOk={() => form.submit()}
            width={800}
            title={<p className="text-2xl font-semibold text-primary text-center">{editData ? 'Edit Package' : 'Add Package'}</p>}
            footer={false}
            centered
        >
            <Divider />
            <Form
                onFinish={onFinish}
                layout='vertical'
                form={form}
                style={{ marginTop: 20, overflowY: "auto", maxHeight: "60vh", }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                    <FormItem
                        name="unit"
                        label={<p className='font-semibold text-[16px] text-black'>Unit</p>}
                        rules={[{ required: true, message: "Select Package Unit" }]}
                    >
                        <Select placeholder="Select Unit" style={{ height: 42 }}>
                            <Option value="month" style={{ height: 42 }}>Month</Option>
                            <Option value="year" style={{ height: 42 }}>Year</Option>
                        </Select>
                    </FormItem>

                    <FormItem
                        name="duration"
                        label={<p className='font-semibold text-[16px] text-black'>Duration</p>}
                        rules={[{ required: true, message: "Select Package Duration" }]}
                    >
                        <InputNumber disabled={!unit} 
                        placeholder={`${!unit ? "Select" : "Enter"} ${ !unit ? "Unit" : unit === 'year' ? 'year' : 'month'} `} 
                        style={{ height: 42, width: "100%" }} />
                    </FormItem>

                    <FormItem
                        name="unitPrice"
                        label={<p className='font-semibold text-[16px] text-black'>Unit Price</p>}
                        rules={[{ required:true, message: "Enter unit price" }]}
                    >
                        <InputNumber name='unitPrice' placeholder="Unit price" style={{ height: 42, width: "100%" }} />
                    </FormItem>

                    <FormItem
                        name="price"
                        label={<p className='font-semibold text-[16px] text-black'>Price</p>}
                        rules={[{ required: true, message: "Enter unit price" }]}
                    >
                        <InputNumber name='price' value={duration && unitPrice ? duration * unitPrice : 0} placeholder={`${duration && unitPrice ? duration * unitPrice : "Price"}`}  style={{ height: 42, width: "100%" }} disabled />
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
                        <InputNumber name='total' placeholder={`${price ? price : 0 } `}  style={{ height: 42, width: "100%" }} disabled />
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
