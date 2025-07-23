import { FaRegUser } from 'react-icons/fa6'

const Statics = () => {
    const staticsData = [
        {
            name: "Total Users",
            icon: <FaRegUser size={24}/>,
            total: "5000+"
        },
        {
            name: "Active Users",
            icon: <FaRegUser size={24}/>,
            total: "3000+"
        },
        {
            name: "Total Users",
            icon: <FaRegUser size={24}/>,
            total: "$600.50K"
        },
        {
            name: "Total Subscription",
            icon: <FaRegUser size={24}/>,
            total: "865+"
        },
    ]
  return (
    <div className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 lg:gap-y-0 gap-x-14 '>
        {
            staticsData && staticsData.map(item=>
                <div className="bg-[#EBEBEB] px-5 py-5 rounded-lg">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-full text-white">
                        {item.icon}
                    </div>
                    <div className="">
                        <h1 className='font-bold text-3xl mb-2'>{item.total}</h1>
                        <p className='text-lg font-semibold text-grayMedium'>{item.name}</p>
                    </div>
                </div>
                </div>
            )
        }
    </div>
  )
}

export default Statics