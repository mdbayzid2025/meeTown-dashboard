import { Select } from 'antd';
import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';



const { Option } = Select;

const PurchasingChart = () => {
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

    return (
        <div className="">
            <div className="flex items-center gap-8 mb-6">
                <div className="">
                    <p className='text-xl'>Monthly Growth <span className='font-semibold'>35.80%</span></p>
                </div>
                <Select defaultValue="2022" style={{ background: "transparent", outline: "none" }}>
                    <Option value="2022">2022</Option>
                    <Option value="2023">2023</Option>
                    <Option value="2024">2024</Option>
                    <Option value="2025">2025</Option>
                </Select>
            </div>
            <div className='bg-white p-5 rounded-xl' >
                <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={purchasingData} margin={{ left: 10, top: 20, right: 10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="30%" stopColor="#002C66" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#002C66" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="name"
                            stroke="none"       // Hide axis line
                            axisLine={false}    // Hide bottom border line
                            tickLine={false}    // Hide small ticks
                            tick={{ fill: '#888', fontSize: 12 }} // 👈 This ensures labels are visible
                        />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="total" stroke="#002C66" fillOpacity={1} fill="url(#total)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

    )
}

export default PurchasingChart