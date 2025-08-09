import { Form, Input, Select, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { imageUrl } from "../../redux/base/baseAPI";
import { useGetAllSubscriberQuery } from "../../redux/features/user/userApi";
import { getSearchParams } from "../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../utils/updateSearchParams";

const SubscriberList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [form] = Form.useForm();

  const {
    data: subscribersData,
    isLoading,
    refetch,
  } = useGetAllSubscriberQuery(undefined);

  const { status, searchTerm, location, page } = getSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  useEffect(() => {
    refetch();
  }, [status, searchTerm, location, page]);

  useEffect(() => {
    updateSearchParams({ page: currentPage });
  }, [currentPage]);

  const pageSize = 10;

  const userColumns = [
    {
      title: "Sl. No",
      dataIndex: "key",
      key: "key",
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
            paddingInline: 40,
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
                record?.user?.image && record?.user?.image.startsWith("http")
                  ? record?.user?.image
                  : record?.user?.image
                  ? `${imageUrl}${record?.user?.image}`
                  : "/placeholder.png"
              }
              alt="User"
            />
          </div>

          <h4 className="whitespace-nowrap">{record?.user?.name}</h4>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_: any, record: any) => record?.user?.email,
    },
    {
      title: "Package",
      render: (record: any) => (
        <div>
          {record?.package?.tag} - {record?.package?.unit}
        </div>
      ),
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      render: (_: any, record: any) =>
        dayjs(record?.purchaseDate).format("DD MMMM, YY"),
    },
    {
      title: "Expires Date",
      dataIndex: "expiresDate",
      key: "expiresDate",
      render: (_: any, record: any) =>
        dayjs(record?.expiresDate).format("DD MMMM, YY"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_: any, record: any) => `$${record?.amount}`,
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (_: any, record: any) => record?.transactionId,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <div className="flex items-center gap-2 ">
          <span
            className={`${
              status === "Active" ? "text-green-500" : "text-red"
            }  text-[16px] capitalize`}
          >
            {status}
          </span>
        </div>
      ),
    },
  ];

    const handleChange = (value: string) => {
    updateSearchParams({ status: value });
  };
  

  return (
    <div className="p-4">
      <div className="">
        <h3 className="text-2xl font-semibold text-grayMedium mb-6">
        All Subscriber’s
      </h3>

        {/* <Select
          placeholder="Status"
          allowClear
          style={{ width: 120, height: 42 }}
          onChange={handleChange}
          options={[
            { value: "Active", label: "Active" },
            { value: "Blocked", label: "Blocked" },
          ]}
        /> */}
      </div>
      
      <div className="w-full md:w-1/3 mt-3 md:mt-0 pt-0">
        <Form form={form}>
          <FormItem name="search">
            <Input
              name="search"
              onChange={(value) => {
                updateSearchParams({ searchTerm: value.target.value });
              }}
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

      <Table
        columns={userColumns}
        dataSource={subscribersData}
        loading={isLoading}
        className="subscriptionTable"
        scroll={{ x: "max-content" }}
        pagination={{
          pageSize: 10,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </div>
  );
};

export default SubscriberList;
