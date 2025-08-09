import { Form, Input, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

const SubscriberList = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [form] = Form.useForm();

  useEffect(() => {
    const search = searchParams.get("searchQuery");
    setSearchQuery(search || "");
  }, [searchParams]);

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
          className=""
        >
          <div className="h-[50px] w-[50px]">
            <img
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                objectFit: "cover",
              }}
              src={record?.photo}
            />
          </div>

          <h4 className="whitespace-nowrap">{record?.name}</h4>
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Contact", dataIndex: "contact", key: "contact" },
    { title: "Booking Date", dataIndex: "bookingDate", key: "bookingDate" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Package Name",
      render: (record: any) => (
        <div className="">
          {record?.duration} {record?.unit}
          {record?.duration > 1 && "s"}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <div className="flex items-center gap-2 ">
          <span
            className={`${
              status === "active" ? "text-green-500" : "text-red"
            }  text-[16px] capitalize`}
          >
            {status}
          </span>
        </div>
      ),
    },
  ];

  const filterSubscriber = subscribers.filter(
    (subscriber) =>
      subscriber?.name.toLowerCase().includes(searchQuery) ||
      subscriber?.contact.toLowerCase().includes(searchQuery)
  );
  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold text-grayMedium mb-6">
        All Subscriber’s
      </h3>
      <div className="w-full md:w-1/3 mt-3 md:mt-0 pt-0">
        <Form form={form}>
          <FormItem name="search">
            <Input
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

      {/* <Table columns={userColumns} dataSource={filterSubscriber} pagination={{ pageSize: 7, align: "center" }} className='subscriptionTable' />             */}
      <Table
        columns={userColumns}
        dataSource={filterSubscriber}
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

export const subscribers = [
  {
    key: 1,
    name: "Afsana Mimi",
    email: "afsana@example.com",
    contact: "+8801700001101",
    bookingDate: "2/12/25",
    price: 60,
    unit: "Month",
    duration: 2,
    address: "3890 Poplar Dr.",
    point: 120,
    status: "active",
    photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
];
