import { Button, ConfigProvider, Divider, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useResetPasswordMutation } from '../../redux/features/auth/authApi';
import img from "/authImage.png";

const NewPassword = () => {
  const [resetPassword, {isLoading}] = useResetPasswordMutation();
  const navigate = useNavigate();

  const resetToken = Cookies.get("resetToken");

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const data = {...values, resetToken}

    console.log("sadfasdf", data)
    try {
      const res = await resetPassword(data);
      
      console.log('Response:', res);
      if(res?.data) {        
        toast.success(res?.data?.message);
        navigate("/login");
        Cookies.remove("resetToken")
      } 
    } catch (error) {
      console.log('Error:', error);
      toast.error("Something went wrong, please try again later");      
    }
    // navigate("/change-password")
  };


  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#002C66',

          colorBgContainer: '#F1F4F9',
        },
        components: {
          Input: {
            borderRadius: 8,
            colorBorder: '#9E9898',
            colorPrimaryBg: "#fff",
          },
        },
      }}
    >
      <div className='bg-[#EBEAEA] flex items-center justify-center h-screen gap-10 px-3 md:px-10'>
        <div className="w-full  max-w-[650px] hidden md:block">
          <img src={img} className='w-full h-full object-cover rounded-tl-[55px] rounded-br-[55px]' />
        </div>
        <div className="py-10 pb-5 px-5 md:px-12 bg-white w-full  max-w-[650px] rounded-xl">
          <h1 className='text-black font-bold text-2xl md:text-3xl mb-5'>Set a new password</h1>
          

          <Divider style={{ borderColor: '#EBEBEB' }} />
          <Form
            // form={form}
            onFinish={onFinish}
            layout='vertical'
            className='mt-4'
          >
            <FormItem
              label={<p className='text-black font-semibold text-lg '>Password</p>}
              name="newPassword"
              rules={[{
                required: true, message: "Enter your password",
              }]}
            >
              <Input.Password name='newPassword' style={{ height: 45, backgroundColor: "transparent" }} placeholder='Enter your password' />
            </FormItem>

            <FormItem
              label={<p className='text-black font-semibold text-lg '>Confirm Password</p>}
              name="confirmPassword"
              rules={[{
                required: true, message: "Enter Confirm password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
              ]}
              dependencies={["newPassword"]}

            >
              <Input.Password name='confirmPassword' style={{ height: 45, backgroundColor: "transparent" }} placeholder='Enter Confirm password' />
            </FormItem>

            <Button type='primary' size='large' loading={isLoading} htmlType='submit' style={{ width: "100%", height: 50, borderRadius: 20, marginTop: 15}}>Update Password</Button>
          </Form>

        </div>
      </div>
    </ConfigProvider>
  )
}

export default NewPassword;