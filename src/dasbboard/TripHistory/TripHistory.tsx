import {
  DatePicker,
  Form,
  Input,
  Table,
  Tag,
  type DatePickerProps,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { SlEye } from "react-icons/sl";
import { imageUrl } from "../../redux/base/baseAPI";
import { useGetTripsQuery } from "../../redux/features/trip/tripApi";
import { getSearchParams } from "../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../utils/updateSearchParams";
import TripDetailsModal from "./TripDetailsModal";
import debounce from "lodash/debounce";
import TripsModal from "../TripsModal";


dayjs.extend(isBetween);
const TripHistory = () => {
  // --- STATE MANAGEMENT FOR FILTERS ---
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: tripData, isLoading, refetch } = useGetTripsQuery(undefined);

  const { status, searchTerm, location, page, startDate, endDate } = getSearchParams();  
  
  const updateSearchParams = useUpdateSearchParams();


    
  // --------------- Action  -------------------
  useEffect(() => {
    refetch();
  }, [status, searchTerm, location, page, startDate, endDate]);

  useEffect(() => {
    updateSearchParams({ page: currentPage });
  }, [currentPage]);

  // --- TABLE COLUMN DEFINITIONS ---
  const tripColumns = [
    {
      title: "Place",
      dataIndex: "place",
      key: "place",
      render: (text: any, record: any) => (
        <div className="flex items-center gap-2">
          <div className="h-[50px] w-[50px] hidden">
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
          <span className="font-semibold">{text}</span>
        </div>
      ),
      sorter: (a: any, b: any) => a.place.localeCompare(b.place),
    },
    {
      title: "Country",
      dataIndex: "countryCode",
      key: "countryCode",
      render: (text: string)=> <div className=""><img src={`https://flagsapi.com/${text}/flat/64.png`} className="w-10 ml-3" alt="flug" /> </div>
    },
    {
      title: "Trip Dates",
      key: "dates",
      render: (_: any, record: any) => (
        <span>{`${dayjs(record.startDate).format("MMM D, YYYY")} - ${dayjs(
          record.endDate
        ).format("MMM D, YYYY")}`}</span>
      ),
      sorter: (a: any, b: any) =>
        dayjs(a.startDate).unix() - dayjs(b.startDate).unix(),
    },
    {
      title: "Vehicle Type",
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
      title: "Match Count",
      dataIndex: "matchCount",
      key: "matchCount",
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

    const handleSearch = debounce((value: any) => {
      // fetch data
      updateSearchParams({ searchTerm: value });
    }, 300);
  


  const handleStartDate: DatePickerProps["onChange"] = (_, dateString) => {
    updateSearchParams({ startDate: dateString });
    console.log("Start Date:", dateString);
  };

  const handleEndDate: DatePickerProps["onChange"] = (_, dateString) => {
    updateSearchParams({ endDate: dateString });
  };

  return (
    <div className="md:p-4">
      <h3 className="text-2xl font-bold text-grayMedium md:mb-6">
        Trip History
      </h3>

      {/* --- FILTERS & ACTIONS --- */}
      <div className="mb-6   rounded-lg">
        <div className="flex md:flex-row flex-col items-center justify-end">
          {/* <Input
            style={{ height: 40 }}
            prefix={<IoSearch size={16} className="text-gray-400 mr-2" />}
            placeholder="Search by destination..."
            onChange={(e) => setDestinationQuery(e.target.value)}
            allowClear
            className="md:max-w-sm"
          /> */}
          <div className="w-full md:w-1/3 mt-3 md:mt-0 pt-0 hidden">
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
                  placeholder="Search by place"
                />
              </FormItem>
            </Form>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <DatePicker placeholder="Start Date" onChange={handleStartDate} className="min-w-32" />
            </div> <span className="w-4 bg-black/30 h-0.5"></span>
            <div className="flex items-center gap-3">              
              <DatePicker placeholder="End Date" onChange={handleEndDate} className="min-w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* --- TRIPS TABLE --- */}
      <div className=" rounded-lg">
        <Table
          columns={tripColumns}
          dataSource={tripData?.data}
          loading={isLoading}
          rowKey="key"
          scroll={{ x: "max-content" }}
          pagination={{
            total: tripData?.pagination?.total,
            current: currentPage,
            pageSize: tripData?.pagination?.limit,
            onChange: (page) => setCurrentPage(page),
          }}
          className="subscriptionTable"
        />
      </div>

      <TripDetailsModal
        open={showDetails}
        setOpen={() => setShowDetails(!showDetails)}
        data={selectedData}
      />

      <TripsModal  
      
      open={showDetails}
      onClose={() => setShowDetails(!showDetails)} data={selectedData}/>
    </div>
  );
};

export default TripHistory;
