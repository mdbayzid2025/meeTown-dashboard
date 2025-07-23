import { Button, Card, Form, Image, Input, Upload, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";

const Profile = () => {
  const [form] = Form.useForm();

  const handleUploadChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    
      <div className="">
      <h3 className="text-xl font-semibold text-grayMedium mb-6 md:mb-0"> Package List</h3>

      <div className=" mx-auto md:p-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center">
       
        {/* Profile Picture Card */}
        <Card
          className="w-full shadow-md rounded-xl md:col-span-1"
          cover={
            <Image
              alt="Profile"
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
              className="!h-96 object-cover rounded-t-xl"
            />
          }
        >
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            onChange={handleUploadChange}
            showUploadList={false}
          >
            <Button type="primary" block icon={<UploadOutlined />}>
              Change Picture
            </Button>
          </Upload>
        </Card>

        {/* Profile Form */}
        <div className="md:col-span-2 bg-white p-6 shadow-md rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <Form layout="vertical" form={form}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormItem
                name="name"
                label="Full Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="John Doe" style={{ height: 42 }} />
              </FormItem>

              <FormItem
                name="contact"
                label="Email or Phone"
                rules={[
                  { required: true, message: "Please enter your contact info" },
                ]}
              >
                <Input placeholder="john@example.com" style={{ height: 42 }} />
              </FormItem>

              <FormItem
                name="gender"
                label="Gender"
                rules={[
                  { required: true, message: "Please specify your gender" },
                ]}
              >
                <Input
                  placeholder="Male / Female / Other"
                  style={{ height: 42 }}
                />
              </FormItem>

              <FormItem
                name="country"
                label="Country"
                rules={[
                  { required: true, message: "Please enter your country" },
                ]}
              >
                <Input placeholder="Bangladesh" style={{ height: 42 }} />
              </FormItem>

              <FormItem
                name="dob"
                label="Date of Birth"
                rules={[
                  {
                    required: true,
                    message: "Please enter your date of birth",
                  },
                ]}
              >
                <Input placeholder="YYYY-MM-DD" style={{ height: 42 }} />
              </FormItem>
            </div>

            <div className="mt-6">
              <Button type="primary" size="large">
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </div>
      </div>    
  );
};

export default Profile;
