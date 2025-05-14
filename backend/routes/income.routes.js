const express = require('express')
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require('../controllers/income.controller')
const { protect } = require('../middleware/auth.middleware')

const router = express.router()

router.post('/add', protect, addIncome)
router.get('/get', protect, getAllIncome)
router.delete('/:id', protect, deleteIncome)
router.get('/downloadexcel', protect, downloadIncomeExcel)

module.exports = router