import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { LiaEdit } from "react-icons/lia";
import { SlEye } from "react-icons/sl";
import {
  useAddPackageMutation,
  useDeletePackageMutation,
  useGetPackagesQuery,
  useUpdatePackageMutation,
} from "../../redux/features/packages/packageApi";
import PackageDetailsModal from "./PackageDetailsModal";
import PackageEditModal from "./PackageEditModal";
import { toast } from "react-toastify";
import DeleteItemsModal from "../../components/shared/DeleteItemsModal";
import { useUpdateSearchParams } from "../../utils/updateSearchParams";
import { getSearchParams } from "../../utils/getSearchParams";

const PackageList = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<any | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [deleteItem, setDeleteItem] = useState("");
  const [openDelete, setOpenDelete] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: packagedata,
    isLoading,
    refetch,
  } = useGetPackagesQuery(undefined);

  const [addPackage] = useAddPackageMutation();
  const [updatePackage] = useUpdatePackageMutation();
  const [deletePackage] = useDeletePackageMutation();

    const { status, searchTerm, location, page } = getSearchParams();
    const updateSearchParams = useUpdateSearchParams();

  // --------------- Action  -------------------
  useEffect(() => {
    refetch();
  }, [status, searchTerm, location, page]);

  useEffect(() => {
    updateSearchParams({page: currentPage });
  }, [currentPage]);

  // ------------------ Table Column ----------------------

  
      const pageSize = packagedata?.pagination?.limit ?? 10;

  const userColumns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (_: string, __: any, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    {
      title: "Duration",
      key: "duration",
      render: (record: any) => (
        <p className="text-primary">
          {record?.duration} {record?.unit === "Month" ? "month" : "year"}
          {record?.duration > 1 ? "s" : ""}
        </p>
      ),
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (unitPrice: number) => (
        <p className="text-primary">${unitPrice}</p>
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
      render: (discount: number) => <p className="text-primary">{discount}%</p>,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (total: number) => (
        <p className="text-primary font-semibold">${total}</p>
      ),
    },
    { title: "Tag", dataIndex: "tag", key: "tag" },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <div className="flex items-center gap-5">
          <LiaEdit
            onClick={() => {
              setEditData(record);
              setOpen(!open);
            }}
            size={20}
            className="!text-primary cursor-pointer"
          />
          <SlEye
            onClick={() => {
              setShowDetails(!showDetails);
              setSelectedData(record);
            }}
            size={15}
            className="cursor-pointer !text-primary"
          />
          <GoTrash
            onClick={() => {
              setDeleteItem(record?._id);
              setOpenDelete(true);
            }}
            size={20}
            className="text-red-600 cursor-pointer hover:text-red-800"
          />
        </div>
      ),
    },
  ];

  const handleSubmit = async (values: any) => {
    console.log("value", values);
    try {
      if (editData) {
        const res = await updatePackage({ data: values, id: editData?._id });
        if (res?.data) {
          toast.success("Package Updated");
          refetch();
          setOpen(false);
          setEditData(null);
        }
      } else {
        const res = await addPackage(values);
        if (res?.data) {
          // Optionally, you can handle the response or update the state here
          toast.success("Package added successfully");
          refetch();
          setOpen(false);
          setEditData(null);
        }
      }
    } catch (error) {
      console.log("Error adding package:", error);
    }
    setOpen(!open);
  };

  const handleDelete = async () => {
    try {
      const res = await deletePackage(deleteItem);
      if (res?.data) {
        toast.success("Package deleted successfully");
        refetch();
        setOpenDelete(false);
        setDeleteItem("");
      }
    } catch (error) {
      console.error("Error deleting package:", error);
      toast.error("Failed to delete package");
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-grayMedium ">Package List</h3>

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
        dataSource={packagedata}
        loading={isLoading}
        pagination={{
          total: packagedata?.pagination?.total,
          current: currentPage,
          pageSize,
          onChange: (page) => setCurrentPage(page),
        }}
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

      <DeleteItemsModal
        openDelete={openDelete}
        onClose={() => {
          setOpenDelete(false);
          setDeleteItem("");
        }}
        onConfirm={handleDelete}
        message="Do you want to delete this package?"
      />
    </div>
  );
};

export default PackageList;
