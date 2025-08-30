import { Button, ConfigProvider, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect } from "react";

import img from "/authImage.png";

export type errorType = {
  data: {
    errorMessages: { message: string }[];
    message: string;
  };
};

const DeleteAccount = () => {
  const [form] = Form.useForm();

  // const [loginAdmin, { isLoading }] = useLoginAdminMutation();

  // const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("auth");
    if (storedData) {
      form.setFieldsValue(JSON.parse(storedData));
    }
  }, []);

  // const onFinish = async (values: any) => {
  //   try {
  //     const res = await loginAdmin(values).unwrap();  
    
    
  //   toast.success("Login Success");
  //   Cookies.set("accessToken", res?.data?.accessToken);
  
  //   if (res?.success && values?.remember) {
  //     localStorage.setItem("auth",JSON.stringify({email: values?.email as string, password: values?.password as string,}));
  //   }
  //   navigate("/")
  //   form.resetFields();

  //   } catch (error) {
  //     toast.error((error as any)?.data?.message)
  //   }
     
  // };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#002C66",

          colorBgContainer: "#F1F4F9",
        },
        components: {
          Input: {
            borderRadius: 8,
            colorBorder: "#9E9898",
            colorPrimaryBg: "#fff",
          },
        },
      }}
    >
      <div className="bg-[#EBEAEA] flex items-center justify-center h-screen gap-10 px-4 md:px-10">
        <div className="w-full hidden h-[600px] max-w-[650px]">
          <img
            src={img}
            className="w-full h-full object-cover rounded-tl-[55px] rounded-br-[55px]"
          />
        </div>

        <div className="!py-10 px-5 md:pt-10 md:pb-5 md:px-12 bg-white w-full  max-w-[650px] rounded-xl">
          <h1 className="text-black font-bold text-3xl mb-3">Delete your account </h1>
          <p>Please enter your email and password to continue</p>
          <Form
            form={form}
            // onFinish={onFinish}
            layout="vertical"
            className="mt-4"
          >
            <FormItem
              label={
                <p className="text-black font-semibold text-lg mt-2">Email</p>
              }
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Enter your email",
                },
              ]}
            >
              <Input
                name="email"
                style={{ height: 45, backgroundColor: "transparent" }}
                placeholder="Enter your email here"
              />
            </FormItem>
            <FormItem
              label={
                <p className="text-black font-semibold text-lg ">Password</p>
              }
              name="password"
              rules={[
                {
                  required: true,
                  message: "Enter your password",
                },
              ]}
            >
              <Input.Password
                name="password"
                style={{ height: 45, backgroundColor: "transparent" }}
                placeholder="Enter your password"
              />
            </FormItem>

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              style={{ width: "100%", background: "red", height: 50, fontSize: 20, borderRadius: 20 }}
            >
              Delete Account
            </Button>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default DeleteAccount;
