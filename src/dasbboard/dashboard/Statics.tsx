import { FaDollarSign, FaRegUser } from "react-icons/fa6";
import { LuUserRoundCheck } from "react-icons/lu";

const Statics = ({staticsOverview}:any) => {
  

  return (
    <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 lg:gap-y-0 gap-x-14 ">
      {/* Item 1 */}
      <div className="bg-[#EBEBEB] px-5 py-5 rounded-lg">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-full text-white">
            <FaRegUser size={24} />
          </div>
          <div className="">
            <h1 className="font-bold text-3xl mb-2">Total Users</h1>
            <p className="text-lg font-semibold text-grayMedium">{staticsOverview?.totalUsers ?? 0}</p>
          </div>
        </div>
      </div>
      {/* Item 1 */}
      <div className="bg-[#EBEBEB] px-5 py-5 rounded-lg">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-full text-white">
            <FaRegUser size={24} />
          </div>
          <div className="">
            <h1 className="font-bold text-3xl mb-2">Active Users</h1>
            <p className="text-lg font-semibold text-grayMedium">{staticsOverview?.totalActiveUsers ?? 0}</p>
          </div>
        </div>
      </div>
      {/* Item 1 */}
      <div className="bg-[#EBEBEB] px-5 py-5 rounded-lg">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-full text-white">
            <FaDollarSign  size={24} />
          </div>
          <div className="">
            <h1 className="font-bold text-3xl mb-2">Total Revenue</h1>
            <p className="text-lg font-semibold text-grayMedium">$ {staticsOverview?.totalRevenue ??  0}</p>
          </div>
        </div>
      </div>
      {/* Item 1 */}
      <div className="bg-[#EBEBEB] px-5 py-5 rounded-lg">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-full text-white">
            <LuUserRoundCheck size={24} />
          </div>
          <div className="">
            <h1 className="font-bold text-3xl mb-2">Total Subscription</h1>
            <p className="text-lg font-semibold text-grayMedium">{staticsOverview?.totalSubscriptions ?? 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statics;
