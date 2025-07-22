import { Button, Collapse, Form, Input, Modal } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { FiEdit, FiPlus } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import ConfirmModel from "../components/shared/ConfirmModel";

const FAQ = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<any | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<any| null>(null);

  const faqData = [
    {
      key: 1,
      question: "Our Story?",
      answer:
        "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at ",
    },
    {
      key: 2,
      question: "When to use Doctor For You?",
      answer:
        "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at ",
    },
    {
      key: 3,
      question: "Our Mission?",
      answer:
        "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at ",
    },
  ];

  const handleEdit = (faq: any) => {
    setEditData(faq);
    setOpen(true);
  };



  const items = faqData.map((faq) => ({
    key: faq.key,
    label: (
      <div className="flex justify-between items-center w-full">
        <span className="text-base font-medium">{faq.question}</span>
        <div className="flex items-center gap-3">
          <FiEdit
            size={20}
            className="text-white cursor-pointer "
            onClick={(e) => {
              e.stopPropagation(); // prevent collapse toggle
              handleEdit(faq);
            }}
          />
          <GoTrash
            size={20}
            className="text-red-600 cursor-pointer hover:text-red-800"
            onClick={() => {
              setOpenConfirm(true);
              setSelectedFaq(faq)            ;
            }}
          />
        </div>
      </div>
    ),
    children: <p className="text-gray-700 text-justify">{faq.answer}</p>,
  }));

  return (
    <div className=" md:p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-grayMedium mb-6">FAQ</h1>
        <Button
          onClick={() => setOpen(!open)}
          type="primary"
          size="large"
          className="flex items-center"
        >
          {" "}
          <FiPlus size={24} />
          Add FAQ
        </Button>
      </div>

      <Collapse accordion items={items} defaultActiveKey={['1']}/>
      <FaqAddModal
        open={open}
        setOpen={setOpen}
        editData={editData}
        setEditData={setEditData}
      />
      <ConfirmModel
        open={openConfirm}
        title="Delete FAQ?"
        content={`Are you sure you want to delete "${selectedFaq?.question}"?`}
        okText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={()=>alert("deleted alertm")}
        onCancel={() => {
          setOpenConfirm(false);
          setSelectedFaq(null);
        }}
      />
    </div>
  );
};

export type faqProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData?: any | null;
  setEditData: (editData: any | null) => void;
};

const FaqAddModal = ({ open, setOpen, editData, setEditData }: faqProps) => {
  const [form] = Form.useForm();
  const handleClose = () => {
    form.resetFields();
    setOpen(false);
    setEditData(null);
  };

  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);
    }
  }, [editData, setEditData]);

  const onFinish = (values: any) => {
    console.log("values", values);
    setOpen(false);
  };
  return (
    <Modal
      title={
        <p className="text-xl font-semibold text-primary">
          {editData ? "Update FAQ" : "Add FAQ"}
        </p>
      }
      open={open}
      onCancel={handleClose}
      centered
      footer={false}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ marginTop: 15 }}
      >
        <FormItem
          label={editData ? "Update FAQ" : "Add FAQ"}
          name="question"
          rules={[
            {
              required: true,
              message: "Enter FAQ question",
            },
          ]}
        >
          <Input
            style={{ height: 42 }}
            name="question"
            placeholder="Your faq question"
          />
        </FormItem>
        <FormItem
          name="answer"
          label={editData ? "Update FAQ" : "Add FAQ"}
          rules={[
            {
              required: true,
              message: "Enter FAQ answer",
            },
          ]}
        >
          {/* <TextArea style={{ height: 42 }} name="answer" placeholder='Your faq answer' /> */}
          <TextArea rows={4} name="answer" placeholder="Your faq answer" />
        </FormItem>
        <div className="flex items-center justify-center">
          <Button className="" type="primary" size="large" htmlType="submit">
            {editData ? "Update FAQ" : "Add FAQ"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FAQ;
