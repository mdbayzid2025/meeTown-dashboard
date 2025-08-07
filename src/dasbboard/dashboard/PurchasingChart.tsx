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
            <p className="text-white whitespace-nowrap">{`Revenue : ${payload[0].value}`}</p>
          </div>
        )}
      </div>
    );
  };

  const year = new Date().getFullYear()
  
  
  return (
    <div className="">
      <div className="flex items-center justify-between gap-8 mb-3">
        <div className="">
          <p className="text-xl">Monthly Revenue Growth</p>
        </div>
        <Select        
          defaultValue={year}
          style={{ background: "transparent", outline: "none", width: 150 }}
        >
          <Option value={year}>{year}</Option>
          <Option value={year - 1}>{year - 1}</Option>
          <Option value={year - 2}>{year - 2}</Option>
          <Option value={year - 3}>{year - 3}</Option>
          <Option value={year - 4}>{year - 4}</Option>
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
              dataKey="amount"
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
