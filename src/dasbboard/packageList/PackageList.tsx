import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Table } from "antd";
import { useEffect, useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { SlEye } from "react-icons/sl";
import { useSearchParams } from "react-router-dom";
import PackageDetailsModal from "./PackageDetailsModal";
import PackageEditModal from "./PackageEditModal";
import { GoTrash } from "react-icons/go";
import FormItem from "antd/es/form/FormItem";
import { IoSearch } from "react-icons/io5";

const PackageList = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<any | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);

  const [searchParams] = useSearchParams();
  const [seachQuery, setSearchQuery] = useState("");

  const [form] = Form.useForm();

  useEffect(() => {
    const search = searchParams.get("searchQuery");
    setSearchQuery(search || "");
  }, [searchParams]);

  const userColumns = [
    { title: "Id", dataIndex: "key", key: "key" },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    {
      title: "Duration",
      render: (record: any) => (
        <p className="text-primary ">
          {record?.duration} {record?.unit == "Month" ? "month" : "year"}
          {record?.duration > 1 ? "s" : ""}
        </p>
      ),
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (unitPrice: number) => (
        <p className="text-primary ">${unitPrice}</p>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <p className="text-primary">${price}</p>,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => (
        <p className="text-primary">{discount}% </p>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "total",
      key: "total",
      render: (total: number) => (
        <p className="text-primary font-semibold">${total}</p>
      ),
    },
    { title: "Tag", dataIndex: "tag", key: "tag" },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <div className="flex items-center gap-5 ">

          <LiaEdit
            onClick={() => {
              setEditData(record);
              setOpen(!open);
            }}
          size={20} className="!text-primary cursor-pointer" />
          <SlEye
            onClick={() => {
              setShowDetails(!showDetails);
              setSelectedData(record);
            }}
            size={15}
            className="cursor-pointer !text-primary"
          />
          <GoTrash
            size={20}
            className="text-red-600 cursor-pointer hover:text-red-800"            
          />
        </div>
      ),
    },
  ];

  const filteredPackage = packageData.filter(
    (p) =>
      p.unit.toLowerCase().includes(seachQuery.toLowerCase()) ||
      p.tag.toLowerCase().includes(seachQuery.toLowerCase()) ||
      p.status.toLowerCase().includes(seachQuery.toLowerCase())
  );

  const handleSubmit = (values: any) => {
    console.log("value", values);
    setOpen(!open);
  };
  return (
    <div className="p-4">
        <h3 className="text-xl font-semibold text-grayMedium mb-3">
          Package List
        </h3>
      <div className="flex flex-col md:flex-row  items-end md:items-center justify-between mb-6">
         <div className="w-full md:w-1/3 md:mt-0 pt-5 order-2 md:order-1">          
          <Form form={form}>
            <FormItem name="search" className="!mb-0 md:mb-auto">
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

        <Button
          onClick={() => setOpen(!open)}
          type="primary"
          size="large"
          icon={<PlusCircleOutlined style={{ fontSize: 20 }} />}
          iconPosition="end"
          className="md:order-2"
        >
          Add New
        </Button>
       
      </div>

      <Table
        columns={userColumns}
        dataSource={filteredPackage}
        pagination={{ pageSize: 9 }}
        scroll={{ x: "max-content" }}
        className="subscriptionTable"
      />

      <PackageEditModal
        open={open}
        setOpen={setOpen}
        editData={editData}
        setEditData={setEditData}
        onSubmit={handleSubmit}
      />
      <PackageDetailsModal
        open={showDetails}
        setOpen={setShowDetails}
        data={selectedData}
      />
    </div>
  );
};

export default PackageList;

export const packageData = [
  {
    key: 1,
    unit: "Month",
    duration: 1,
    unitPrice: 12.5,
    price: 12.5,
    discount: 30,
    total: 50,
    tag: "Basic",
    status: "active",
  },
  {
    key: 2,
    unit: "Month",
    duration: 3,
    unitPrice: 12.5,
    price: 35.0,
    discount: 25,
    total: 46.67,
    tag: "Standard",
    status: "active",
  },
  {
    key: 3,
    unit: "Month",
    duration: 6,
    unitPrice: 12.5,
    price: 65.0,
    discount: 35,
    total: 100.0,
    tag: "Premium",
    status: "active",
  },
  {
    key: 4,
    unit: "Year",
    duration: 3,
    unitPrice: 12.5,
    price: 120.0,
    discount: 40,
    total: 200.0,
    tag: "Basic",
    status: "inactive",
  },
  {
    key: 5,
    unit: "Month",
    duration: 6,
    unitPrice: 12.5,
    price: 5.0,
    discount: 0,
    total: 5.0,
    tag: "Standart",
    status: "active",
  },
  {
    key: 6,
    unit: "Month",
    duration: 2,
    unitPrice: 12.5,
    price: 24.0,
    discount: 20,
    total: 30.0,
    tag: "Premium",
    status: "active",
  },
  {
    key: 7,
    unit: "Month",
    duration: 3,
    unitPrice: 12.5,
    price: 32.0,
    discount: 36,
    total: 50.0,
    tag: "Premium",
    status: "inactive",
  },
  {
    key: 8,
    unit: "Month",
    duration: 6,
    unitPrice: 12.5,
    price: 58.0,
    discount: 42,
    total: 100.0,
    tag: "Basic",
    status: "active",
  },
  {
    key: 9,
    unit: "Year",
    duration: 1,
    unitPrice: 12.5,
    price: 100.0,
    discount: 50,
    total: 200.0,
    tag: "Premium",
    status: "active",
  },
  {
    key: 10,
    unit: "Month",
    duration: 1,
    unitPrice: 12.5,
    price: 15.0,
    discount: 0,
    total: 15.0,
    tag: "Standard",
    status: "inactive",
  },
  {
    key: 11,
    unit: "Month",
    duration: 6,
    unitPrice: 12.5,
    price: 9.0,
    discount: 10,
    total: 10.0,
    tag: "Basic",
    status: "active",
  },
];
