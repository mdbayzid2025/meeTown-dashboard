import { Button, Divider, Form, Input, Modal, Select } from "antd";
import FormItem from "antd/es/form/FormItem";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: any) => void;
};

const { Option } = Select;

const AddAdmin = ({ open, setOpen, onSubmit }: Props) => {
  const [form] = Form.useForm();

  const handleClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const onFinish = (values: any) => {
    onSubmit(values);
    form.resetFields();
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      onOk={() => form.submit()}
      width={600}
      title={
        <p className="text-2xl font-semibold text-primary text-center">
          Add Admin
        </p>
      }
      footer={false}
      centered
    >
      <Divider />
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        style={{ marginTop: 20 }}
      >
        <div className="grid grid-cols-1 gap-x-5">
          <FormItem
          className="!mb-2"
            name="name"
            label={
              <p className="font-semibold text-[16px] text-black">Name</p>
            }
            rules={[
              { required: true, message: "Enter name" },              
            ]}
          >
            <Input placeholder="Name" style={{ height: 42 }} />
          </FormItem>
          <FormItem
          className="!mb-2"
            name="email"
            label={
              <p className="font-semibold text-[16px] text-black">Email</p>
            }
            rules={[
              { required: true, message: "Enter email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="Email" style={{ height: 42 }} />
          </FormItem>

          <Form.Item
          className="!mb-2"
            label={<p className="font-semibold text-[16px] text-black">Password</p>}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input.Password style={{ height: 42 }} placeholder="Password"/>
          </Form.Item>

          <Form.Item
          className="!mb-2"
            label={<p className="font-semibold text-[16px] text-black">Confirm Password</p>}
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password style={{ height: 42 }} placeholder="Confirm Password"/>
          </Form.Item>

          <FormItem
          className="!mb-2"
            name="role"
            label={<p className="font-semibold text-[16px] text-black">Role</p>}
            rules={[{ required: true, message: "Select a role" }]}
          >
            <Select placeholder="Select Role" style={{ height: 42 }}>
              <Option value="admin">Admin</Option>
              <Option value="super-admin">Super Admin</Option>
            </Select>
          </FormItem>
        </div>

        <div className="flex items-center justify-center mt-6">
          <Button type="primary" size="large" htmlType="submit">
            Add Admin
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddAdmin;
