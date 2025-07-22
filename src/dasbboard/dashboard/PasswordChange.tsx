import { Button, ConfigProvider, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useNavigate } from 'react-router-dom';


const PasswordChange = () => {
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
      <div className=' flex items-center justify-center h-full w-full min-h-[60vh]'>
        <div className="pt-10 pb-5 md:px-12  w-full max-w-[650px] rounded-xl">
          <h1 className='text-black font-bold text-3xl mb-5 text-center'>Change Password</h1>
          <p className='font-medium text-grayMedium text-sm md:text-lg text-center px-10 mb-10 '>Enter the e-mail Associate With Your Account & Well Sent An E-mail with code To Reset Your Passport </p>
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

export default PasswordChange;