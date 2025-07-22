import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SubscriberList = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const search = searchParams.get("searchQuery");
    setSearchQuery(search || "");
  }, [searchParams]);

  const userColumns = [
    { title: "Sl. No", dataIndex: "key", key: "key" },

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
    { title: "Point", dataIndex: "point", key: "point" },
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
          {/* <Button icon={<IoIosArrowDown />} /> */}
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
    <div>
      <h3 className="text-xl font-semibold text-grayMedium mb-6">
        All Subscriber’s
      </h3>
      {/* <Table columns={userColumns} dataSource={filterSubscriber} pagination={{ pageSize: 7, align: "center" }} className='subscriptionTable' />             */}
      <Table
        columns={userColumns}
        dataSource={filterSubscriber}
        className="subscriptionTable"
        scroll={{ x: 'max-content' }}

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
    photo:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
];
