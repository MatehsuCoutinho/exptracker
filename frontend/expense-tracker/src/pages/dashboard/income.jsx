import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axios.instance'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../components/modal'

const Income = () => {

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

  const handleAddIncome = async (income) => { }

  useEffect(() => {
    return () => { }
  }, [])


  const deleteIncome = async (id) => { }

  const handleDownloadIncomeDetails = async () => { }

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
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title='Adicionar Renda'
        >
          <div>Adicionar Renda</div>
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income