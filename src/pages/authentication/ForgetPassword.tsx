import { Button, ConfigProvider, Divider, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../redux/features/auth/authApi";
import img from "/authImage.png";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [ForgetPassword] = useForgetPasswordMutation();

  const onFinish = async (values: any) => {
    try {
      const res = await ForgetPassword(values);

      if (res?.data) {
        Cookies.set("email", values?.email);
        toast.success(res?.data?.message);
        navigate("/verify-otp");
      }
      // console.log('Response:', res);
    } catch (error) {
      console.log("Error:", error);
      toast.error("Something went wrong, please try again later");
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
      <div className="bg-[#EBEAEA] flex items-center justify-center h-screen gap-10 px-3 md:px-10">
        <div className="w-full h-[600px] max-w-[650px]  hidden lg:block">
          <img
            src={img}
            className="w-full h-full object-cover rounded-tl-[55px] rounded-br-[55px]"
          />
        </div>
        <div className="pt-10 pb-5 px-5 md:px-12 bg-white w-full  max-w-[650px] rounded-xl">
          <h1 className="text-black font-bold text-2xl md:text-3xl mb-5">
            Reset Your Password{" "}
          </h1>
          <p className="text-grayMedium text-[13px] text-start md:text-lg whitespace-nowrap">
            Enter your phone number to reset your password
          </p>

          <Divider style={{ borderColor: "#EBEBEB" }} />
          <Form
            // form={form}
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

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              style={{
                width: "100%",
                height: 50,
                borderRadius: 20,
                marginTop: 30,
              }}
            >
              Reset Password
            </Button>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ForgetPassword;
