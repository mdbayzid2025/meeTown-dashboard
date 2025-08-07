import { Select } from "antd";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetRevenueGrowthQuery } from "../../redux/features/dashboard/dashboardApi";

const { Option } = Select;

const PurchasingChart = () => {
  const { data: revenueData } = useGetRevenueGrowthQuery(undefined);

  const purchasingData = [
    { name: "Jan", total: 800 },
    { name: "Feb", total: 1200 },
    { name: "Mar", total: 2300 },
    { name: "Apr", total: 1800 },
    { name: "May", total: 2700 },
    { name: "Jun", total: 3300 },
    { name: "Jul", total: 2900 },
    { name: "Aug", total: 4100 },
    { name: "Sep", total: 3700 },
    { name: "Oct", total: 4500 },
    { name: "Nov", total: 4800 },
    { name: "Dec", total: 5000 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    const isVisible = active && payload && payload.length;

    return (
      <div
        className="custom-tooltip w-[100px]"
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        {isVisible && (
          <div className="w-full py-3 pl-2 text-start bg-[#002C66]/80 rounded-xl">
            <p className="text-white whitespace-nowrap font-semibold">
              {label}
            </p>
            <p className="text-white whitespace-nowrap">{`New User : ${payload[0].value}`}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="">
      <div className="flex items-center justify-between gap-8 mb-3">
        <div className="">
          <p className="text-xl">Monthly Revenue Growth</p>
        </div>
        <Select        
          defaultValue="2022"
          style={{ background: "transparent", outline: "none", width: 150 }}
        >
          <Option value="2022">2022</Option>
          <Option value="2023">2023</Option>
          <Option value="2024">2024</Option>
          <Option value="2025">2025</Option>
        </Select>
      </div>
      <div className="bg-white p-5 rounded-xl">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart
            data={revenueData}
            margin={{ left: 0, top: 20, right: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="30%" stopColor="#002C66" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#002C66" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              stroke="none" // Hide axis line
              axisLine={false} // Hide bottom border line
              tickLine={false} // Hide small ticks
              tick={{ fill: "#888", fontSize: 12 }} // 👈 This ensures labels are visible
            />
            <YAxis axisLine={false} tickLine={false} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip wrapperStyle={{ width: 100 }} content={CustomTooltip} />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#002C66"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PurchasingChart;
