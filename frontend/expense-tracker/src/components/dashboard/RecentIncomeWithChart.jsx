import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ['#875CF5', '#4CAF50', '#FF6900', '#4f39f6']

const RecentIncomeWithChart = ({ data, totalIncome }) => {

    const [chartData, setChartData] = useState([])

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount,
        }))

        setChartData(dataArr)
    }

    useEffect(() => {
        prepareChartData()

        return () => { }
    }, [data])

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className=' text-lg'>Renda Ultimos 60 Dias</h5>
            </div>

            <CustomPieChart
                data={chartData}
                label='Renda Total'
                totalAmount={`$${totalIncome}`}
                showTextAnchor
                colors={COLORS}
            />
        </div>
    )
}

export default RecentIncomeWithChart