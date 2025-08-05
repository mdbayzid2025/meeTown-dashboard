import { Table, Tag } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { SlEye } from "react-icons/sl";
import { imageUrl } from "../../redux/base/baseAPI";
import { useGetPopularTripsQuery } from "../../redux/features/trip/tripApi";
import TripDetailsModal from "../TripHistory/TripDetailsModal";

const PopulerTrip = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const { data: tripData, isLoading } = useGetPopularTripsQuery(undefined);

  // --- TABLE COLUMN DEFINITIONS ---
  const tripColumns = [
    {
      title: "Place",
      dataIndex: "place",
      key: "place",
      render: (text: any, record: any) => (
        <div className="flex items-center gap-2">
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
              alt=""
            />
          </div>
          <span>{text}</span>
        </div>
      ),
      sorter: (a: any, b: any) => a.place.localeCompare(b.place),
    },
    {
      title: "Country Code",
      dataIndex: "countryCode",
      key: "countryCode",
    },
    {
      title: "Start Date",
      dataIndex: "startDate", // Important to bind the field from data
      key: "startDate",
      render: (date: string) => (
        <span>{dayjs(date).format("MMM D, YYYY")}</span>
      ),
      sorter: (a: any, b: any) =>
        dayjs(a.startDate).unix() - dayjs(b.startDate).unix(),
    },
   {
      title: "Start Date",
      dataIndex: "endDate", // Important to bind the field from data
      key: "endDate",
      render: (date: string) => (
        <span>{dayjs(date).format("MMM D, YYYY")}</span>
      ),
      sorter: (a: any, b: any) =>
        dayjs(a.endDate).unix() - dayjs(b.endDate).unix(),
    },

    {
      title: "Mode of Travel",
      dataIndex: "vehicle",
      key: "vehicle",
      render: (method: string) => {
        let color = "blue";
        if (method === "Bus") color = "orange";
        if (method === "Train") color = "green";
        if (method === "Airplane") color = "purple";
        return <Tag color={color}>{method.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <div className="flex items-center gap-5">
          {/* <LiaEdit
          onClick={() => {
            setEditData(record);
            setOpen(true);
          }}
          size={20}
          className="!text-primary cursor-pointer"
        /> */}
          <SlEye
            onClick={() => {
              setShowDetails(true);
              setSelectedData(record);
            }}
            size={15}
            className="cursor-pointer !text-primary"
          />
          {/* <GoTrash
          onClick={() => {
            setDeleteItem(record?._id);
            setOpenDelete(true);
          }}
          size={20}
          className="text-red-600 cursor-pointer hover:text-red-800"
        /> */}
        </div>
      ),
    },
  ];

  console.log("useGetPopularTripsQuery", tripData);

  return (
    <div className="md:p-4">
      <h3 className="text-xl font-semibold text-grayMedium md:mb-6">
        Popular Trip
      </h3>

      {/* --- TRIPS TABLE --- */}
      <div className=" rounded-lg">
        <Table
          columns={tripColumns}
          dataSource={tripData}
          loading={isLoading}
          rowKey="key"
          scroll={{ x: "max-content" }}
          pagination={false}
          className="subscriptionTable"
        />
      </div>

      <TripDetailsModal
        open={showDetails}
        setOpen={() => setShowDetails(!showDetails)}
        data={selectedData}
      />
    </div>
  );
};

export default PopulerTrip;
