const express = require('express')
const router = express.Router()

const validateGrade = require('../config/grade.validation')

const {getAllGrades, getGradeById, createGrade, updateGrade, deleteGrade} = require('../controllers/grade.controller')

const {authenticate} = require('../middleware/auth.middleware')

// Define routes for grades
router.get('/', getAllGrades)
router.get('/:id', getGradeById)
router.post('/',validateGrade,authenticate,createGrade)
router.put('/:id',validateGrade,authenticate,updateGrade)
router.delete('/:id',authenticate,deleteGrade)

module.exports = router