import { Button, Checkbox, ConfigProvider, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginAdminMutation } from "../../redux/features/auth/authApi";
import img from "/authImage.png";

export type errorType = {
  data: {
    errorMessages: { message: string }[];
    message: string;
  };
};

const Login = () => {
  const [form] = Form.useForm();

  const [loginAdmin, { isLoading }] = useLoginAdminMutation();

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("auth");
    if (storedData) {
      form.setFieldsValue(JSON.parse(storedData));
    }
  }, []);

  const onFinish = async (values: any) => {
    const res = await loginAdmin(values);    
    if(res?.data?.success){
    toast.success("Login Success");
    Cookies.set("accessToken", res?.data?.data?.accessToken);
  
    if (res?.data?.success && values?.remember) {
      localStorage.setItem("auth",JSON.stringify({email: values?.email as string, password: values?.password as string,}));
    }
    navigate("/")
    form.resetFields();
    }else{      
       toast.error(
         (res?.error as any)?.data?.message || "Login failed"
       );
    }    
  };

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
        <div className="w-full h-[600px] max-w-[650px] hidden lg:block">
          <img
            src={img}
            className="w-full h-full object-cover rounded-tl-[55px] rounded-br-[55px]"
          />
        </div>

        <div className="!pb-10 md:pt-10 md:pb-5 px-12 bg-white w-full  max-w-[650px] rounded-xl">
          <h1 className="text-black font-bold text-3xl mb-3">Login </h1>

          <Form
            form={form}
            onFinish={onFinish}
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
            <div className="flex items-center justify-between mb-5">
              <Form.Item
                style={{ marginBottom: 0 }}
                name="remember"
                valuePropName="checked"
                label={null}
              >
                <Checkbox
                  style={{ fontWeight: 600, fontSize: 16 }}
                  className="font-bold !text-md "
                >
                  Remember me
                </Checkbox>
              </Form.Item>
              <Link
                to="/forget-password"
                style={{ color: "#9A9A9C", fontWeight: 600, fontSize: 15 }}
              >
                Forgor your password?
              </Link>
            </div>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              style={{ width: "100%", height: 50, borderRadius: 20 }}
            >
              {isLoading ? "Signing..." : "Sign In"}
            </Button>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Login;
