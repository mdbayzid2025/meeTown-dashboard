import { Button, ConfigProvider, Divider, Form } from "antd";
import { InputOTP } from "antd-input-otp";
import FormItem from "antd/es/form/FormItem";
import { useNavigate } from "react-router-dom";
import img from "/authImage.png";
import { useVerifyOTPMutation } from "../../redux/features/auth/authApi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const VerifyOTP = () => {
  const [VerifyOTP, { isLoading }] = useVerifyOTPMutation();
  const navigate = useNavigate();
  const email = Cookies.get("email");

  const onFinish = async (values: any) => {
    const otpCode = values?.otp.join("");

    try {
      const res = await VerifyOTP({ email, oneTimeCode: otpCode });
      
      if (res?.data) {
        Cookies.set("resetToken", res?.data?.data?.resetToken);      
        toast.success( res?.data?.message);       
        navigate("/new-password") 
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later");
      console.log("Error:", error);
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
        <div className="w-full  max-w-[650px] hidden md:block">
          <img
            src={img}
            className="w-full h-full object-contain rounded-tl-[55px] rounded-br-[55px]"
          />
        </div>
        <div className="py-10 pb-5 px-5 md:px-12 bg-white w-full  max-w-[650px] rounded-xl">
          <h1 className="text-black font-bold text-2xl md:text-3xl mb-5">Enter the OTP</h1>
          <p className="text-grayMedium font-medium text-sm md:text-lg">
            Please enter the 4 digit code we send to{" "}
            <span className="font-bold text-black">{email ?? ""}</span>
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
                <p className="text-black font-semibold text-lg mt-2">
                  Enter 4 digit otp code
                </p>
              }
              name="otp"
              rules={[
                {
                  required: true,
                  message: "Please enter the OTP!",
                },
              ]}
            >
              {/* This will now show dashes as placeholders */}
              <InputOTP length={4} placeholder="-" />
            </FormItem>

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={isLoading}
              disabled={isLoading}
              style={{ width: "100%", height: 50, borderRadius: 20 }}
            >
              Verify
            </Button>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default VerifyOTP;
