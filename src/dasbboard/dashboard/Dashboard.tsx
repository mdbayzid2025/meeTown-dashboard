import { useGetOverViewQuery } from '../../redux/features/dashboard/dashboardApi'
import CustomerAcquisition from './CustomerAcquisition'
import PurchasingChart from './PurchasingChart'
import Statics from './Statics'
import UserEngageChart from './UserEngageChart'

const Dashboard = () => {
  const { data: staticsOverview } = useGetOverViewQuery(undefined);
  return (
    <div>
      <Statics staticsOverview={staticsOverview}/>
      <div className="my-6 flex flex-col md:flex-row items-center justify-between gap-5 2xl:gap-10">
        <CustomerAcquisition />
        <UserEngageChart staticsOverview={staticsOverview}/>
      </div>
      <PurchasingChart />
    </div>
  )
}

export default Dashboard