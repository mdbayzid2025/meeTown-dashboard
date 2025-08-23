import { Button, Form, Input, Select, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { SlEye } from "react-icons/sl";

import { imageUrl } from "../../redux/base/baseAPI";
import { useGetUsersQuery } from "../../redux/features/user/userApi";
import { getSearchParams } from "../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../utils/updateSearchParams";
import NationalityFilter from "./NationalityFilter";
import UserDetailsModal from "./UserDetailsModal";

const UserList = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { status, searchTerm, location, page } = getSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  
  const [form] = Form.useForm();
  
  const { data: usersData, refetch, isLoading } = useGetUsersQuery(undefined);
  const [currentPage, setCurrentPage] = useState(1)
  

  // --------------- Action  -------------------


console.log("usersData", usersData), 

useEffect(() => {  
  updateSearchParams({ role: "USER", page:  currentPage});
}, [currentPage]);

useEffect(() => {
  refetch();
}, [status, searchTerm, location, page]);

 const pageSize = usersData?.pagination?.limit ?? 10;


  // ---------------- Table  ---------------------
  const userColumns = [
    {
      title: <span style={{ width: 50, display: "inline-block" }}>Sl. No</span>,
      dataIndex: "key",
      key: "key",
      width: 50,
      render: (_: string, __: any, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Name",
      render: (_: any, record: any) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
            paddingInline: 20,
          }}
        >
          <div className="h-[50px] w-[50px]">
            <img
              src={
                record?.image && record?.image.startsWith("http")
                  ? record?.image
                  : record?.image
                  ? `${imageUrl}${record?.image}`
                  : "/placeholder.png"
              }
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                objectFit: "cover",
              }}
            />
          </div>

          <h4 className="whitespace-nowrap">{record?.name}</h4>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_: any, record: any) => (
        <p className="whitespace-nowrap text-nowrap">{record?.email}</p>
      ),
    },
    { title: "Contact", dataIndex: "contact", key: "contact" },    
    { title: "Nationality", dataIndex: "nationality", key: "nationality" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <div className="flex items-center gap-2 ">
          <Button
            type="primary"
            danger={status !== "active"}
            className="w-[100px] capitalize"
          >
            {status}
          </Button>
        </div>
      ),
    },
    {
      title: "View",
      key: "view",
      render: (record: any) => (
        <div
          className="cursor-pointer"
          onClick={() => {
            setSelectedUser(record);
            setDetailsOpen(true);
          }}
        >
          <SlEye size={15} />
        </div>
      ),
    },
  ];

  return (
    <div className="md:p-4">
      <h3 className="text-xl font-semibold text-grayMedium mb-6">Total User</h3>

      <div className="flex items-center justify-between md:flex-row flex-col">
        <div className="w-full md:w-1/3 mt-3 md:mt-0 pt-0">
          <Form form={form}>
            <FormItem name="search">
              <Input
                onChange={(value) => {
                  updateSearchParams({ searchTerm: value.target.value });
                }}
                defaultValue={searchTerm}
                name="search"
                style={{
                  background: "#EBEBEB",
                  height: 40,
                  borderRadius: 14,
                  border: "none",
                  color: "#767676",
                  fontSize: 15,
                }}
                className="font-medium"
                prefix={<IoSearch size={16} />}
                placeholder="Search here..."
              />
            </FormItem>
          </Form>
        </div>
        <div className=" flex md:w-auto w-full items-center justify-between md:gap-3 ">
          <NationalityFilter />
          <Select
            placeholder="Status"
            defaultValue={status}
            onChange={(value) => updateSearchParams({ status: value })}
            allowClear
            style={{ width: 120, height: 42 }}
            options={[
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "Inactive" },
            ]}
          />
        </div>
      </div>

      <Table
        columns={userColumns}
        dataSource={usersData?.users}
        loading={isLoading}
        rowKey="_id"
        scroll={{ x: "max-content" }}
        className={` subscriptionTable`}
        pagination={{
          total: usersData?.pagination?.total,
          current: currentPage,
          pageSize,    
          onChange: (page) => setCurrentPage(page),     
        }}
      />
      <UserDetailsModal
        open={detailsOpen}
        setOpen={setDetailsOpen}
        data={selectedUser}
      />
    </div>
  );
};

export default UserList;


