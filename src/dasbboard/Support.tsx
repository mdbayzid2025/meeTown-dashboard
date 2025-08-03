import { Button, ConfigProvider, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useAddSupportMutation, useGetSupportQuery } from "../redux/features/setting/settingApi";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Support = () => {
  const [form] = Form.useForm();
  const [addSupport, {isLoading }] = useAddSupportMutation();
  const {data: supportData, isLoading: isSupportLoading, refetch } = useGetSupportQuery(undefined);



  const onFinish = async (values: any) => {
    try {
        const res = await addSupport(values);
        console.log("Success:", res);
        if(res?.data){
            refetch();
            toast.success("Support information updated successfully");
            form.resetFields();
        }
    } catch (error) {
        console.log("Success:", error);
        toast.error("Failed to update support information");
    }
    
  };

    useEffect(()=>{              
    if(supportData){
       form.setFieldsValue(supportData);        
    }
  },[supportData])

  if(isSupportLoading) return <div>Loading...</div>;

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
      <div className=" flex items-center justify-center h-full w-full min-h-[60vh]">
        <div className="pt-10 pb-5 md:px-12  w-full max-w-xl  rounded-xl">
          <h1 className="text-black font-bold text-3xl mb-5 text-center">
            Help & Support
          </h1>
          <Form          
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className="mt-4"
          >
            <FormItem
              label={<p className="text-black font-semibold text-lg ">Email</p>}
              name="email"
              rules={[{ required: true, message: "Enter email here",type: "email"
              },
              ]}
            >
              <Input
                name="email"
                style={{
                  height: 45,
                  width: "100%",
                  backgroundColor: "transparent",
                }}
                placeholder="Enter your email"
              />
            </FormItem>
            <FormItem
              label={
                <p className="text-black font-semibold text-lg">Phone No</p>
              }
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Enter your phone here",
                },
              ]}
            >
              <Input
                name="phone"
                style={{ height: 45, backgroundColor: "transparent" }}
                placeholder="Enter your phone"
              />
            </FormItem>

            <Button
            loading={isLoading}
              type="primary"
              size="large"
              htmlType="submit"
              style={{
                width: "100%",
                height: 50,
                borderRadius: 20,
                marginTop: 15,
              }}
            >
              Update Support
            </Button>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Support;
