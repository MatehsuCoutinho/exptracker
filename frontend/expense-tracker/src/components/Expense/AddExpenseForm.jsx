import React, { useState } from 'react'
import Input from '../inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'

const AddExpenseForm = ({ onAddExpense }) => {
    const [expense, setExpense] = useState({
        category: '',
        amount: '',
        date: '',
        icon: '',
    })

    const handleChange = (key, value) => setExpense({ ...expense, [key]: value })
    return (
        <div>

            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            <Input
                value={expense.category}
                onChange={({ target }) => handleChange('category', target.value)}
                label='Fonte do Gasto'
                placeholder='Mercado, contas, etc'
                type='text'
            />

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange('amount', target.value)}
                label='Quantia'
                placeholder='$3.000'
                type='number'
            />

            <Input
                value={expense.date}
                onChange={({ target }) => handleChange('date', target.value)}
                label='Data'
                placeholder=''
                type='date'
            />

            <div className=' flex justify-end mt-6'>
                <button
                    type='button'
                    className=' add-btn add-btn-fill'
                    onClick={() => onAddExpense(expense)}
                >
                    Adicionar Gasto
                </button>
            </div>
        </div>
    )
}

export default AddExpenseForm