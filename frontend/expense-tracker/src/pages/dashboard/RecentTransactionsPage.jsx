import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axios.instance'
import { API_PATHS } from '../../utils/apiPaths'
import moment from 'moment'
import TransactionInfoCard from '../../components/cards/TransactionInfoCard'
import { LuFilter } from 'react-icons/lu'
import { useUserAuth } from '../../hooks/useUserAuth'

const RecentTransactionsPage = () => {
  useUserAuth()

  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all') 
  const [timeRange, setTimeRange] = useState('30') 

  const fetchTransactions = async () => {
    setLoading(true)
    try {
      const [incomes, expenses] = await Promise.all([
        axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME),
        axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE)
      ])

      const processedIncomes = incomes.data.map(item => ({
        ...item,
        type: 'income',
        category: 'Renda',
        source: item.source
      }))

      const processedExpenses = expenses.data.map(item => ({
        ...item,
        type: 'expense',
        source: 'Gasto',
        category: item.category
      }))

      const allTransactions = [...processedIncomes, ...processedExpenses]
        .sort((a, b) => new Date(b.date) - new Date(a.date))

      setTransactions(allTransactions)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'income') return transaction.type === 'income'
    if (filter === 'expense') return transaction.type === 'expense'
    return true
  }).filter(transaction => {
    const days = parseInt(timeRange)
    return moment(transaction.date).isAfter(moment().subtract(days, 'days'))
  })

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <DashboardLayout activeMenu='Transações'>
      <div className="my-5 mx-auto max-w-4xl">
        <div className="card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-semibold">Transações Recentes</h1>
            
            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="appearance-none bg-white pl-3 pr-8 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:outline-none"
                >
                  <option value="all">Todos</option>
                  <option value="income">Rendas</option>
                  <option value="expense">Gastos</option>
                </select>
                <LuFilter className="absolute right-3 top-3 text-gray-400" />
              </div>
              
              <div className="relative">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="appearance-none bg-white pl-3 pr-8 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:outline-none"
                >
                  <option value="7">Últimos 7 dias</option>
                  <option value="30">Últimos 30 dias</option>
                  <option value="90">Últimos 3 meses</option>
                </select>
                <LuFilter className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Nenhuma transação encontrada
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <TransactionInfoCard
                  key={`${transaction.type}-${transaction._id}`}
                  title={transaction.type === 'income' ? transaction.source : transaction.category}
                  icon={transaction.icon}
                  date={moment(transaction.date).format('Do MMM YYYY')}
                  amount={transaction.amount}
                  type={transaction.type === 'income' ? 'renda' : 'gasto'}
                  hideDeleteBtn
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default RecentTransactionsPage