import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { FiEdit, FiPlus } from 'react-icons/fi';
import { GoTrash } from 'react-icons/go';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';

const FAQ = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [editData, setEditData] = useState<any | null>(null);

    const faqData = [
        {
            key: 1,
            question: "Our Story?",
            answer: "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at "
        },
        {
            key: 2,
            question: "When to use Doctor For You?",
            answer: "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at "
        },
        {
            key: 3,
            question: "Our Mission?",
            answer: "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at "
        },
    ]


    return (
        <div className=' p-6 rounded-2xl'>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold text-grayMedium mb-6">FAQ</h1>
                <Button onClick={() => setOpen(!open)} type="primary" size='large' className='flex items-center'> <FiPlus size={24} />Add FAQ</Button>
            </div>

            <div className=''>
                {faqData && faqData.map(item =>
                    <div className='flex items-start justify-between gap-3'>
                        <div className='w-10' >
                            <Checkbox ></Checkbox>
                        </div>
                        <div className='w-full'>
                            <div className="bg-[#F9F9F9] px-4 text-lg font-medium py-2 rounded-xl text-black/80 mb-3 shadow-md">
                                {item.question}
                            </div>
                            <div className="bg-[#F9F9F9] px-4 py-2 rounded-md text-lg font-medium text-justify text-[#635d5d]/80 mb-6 shadow-md">
                                {item.answer}
                            </div>
                        </div>
                        <div className='w-14'>
                            <div className="flex flex-col items-center gap-3 text-[#999999]">
                                <FiEdit className='cursor-pointer' onClick={() => { setOpen(true); setEditData(item) }} size={24} />
                                <GoTrash className='cursor-pointer' size={24} color='red' />
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
            <FaqAddModal open={open} setOpen={setOpen} editData={editData} setEditData={setEditData} />
        </div>
    )
}



export type faqProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    editData?: any | null;
    setEditData: (editData: any | null) => void;

}

const FaqAddModal = ({ open, setOpen, editData, setEditData }: faqProps) => {
    const [form] = Form.useForm()
    const handleClose = () => {
        form.resetFields();
        setOpen(false);
        setEditData(null)
    }

    useEffect(() => {
        if (editData) {
            form.setFieldsValue(editData)
        }
    }, [editData, setEditData])

    const onFinish = (values: any) => {
        console.log("values", values);
        setOpen(false);
    }
    return (
        <Modal
            title={<p className="text-xl font-semibold text-primary">{editData ? "Update FAQ" : "Add FAQ"}</p>}
            open={open}
            onCancel={handleClose}
            centered
            footer={false}
        >
            <Form
                form={form}
                layout='vertical'
                onFinish={onFinish}
                style={{ marginTop: 15 }}
            >
                <FormItem
                    label={editData ? "Update FAQ" : "Add FAQ"}
                    name="question"
                    rules={[{
                        required: true,
                        message: "Enter FAQ question"
                    }]}
                >
                    <Input style={{ height: 42 }} name="question" placeholder='Your faq question' />
                </FormItem>
                <FormItem
                    name="answer"
                    label={editData ? "Update FAQ" : "Add FAQ"}
                    rules={[{
                        required: true,
                        message: "Enter FAQ answer"
                    }]}
                >
                    {/* <TextArea style={{ height: 42 }} name="answer" placeholder='Your faq answer' /> */}
                    <TextArea rows={4} name="answer" placeholder='Your faq answer' />
                </FormItem>
                <div className="flex items-center justify-center">
                    <Button className='' type='primary' size='large' htmlType='submit'>{editData ? "Update FAQ" : "Add FAQ"}</Button>
                </div>
            </Form>
        </Modal>
    )
}


export default FAQ