import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axios.instance'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../components/modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import toast from 'react-hot-toast'
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'
import { useUserAuth } from '../../hooks/useUserAuth'

const Income = () => {
  useUserAuth()

  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  const fetchIncomeDetails = async () => {
    if (loading) return

    setLoading(true)

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      )

      if (response.data) {
        setIncomeData(response.data)
      }
    } catch (error) {
      console.log('Alguma coisa deu errado. Tente novamente mais tarde', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income

    if (!source.trim()) {
      toast.error('Fonte de renda é necessária')
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      })

      setOpenAddIncomeModal(false)
      toast.success('Renda adicionada com sucesso')
      fetchIncomeDetails()
    } catch (error) {
      console.error('Erro adicionando renda', error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    return () => { }
  }, [])


  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

      setOpenDeleteAlert({ show: false, data: null })
      toast.success('Renda deletada com sucesso')
      fetchIncomeDetails()
    } catch (error) {
      console.error(
        'Erro deletando renda:',
        error.response?.data?.message || error.message
      )
    }
  }

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: 'blob'
        }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'income_details.xlsx')
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erro baixando detalhes da renda:', error)
      toast.error('Erro ao baixar documento.Tente novamente mais tarde.')
    }
  }

  useEffect(() => {
    fetchIncomeDetails()

    return () => { }
  }, [])

  return (
    <DashboardLayout activeMenu='Renda'>
      <div className='my-5 mx-auto'>
        <div className=' grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id })
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title='Adicionar Renda'
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null, })}
          title='Deletar Renda'
        >
          <DeleteAlert
            content='Você tem certeza que deseja deletar?'
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income