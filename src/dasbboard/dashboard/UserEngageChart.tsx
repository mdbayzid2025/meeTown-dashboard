import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const UserEngageChart = () => {
    const data = [
        { name: 'New', value: 62, bgColor: "#002C66" },        
        { name: 'Returning', value: 13, bgColor: "#002A6052" },
        { name: 'Inactive', value: 23, bgColor: "#EBEBEB" },
    ];

    const COLORS = ['#002C66', '#002A6052', '#EBEBEB'];

    return (
        <div className='w-2/5 2xl:w-[30%] bg-white rounded-xl border py-10 px-5'>
            <div className="flex justify-between">
                <div className="w-1/3 xl:w-full">
                <div className="mb-10">
                    <p className='text-lg xl:text-3xl text-grayMedium xl:mb-5 whitespace-nowrap font-semibold'>User Engagement</p>
                    <h1 className='text-2xl xl:text-4xl text-black font-bold'>4,209</h1>
                </div>
                    <div className="flex flex-col mt-[50px]">
                        {data && data.map(item =>
                            <div className="flex items-center gap-3">
                                <span
                                    className="w-3 xl:w-5 h-3 xl:h-5 rounded-md"
                                    style={{ backgroundColor: item.bgColor }}
                                ></span>
                                <p className='text-md xl:text-lg text-[#9A9A9C] font-semibold'>{item.name}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-[65%] xl:w-full">
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                innerRadius={30}
                                paddingAngle={5}
                                cornerRadius={5}
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