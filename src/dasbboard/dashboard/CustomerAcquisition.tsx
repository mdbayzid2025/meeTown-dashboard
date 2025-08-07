import {
  Bar,
  BarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetUsersGrowthQuery } from "../../redux/features/dashboard/dashboardApi";

const CustomerAcquisition = () => {
  const { data } = useGetUsersGrowthQuery(undefined);

  const CustomTooltip = ({ active, payload, label } : any) => {
    const isVisible = active && payload && payload.length;
    
    return (
      <div
        className="custom-tooltip w-[100px]"
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        {isVisible && (
          <div className="w-full py-3 pl-2 text-start bg-[#002C66]/80 rounded-xl">
            <p className="text-white whitespace-nowrap font-semibold">{label}</p>
            <p className="text-white whitespace-nowrap">{`New User : ${payload[0].value}`}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white py-5  rounded-xl w-full md:w-3/5 2xl:w-[70%]">
      <p className="px-10 mb-7 font-semibold text-xl">Monthly User Growth</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            wrapperStyle={{ width: 100, }}
            content={CustomTooltip}
          />
          <Bar
            dataKey="count"
            barSize={20}
            radius={50}
            fill="#002C66"
            background={{ fill: "#eee", radius: 50 }}
            activeBar={<Rectangle fill="#002A6052" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerAcquisition;
