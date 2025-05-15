const express = require('express')
const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel,
} = require('../controllers/expense.controller')
const { protect } = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/add', protect, addExpense)
router.get('/get', protect, getAllExpense)
router.delete('/:id', protect, deleteExpense)
router.get('/downloadexcel', protect, downloadExpenseExcel)

module.exports = router