import CustomerAcquisition from './CustomerAcquisition'
import PurchasingChart from './PurchasingChart'
import Statics from './Statics'
import UserEngageChart from './UserEngageChart'

const Dashboard = () => {
  return (
    <div>
      <Statics />
      <div className="my-6 flex items-center justify-between gap-5 2xl:gap-10">
        <CustomerAcquisition />
        <UserEngageChart />
      </div>
      <PurchasingChart />
    </div>
  )
}

export default Dashboard