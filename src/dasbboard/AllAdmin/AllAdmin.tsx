import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { FiLock, FiUnlock } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { SlEye } from "react-icons/sl";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";

import {
  useCreateAdminMutation,
  useGetAdminQuery,
  useUpdateStatusMutation,
} from "../../redux/features/user/userApi";
import { getSearchParams } from "../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../utils/updateSearchParams";
import AddAdmin from "./AddAdmin";
import AdminDetailsModal from "./AdminDetailsModal";
import { imageUrl } from "../../redux/base/baseAPI";

const AllAdmin = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);

  const { status, searchTerm, page } = getSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const [form] = Form.useForm();

  const { data: adminData, isLoading, refetch } = useGetAdminQuery(undefined);
  const [createAdmin] = useCreateAdminMutation(undefined);
  const [updateStatus] = useUpdateStatusMutation();

  // --------------- Action  -------------------
  useEffect(() => {
    updateSearchParams({ role: "ADMIN", page: currentPage });
  }, [currentPage]);

  useEffect(() => {
    refetch();
  }, [, searchTerm, page, status]);

  // ------------------ Table Column  ----------------------

   const pageSize = adminData?.pagination?.limit ?? 10;
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
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                objectFit: "cover",
              }}
              src={
                record?.image && record?.image.startsWith("http")
                  ? record?.image
                  : record?.image
                  ? `${imageUrl}${record?.image}`
                  : "/placeholder.png"
              }
            />
          </div>

          <h4 className="whitespace-nowrap">{record?.name}</h4>
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Designation",
      dataIndex: "role",
      key: "role",
      render: (_: any, record: any) => (
        <p className="whitespace-nowrap text-nowrap">{record?.role}</p>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <div className="flex items-center gap-2 ">
          <p
            className={`w-[100px] capitalize ${
              status == "Active" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <div className="flex items-center gap-3">
          <div
            className="cursor-pointer"
            onClick={() => {
              setSelectedUser(record);
              setDetailsOpen(true);
            }}
          >
            <SlEye size={16} />
          </div>
          <button onClick={() => handleUpdateStatus(record?._id)}>
            {record?.status == "Active" ? (
              <FiUnlock size={16} className="text-green-600 cursor-pointer" />
            ) : (
              <FiLock size={16} className="text-red-600 cursor-pointer" />
            )}
          </button>
        </div>
      ),
    },
  ];

  // ------------------------ Action --------------------------
  // const searchInput = Form.useWatch("search", form);

  const handleChange = (value: string) => {
    updateSearchParams({ status: value });
  };

  const handleSearch = debounce((value: any) => {
    // fetch data
    updateSearchParams({ searchTerm: value });
  }, 300);

  const handleSubmit = async (values: any) => {
    const { confirmPassword, ...restData } = values;

    try {
      const res = await createAdmin(restData);
      if (res?.data) {
        toast.success("Profile image updated");
        refetch();
        setOpen(!open);
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  const handleUpdateStatus = async (id: any) => {
    try {
      const res = await updateStatus(id);
      setDetailsOpen(false); // If Open details modal shoud
      if (res?.data) {
        toast.success("Update Status");
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Status Upload failed");
    }
  };

  return (
    <div className="md:p-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-grayMedium ">Manage Admin</h3>
      </div>

      <div className="flex items-center justify-between md:flex-row flex-col">
        <div className="w-full md:w-1/3 mt-3 md:mt-0 pt-0">
          <Form form={form}>
            <FormItem name="search">
              <Input
                name="search"
                onChange={(e) => handleSearch(e.target.value)}
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
          <Select
            placeholder="Status"
            allowClear
            style={{ width: 120, height: 42 }}
            onChange={handleChange}
            options={[
              { value: "Active", label: "Active" },
              { value: "Blocked", label: "Blocked" },
            ]}
          />

          <Button
            onClick={() => setOpen(!open)}
            type="primary"
            size="large"
            icon={<PlusCircleOutlined style={{ fontSize: 20 }} />}
            iconPosition="end"
          >
            Add Admin
          </Button>
        </div>
      </div>

      <Table
        columns={userColumns}
        dataSource={adminData?.users}
        loading={isLoading}
        pagination={{
          total: adminData?.pagination?.total,
          current: currentPage,
          pageSize,
          onChange: (page) => setCurrentPage(page),
        }}
        rowKey="_id"
        scroll={{ x: "max-content" }}
        className={` subscriptionTable`}
      />
      <AdminDetailsModal
        open={detailsOpen}
        setOpen={setDetailsOpen}
        data={selectedUser}
        onStatusChange={handleUpdateStatus}
        refetch={refetch}
      />
      <AddAdmin open={open} setOpen={setOpen} onSubmit={handleSubmit} />
    </div>
  );
};

export default AllAdmin;
