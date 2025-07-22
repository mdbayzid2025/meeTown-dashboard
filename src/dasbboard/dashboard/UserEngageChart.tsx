import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const UserEngageChart = () => {
    const data = [
        { name: 'Active', value: 53, bgColor: "#002C66", total: 105 },
        { name: 'Inactive', value: 47, bgColor: "#002A6052", total: 80 },
    ];

    const COLORS = ['#002C66', '#002A6052',];


    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, index,
    } : any) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) / 2;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"               
                fontSize={14}
                fontWeight={600}
            >
                {`${data[index].value}%`}
            </text>
        );
    };


    return (
        <div className='w-full md:w-2/5 2xl:w-[30%] bg-white rounded-xl border-2 border-gray py-6 px-5'>
            <div className="flex justify-between items-center">
                <div className="w-1/3 xl:w-1/2 2xl:w-full">
                    <div className="mb-10">
                        <p className='text-lg lg:text-xl xl:text-3xl text-grayMedium xl:mb-5 whitespace-nowrap font-semibold'>User Engagement</p>
                        <h1 className='text-2xl xl:text-4xl text-black font-bold'>4,209</h1>
                    </div>
                    <div className="flex flex-col mt-[80px]">
                        {data && data.map(item =>
                            <div className="flex items-center gap-3">
                                <span
                                    className="w-3 xl:w-5 h-3 xl:h-5 rounded-md"
                                    style={{ backgroundColor: item.bgColor }}
                                ></span>
                                <span className='font-bold text-xl'>{item.total}</span>
                                <p className='text-md xl:text-lg text-[#9A9A9C] font-semibold'>{item.name}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="max-w-[65%] w-full pt-10">
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                innerRadius={30}
                                paddingAngle={5}
                                cornerRadius={5}
                                 labelLine={false}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default UserEngageChart