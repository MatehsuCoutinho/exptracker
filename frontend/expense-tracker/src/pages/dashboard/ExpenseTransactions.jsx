import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../../components/cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
    return (
        <div className='card'>
            <div className=' flex items-center justify-between'>
                <h5 className='text-lg'>Gastos</h5>
                <button className='card-btn' onClick={onSeeMore}>
                    Ver Todos <LuArrowRight className='text-base' />
                </button>
            </div>

            <div className='mt-6'>
                {transactions?.slice(0, 5)?.map((expense) => (
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.date).format("Do MM YYYY")}
                        amount={expense.amount}
                        type="gasto"
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default ExpenseTransactions