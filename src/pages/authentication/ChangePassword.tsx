import { Button, ConfigProvider, Divider, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useNavigate } from 'react-router-dom';
import img from "/authImage.png";


const ChangePassword = () => {
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    console.log('Success:', values);
    navigate("/verify-otp")
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
      <div className='bg-[#EBEAEA] flex items-center justify-center h-screen gap-10 px-10'>
        <div className="w-full h-[550px] max-w-[650px]">
          <img src={img} className='w-full h-full object-cover rounded-tl-[55px] rounded-br-[55px]' />
        </div>
        <div className="pt-10 pb-5 px-12 bg-white w-full  max-w-[650px] rounded-xl">
          <h1 className='text-black font-bold text-3xl mb-5'>Change Password</h1>
          
          <Divider style={{ borderColor: '#EBEBEB', marginBottom: 30 }} />
       

          <Form
            // form={form}
            onFinish={onFinish}
            layout='vertical'
            className='mt-4'
          >
            <FormItem
              label={<p className='text-black font-semibold text-lg '>Old Password</p>}
              name="oldPassword"
              rules={[{
                required: true, message: "Enter your old password",
              }]}
            >
              <Input.Password name='oldPassword' style={{ height: 45, backgroundColor: "transparent" }} placeholder='Enter your old password' />
            </FormItem>
            <FormItem
              label={<p className='text-black font-semibold text-lg'>New Password</p>}
              name="newPassword"
              rules={[{
                required: true, message: "Enter your new password",
              }]}
            >
              <Input.Password name='newPassword' style={{ height: 45, backgroundColor: "transparent" }} placeholder='Enter your new password' />
            </FormItem>

            <FormItem
              label={<p className='text-black font-semibold text-lg '>Confirm Password</p>}
              name="confirmPassword"
              dependencies={["newPassword"]}
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
            >
              <Input.Password name='confirmPassword' style={{ height: 45, backgroundColor: "transparent" }} placeholder='Enter Confirm password' />
            </FormItem>

            <Button type='primary' size='large' htmlType='submit' style={{ width: "100%", height: 50, borderRadius: 20, marginTop: 15}}>Update Password</Button>
          </Form>

        </div>
      </div>
    </ConfigProvider>
  )
}

export default ChangePassword;