import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axios.instance'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import Modal from '../../components/modal'
import toast from 'react-hot-toast'
import ExpenseList from '../../components/Expense/ExpenseList'
import DeleteAlert from '../../components/DeleteAlert'

const expense = () => {
  useUserAuth()

  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

  const fetchExpenseDetails = async () => {
    if (loading) return

    setLoading(true)

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      )

      if (response.data) {
        setExpenseData(response.data)
      }
    } catch (error) {
      console.log('Alguma coisa deu errado. Tente novamente mais tarde', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense

    if (!category.trim()) {
      toast.error('É necessário inserir um gasto')
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Quantidade deve ser um número válido')
      return
    }

    if (!date) {
      toast.error('Data é necessária')
      return
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      })

      setOpenAddExpenseModal(false)
      toast.success('Gasto adicionada com sucesso')
      fetchExpenseDetails()
    } catch (error) {
      console.error('Erro adicionando gasto', error.response?.data?.message || error.message)
    }
  }

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

      setOpenDeleteAlert({ show: false, data: null })
      toast.success('Gasto deletado com sucesso')
      fetchExpenseDetails()
    } catch (error) {
      console.error(
        'Erro deletando gasto:',
        error.response?.data?.message || error.message
      )
    }
  }

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: 'blob'
        }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'expense_details.xlsx')
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erro baixando detalhes dos gastos:', error)
      toast.error('Erro ao baixar documento.Tente novamente mais tarde.')
    }
  }

  useEffect(() => {
    fetchExpenseDetails()
    return () => { }
  }, [])


  return (
    <DashboardLayout activeMenu='Gastos'>
      <div className='my-5 mx-auto'>
        <div className=' grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>


          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id })
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title='Adicionar Gasto'
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null, })}
          title='Deletar Gasto'
        >
          <DeleteAlert
            content='Você tem certeza que deseja deletar?'
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default expense