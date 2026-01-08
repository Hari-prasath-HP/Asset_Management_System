const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee_controller');

// Employee list
router.get('/', employeeController.renderEmployeeList);

// Add employee
router.get('/add', employeeController.renderAddEmployee);
router.post('/add', employeeController.addEmployee);

// Edit employee
router.get('/edit/:id', employeeController.renderEditEmployee);
router.post('/edit/:id', employeeController.updateEmployee);

module.exports = router;
