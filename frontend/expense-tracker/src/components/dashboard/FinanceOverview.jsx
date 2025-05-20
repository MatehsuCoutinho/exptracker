import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ['#875CF5', '#FA2C37', '#4CAF50']

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {

    const balanceData = [
        { name: 'Saldo Total', amount: totalBalance },
        { name: 'Gastos Totais', amount: totalExpenses },
        { name: 'Renda Total', amount: totalIncome },
    ]

    return <div className='card'>
        <div className=' flex items-center justify-between'>
            <h5 className=' text-lg'>Visão Geral</h5>
        </div>

        <CustomPieChart
            data={balanceData}
            label='Saldo Total'
            totalAmount={`$${totalBalance}`}
            colors={COLORS}
            showTextAnchor
        />
    </div>

}

export default FinanceOverview