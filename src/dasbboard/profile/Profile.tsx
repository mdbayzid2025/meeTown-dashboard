import {
  Button,
  Card,
  DatePicker,
  Form,
  Image,
  Input,
  Select,
  Upload,
  type DatePickerProps,
  type UploadFile,
  type UploadProps,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ImSpinner10, ImSpinner9 } from "react-icons/im";
import { toast } from "react-toastify";

import { imageUrl } from "../../redux/base/baseAPI";
import {
  useEditProfileMutation,
  useGetProfileQuery,
} from "../../redux/features/user/userApi";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload";

const { Option } = Select;

const Profile = () => {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageFile, setImageFile] = useState<RcFile | null>(null); // for sending to API
  const [imgURL, setImgURL] = useState<string | null>(null); // for preview

  const { data: profileData, isLoading, refetch } = useGetProfileQuery(undefined);
  const [editProfile, { isLoading: editing }] = useEditProfileMutation();

  // Pre-fill form with profile data
  useEffect(() => {
    if (profileData) {
      form.setFieldsValue({
        name: profileData?.name || "",
        email: profileData?.email || "",
        gender: profileData?.gender || "Male",
        location: profileData?.location || "",
        phone: profileData?.phone || "",
        birthday: dayjs(profileData?.birthday) || "",
      });
    }
  }, [profileData, form]);

  // Handles profile form submission (without image upload)
  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("name", values?.name);
      formData.append("email", values?.email);
      formData.append("gender", values?.gender);
      formData.append("location", values?.location);
      formData.append("phone", values?.phone);
      formData.append("birthday", values?.birthday);

      const res = await editProfile(formData);
      if (res?.data){
         toast.success("Profile Updated")
        refetch()
        };
    } catch (error) {
      console.log("profile error", error);
    }
  };

  // Optional - handle date change
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const props: UploadProps = {
    beforeUpload: (file) => {
      setImageFile(file as RcFile); // store actual file for upload
      setFileList([
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: URL.createObjectURL(file),
        },
      ]);
      setImgURL(URL.createObjectURL(file));
      return false; // prevent auto-upload
    },
    onRemove: () => {
      setImageFile(null);
      setFileList([]);
      setImgURL(null);
    },
    fileList,
    maxCount: 1,
    accept: "image/*",
    listType: "picture",
  };

  const handleImageUpload = async () => {
    if (!imageFile) return toast.error("No file selected");

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await editProfile(formData);
      if (res?.data) {
        toast.success("Profile image updated");
        setImageFile(null);
        setFileList([]);
        setImgURL(null);
        refetch()
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  return (
    <div className="h-full">
      <h3 className="text-xl font-semibold text-grayMedium mb-6 md:mb-0 md:p-6">
        Profile Page
      </h3>

      {isLoading && !profileData ? (
        <div className="flex items-center justify-center min-h-[60vh]">  
          <ImSpinner10 size={40} color="#002c66" className="animate-spin-slow" />          
        </div>
      ) : (
        <div className=" mx-auto grid grid-cols-1 items-start md:grid-cols-3 gap-8  justify-center md:pl-6 md:pb-3">
          {/* ------------------ Profile Picture Card ------------------ */}
          <Card
            className="w-full shadow-md rounded-xl md:col-span-1"
            title="Profile Photo"
          >
            <div className="flex flex-col justify-center items-center gap-4">
              {/* Show current image or preview */}
              <Image
                alt="Profile"
                src={
                  imgURL
                    ? imgURL
                    : profileData?.image?.startsWith("http")
                    ? profileData.image
                    : profileData?.image
                    ? `${imageUrl}${profileData.image}`
                    : "/placeholder.png"
                }
                className="object-cover rounded-xl min-h-[300px] max-h-[300px]"
                preview={false}
              />

              <input
                id="image-upload"
                type="file"
                hidden
                accept="image/*"
                // hidden
                // className="invisible"
                onChange={(e: any) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImageFile(file);
                    setImgURL(URL.createObjectURL(file));
                  }
                }}
              />
              <div className="w-full text-start">
                <Upload {...props}>
                  <Button icon={<UploadOutlined />} size="large">
                    Change Photo
                  </Button>
                </Upload>

                {/* Save new image button (only shows after selecting new image) */}
                {imgURL && imageFile && (
                  <Button
                    type="primary"
                    size="large"
                    loading={editing}
                    onClick={handleImageUpload}
                    className="mt-3"
                  >
                    {editing ? (
                      <ImSpinner9 size={15} className="animate-spin mr-1" />
                    ) : null}
                    Save New Photo
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* ------------------ Profile Form ------------------ */}
          <div className="md:col-span-2 bg-white p-6 shadow-md rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

            <Form layout="vertical" form={form} onFinish={onFinish}>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-x-4">
                <FormItem
                  name="name"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                >
                  <Input placeholder="John Doe" style={{ height: 42 }} />
                </FormItem>

                <FormItem
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                  ]}
                >
                  <Input
                    disabled
                    placeholder="john@example.com"
                    style={{ height: 42 }}
                  />
                </FormItem>

                <FormItem
                  name="phone"
                  label="Phone"
                  rules={[
                    { required: true, message: "Please enter your phone" },
                  ]}
                >
                  <Input placeholder="Enter Phone" style={{ height: 42 }} />
                </FormItem>

                <FormItem
                  name="gender"
                  label="Gender"
                  rules={[
                    { required: true, message: "Please select your gender" },
                  ]}
                >
                  <Select placeholder="Select Gender" style={{ height: 42 }}>
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </FormItem>

                <FormItem
                  name="location"
                  label="Country"
                  rules={[
                    { required: true, message: "Please enter your country" },
                  ]}
                >
                  <Input placeholder="Enter Country" style={{ height: 42 }} />
                </FormItem>

                <FormItem
                  name="birthday"
                  label="Birthday"
                  rules={[{ required: true, message: "Enter Birthday" }]}
                >
                  <DatePicker
                    style={{ width: "100%", height: 42 }}
                    name="birthday"
                    onChange={onChange}
                  />
                </FormItem>
              </div>

              <div className="">
                <Button type="primary" size="large" htmlType="submit">
                  {editing && <ImSpinner9 size={15} className="animate-spin" />}{" "}
                  Save Changes
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
