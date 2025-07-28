import { DatePicker, Form, Input, Radio, Table, Tag } from "antd";
import FormItem from "antd/es/form/FormItem";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";

dayjs.extend(isBetween);
const { RangePicker } = DatePicker;

// --- MOCK DATA BASED ON THE PROVIDED 'Add a Trip' FORM ---
const tripsData = [
  {
    key: 1,
    travelerName: "Mimi Akter",
    destination: "Miami",
    startDate: "2025-12-15",
    endDate: "2025-12-18",
    travelMethod: "Flight",
    accommodation: "Hotel",
  },
  {
    key: 2,
    travelerName: "John Doe",
    destination: "Paris",
    startDate: "2025-07-20",
    endDate: "2025-07-28",
    travelMethod: "Flight",
    accommodation: "Airbnb",
  },
  {
    key: 3,
    travelerName: "Mimi Akter",
    destination: "Paris",
    startDate: "2025-09-05",
    endDate: "2025-09-12",
    travelMethod: "Flight",
    accommodation: "Hotel",
  },
  {
    key: 4,
    travelerName: "Lena Martins",
    destination: "Tokyo",
    startDate: "2025-07-10",
    endDate: "2025-07-25",
    travelMethod: "Flight",
    accommodation: "Hostel",
  },
  {
    key: 5,
    travelerName: "Peter Jones",
    destination: "New York",
    startDate: "2025-08-01",
    endDate: "2025-08-05",
    travelMethod: "Bus",
    accommodation: "Hotel",
  },
  {
    key: 6,
    travelerName: "Mimi Akter",
    destination: "London",
    startDate: "2025-06-15",
    endDate: "2025-06-22",
    travelMethod: "Flight",
    accommodation: "Hotel",
  },
  {
    key: 7,
    travelerName: "Sarah Lee",
    destination: "Miami",
    startDate: "2025-07-01",
    endDate: "2025-07-08",
    travelMethod: "Flight",
    accommodation: "Resort",
  },
  {
    key: 8,
    travelerName: "David Chen",
    destination: "Paris",
    startDate: "2025-10-02",
    endDate: "2025-10-10",
    travelMethod: "Train",
    accommodation: "Hotel",
  },
];



const TripHistory = () => {
  // --- STATE MANAGEMENT FOR FILTERS ---
  const [tripView, setTripView] = useState<"all" | "popular">("all");
  const [destinationQuery, ] = useState("");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null
  );
  const [form] = Form.useForm();

  // --- DERIVED STATE & CALCULATIONS using useMemo for performance ---
  const tripStats = useMemo(() => {
    const destinationCounts: { [key: string]: number } = {};
    const travelerCounts: { [key: string]: number } = {};
    const activeTravelersThisMonth = new Set<string>();

    // Using current date context: July 27, 2025
    const now = dayjs("2025-07-27");

    tripsData.forEach((trip) => {
      destinationCounts[trip.destination] =
        (destinationCounts[trip.destination] || 0) + 1;
      travelerCounts[trip.travelerName] =
        (travelerCounts[trip.travelerName] || 0) + 1;

      const tripStartDate = dayjs(trip.startDate);
      if (
        tripStartDate.year() === now.year() &&
        tripStartDate.month() === now.month()
      ) {
        activeTravelersThisMonth.add(trip.travelerName);
      }
    });

    const popularDestinations = Object.entries(destinationCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map((item) => item[0]);
    const frequentTravelers = Object.entries(travelerCounts)
      .filter(([, count]) => count > 1)
      .map(([name]) => name);

    return {
      popularDestinations,
      frequentTravelers,
      activeTravelersCount: activeTravelersThisMonth.size,
    };
  }, []);

  const filteredTrips = useMemo(() => {
    let data = [...tripsData];

    // 1. Filter by view (All vs Popular)
    if (tripView === "popular") {
      data = data.filter((trip) =>
        tripStats.popularDestinations.includes(trip.destination)
      );
    }

    // 2. Filter by destination search query
    if (destinationQuery) {
      data = data.filter((trip) =>
        trip.destination.toLowerCase().includes(destinationQuery.toLowerCase())
      );
    }

    // 3. Filter by date range
    if (dateRange) {
      const [startFilter, endFilter] = dateRange;
      data = data.filter((trip) => {
        const tripStart = dayjs(trip.startDate);
        const tripEnd = dayjs(trip.endDate);
        return tripStart.isBefore(endFilter) && tripEnd.isAfter(startFilter);
      });
    }

    return data;
  }, [tripView, destinationQuery, dateRange, tripStats.popularDestinations]);

  // --- TABLE COLUMN DEFINITIONS ---
  const tripColumns = [
    { title: "Traveler Name", dataIndex: "travelerName", key: "travelerName" },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
      sorter: (a:any, b:any) => a.destination.localeCompare(b.destination),
    },
    {
      title: "Trip Dates",
      key: "dates",
      render: (_:any, record:any) => (
        <span>{`${dayjs(record.startDate).format("MMM D, YYYY")} - ${dayjs(
          record.endDate
        ).format("MMM D, YYYY")}`}</span>
      ),
      sorter: (a:any, b:any) => dayjs(a.startDate).unix() - dayjs(b.startDate).unix(),
    },
    {
      title: "Mode of Travel",
      dataIndex: "travelMethod",
      key: "travelMethod",
      render: (method: string) => {
        let color = "blue";
        if (method === "Bus") color = "orange";
        if (method === "Train") color = "green";
        return <Tag color={color}>{method.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Accommodation",
      dataIndex: "accommodation",
      key: "accommodation",
    },
  ];

  return (
    <div className="md:p-4">
      <h3 className="text-xl font-semibold text-grayMedium md:mb-6">Trip History</h3>

      {/* --- FILTERS & ACTIONS --- */}
      <div className="mb-6   rounded-lg">
        <div className="flex md:flex-row flex-col items-center justify-between">
          {/* <Input
            style={{ height: 40 }}
            prefix={<IoSearch size={16} className="text-gray-400 mr-2" />}
            placeholder="Search by destination..."
            onChange={(e) => setDestinationQuery(e.target.value)}
            allowClear
            className="md:max-w-sm"
          /> */}
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
          <div className="flex items-center gap-3">
            <Radio.Group
              value={tripView}
              onChange={(e) => setTripView(e.target.value)}
              optionType="button"
              buttonStyle="solid"
              size="large"              
              className="whitespace-nowrap w-full"
            >
              <Radio.Button value="all">All Trips</Radio.Button>
              <Radio.Button value="popular">Popular Trips</Radio.Button>
            </Radio.Group>
            <RangePicker
              style={{ height: 40 }}
              onChange={(dates) =>
                setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)
              }
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* --- TRIPS TABLE --- */}
      <div className=" rounded-lg">
        <Table
          columns={tripColumns}
          dataSource={filteredTrips}
          scroll={{ x: "max-content" }}
          pagination={{ pageSize: 5 }}
          className="subscriptionTable"
        />
      </div>
    </div>
  );
};

export default TripHistory;
