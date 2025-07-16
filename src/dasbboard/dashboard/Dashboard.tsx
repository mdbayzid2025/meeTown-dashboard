import React from 'react'
import Statics from './Statics'
import CustomerAcquisition from './CustomerAcquisition'
import UserEngageChart from './UserEngageChart'
import PurchasingChart from './PurchasingChart'

const Dashboard = () => {
  return (
    <div>
      <Statics />
      <div className="my-6 flex items-center justify-between gap-10">
        <CustomerAcquisition />
        <UserEngageChart />
      </div>
      <PurchasingChart />
    </div>
  )
}

export default Dashboard