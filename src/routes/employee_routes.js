const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee_controller');

router.get('/', employeeController.renderEmployeeList);
router.get('/add', employeeController.renderAddEmployee);
router.post('/add', employeeController.addEmployee);

module.exports = router;
