import { Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const CustomerAcquisition = () => {

    const customerAcqData = [
        { name: "Jan", total: 400 },
        { name: "Feb", total: 350 },
        { name: "Mar", total: 300 },
        { name: "Apr", total: 250 },
        { name: "May", total: 300 },
        { name: "Jun", total: 50 },
        { name: "Jul", total: 40 },
        { name: "Aug", total: 150 },
        { name: "Sep", total: 300 },
        { name: "Oct", total: 300 },
        { name: "Nov", total: 150 },
        { name: "Dec", total: 350 },
    ];


    return (
        <div className='bg-white py-5  rounded-xl w-3/5 2xl:w-[70%]'>
            <p className='px-10 mb-7 font-semibold text-xl'>Overall Customer Acquisition</p>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart
                    data={customerAcqData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 10,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />                    
                    <Bar dataKey="total" barSize={20} radius={50} fill="#002C66"
                    background={{ fill: '#eee', radius: 50}} activeBar={<Rectangle fill="pink" stroke="blue" />} />                    

                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomerAcquisition