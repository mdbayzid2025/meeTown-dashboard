import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const UserEngageChart = () => {
    const data = [
        { name: 'New', value: 62, bgColor: "#002C66" },        
        { name: 'Returning', value: 13, bgColor: "#002A6052" },
        { name: 'Inactive', value: 23, bgColor: "#EBEBEB" },
    ];

    const COLORS = ['#002C66', '#002A6052', '#EBEBEB'];

    return (
        <div className='w-[30%] bg-white rounded-xl border py-10 px-5'>
            <div className="flex  gap justify-between">
                <div className="w-1/2">
                    <p className='text-xl text-grayMedium mb-5 whitespace-nowrap font-semibold'>User Engagement</p>
                    <h1 className='text-4xl text-black font-bold'>4,209</h1>
                    <div className="flex flex-col mt-[70px]">
                        {data && data.map(item =>
                            <div className="flex items-center gap-3">
                                <span
                                    className="w-5 h-5 rounded-md"
                                    style={{ backgroundColor: item.bgColor }}
                                ></span>
                                <p className='text-lg text-[#9A9A9C] font-semibold'>{item.name}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full">
                    <ResponsiveContainer width="100%" height={260}>
                        <PieChart width={400} height={400}>
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