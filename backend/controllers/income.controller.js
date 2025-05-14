const User = require('../models/user.model')
const Income = require('../models/income.model')

exports.addIncome = async (req, res) => {
    const userId = req.user.id

    try {
        const { icon, source, amount, date } = req.body || {}

        if (!source || !amount || !date) {
            return res.status(400).json({ message: 'Todos os campos são necessários' })
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        })

        await newIncome.save()
        res.status(200).json(newIncome)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.getAllIncome = async (req, res) => {
    const userId = req.user.id

    try {
        const income = await Income.find({ userId }).sort({ date: -1 })
        res.json(income)
    } catch (error) {
        console.error('Erro em getAllIncome:', error);
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.deleteIncome = async (req, res) => {

}

exports.downloadIncomeExcel = async (req, res) => {

}

