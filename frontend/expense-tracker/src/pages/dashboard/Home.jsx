import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axios.instance'
import { API_PATHS } from '../../utils/apiPaths'
import InfoCard from '../../components/cards/InfoCard'

import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
import { IoMdCard } from 'react-icons/io'
import { addThousandsSeparator } from '../../utils/helper'
import RecentTransactions from '../../components/dashboard/RecentTransactions'
import FinanceOverview from '../../components/dashboard/FinanceOverview'
import ExpenseTransactions from './ExpenseTransactions'
import Last30DaysExpenses from './Last30DaysExpenses'
import RecentIncomeWithChart from '../../components/dashboard/RecentIncomeWithChart'
import RecentIncome from '../../components/dashboard/RecentIncome'

const Home = () => {
  useUserAuth()

  const navigate = useNavigate()

  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchDashboardData = async () => {
    if (loading) return

    setLoading(true)

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      )

      if (response.data) {
        setDashboardData(response.data)
      }
    } catch (error) {
      console.log('Alguma coisa deu errado. Tente novamente mais tarde', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
    return () => { }
  }, [])


  return (
    <DashboardLayout activeMenu='Dashboard'>
      <div className='my-5 mx-auto'>
        <div className=' grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard />}
            label='Saldo Total'
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color='bg-primary'
          />

          <InfoCard
            icon={<LuHandCoins />}
            label='Renda Total'
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color='bg-green-500'
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label='Gastos Totais'
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            color='bg-red-500'
          />
        </div>

        <div className=' grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate('/recent')}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpenses={dashboardData?.totalExpenses || 0}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate('/expense')}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate('/income')}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home