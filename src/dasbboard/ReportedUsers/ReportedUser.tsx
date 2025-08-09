import { Form, Input, Table, Tag } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { SlEye } from "react-icons/sl";
import ReportViewModal from "./ReportViewModal";
import { useGetReportsQuery } from "../../redux/features/reports/reportsApi";
import { imageUrl } from "../../redux/base/baseAPI";
import dayjs from "dayjs";
import { getSearchParams } from "../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../utils/updateSearchParams";
// Assuming the details modal is generic enough to be reused.
// import UserDetailsModal from "./AdminDetailsModal";

const ReportedUsers = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const {
    data: reportedData,
    isLoading,
    refetch,
  } = useGetReportsQuery(undefined);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const { status, searchTerm, location, page } = getSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  
  // --------------- Action  -------------------
  useEffect(() => {
    refetch();
  }, [status, searchTerm, location, page]);

  useEffect(() => {
    updateSearchParams({ page: currentPage });
  }, [currentPage]);

  // const menu = <Menu items={items} />;

  const pageSize = reportedData?.pagination?.limit ?? 10;

  const reportedUserColumns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
      render: (_: string, __: any, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
      width: 80,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user: { name: string; image: string }) => (
        <div className="flex items-center gap-3">
          <img
            style={{
              height: 40,
              width: 40,
              borderRadius: 50,
              objectFit: "cover",
            }}
            src={
              user?.image && user?.image.startsWith("http")
                ? user?.image
                : user?.image
                ? `${imageUrl}${user?.image}`
                : "/placeholder.png"
            }
            alt={user?.name}
          />
          <h4 className="whitespace-nowrap font-medium">{user?.name}</h4>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "user",
      key: "user",
      render: (user: { email: string }) => (
        <div className="flex items-center gap-3">
          <p className="whitespace-nowrap font-medium">{user?.email}</p>
        </div>
      ),
    },
    {
      title: "Report Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => {
        return <span>{dayjs(date).format("DD/MM/YYYY")}</span>;
      },
    },
    {
      title: "User Status",
      dataIndex: "user",
      key: "user",
      render: (user: { status: string; isDeleted: boolean }) => {
        let color = "default";
        if (user.status === "Blocked") color = "orange";
        else if (user.isDeleted) color = "red";
        else {
          color = "green";
        }

        return (
          <Tag color={color}>{user.isDeleted ? "Deleted" : user?.status}</Tag>
        );
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <div className="flex items-center gap-2 ">
          <p
            className={`w-[100px] capitalize font-semibold 
                ${
                  status == "Resolved"
                    ? "text-green-600"
                    : status == "Pending"
                    ? "text-[#D97706]"
                    : "text-gray-400"
                }`}
          >
            {status}
          </p>
        </div>
      ),
    },
    {
      title: "Reported By",
      dataIndex: "reporter",
      key: "reporter",
      render: (reporter: { name: string; image: string }) => (
        <div className="flex items-center gap-3">
          <img
            style={{
              height: 40,
              width: 40,
              borderRadius: 50,
              objectFit: "cover",
            }}
            src={
              reporter?.image && reporter?.image.startsWith("http")
                ? reporter?.image
                : reporter?.image
                ? `${imageUrl}${reporter?.image}`
                : "/placeholder.png"
            }
            alt={reporter?.image}
          />
          <h4 className="whitespace-nowrap font-medium">{reporter?.name}</h4>
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
          <SlEye size={20} className="text-gray-600" />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-grayMedium">
          Reported Users
        </h3>
      </div>

      <div className="mb-4 hidden">
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
      </div>

      <Table
        className="subscriptionTable"
        columns={reportedUserColumns}
        dataSource={reportedData?.reports}
        loading={isLoading}
        scroll={{ x: "max-content" }}
        pagination={{
          total: reportedData?.pagination?.total,
          current: currentPage,
          pageSize,
          onChange: (page) => setCurrentPage(page),
        }}
        rowKey="key"
      />

      <ReportViewModal
        open={detailsOpen}
        setOpen={setDetailsOpen}
        data={selectedUser}
        refetch={refetch}
      />
    </div>
  );
};

export default ReportedUsers;
