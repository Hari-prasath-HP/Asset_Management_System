const { Employee } = require('../models');

// New employe record
const createEmployee = async (employeeData) => {
  return Employee.create(employeeData);
}

// Fetch all employees
const getAllEmployees = async () => {
  return Employee.findAll();
}

// Active only
const getActiveEmployees = async () => {
  return Employee.findAll({
    where: { isActive: true }
  });
}

// Primary key
const getEmployeeById = async (id) => {
  return Employee.findByPk(id);
}

module.exports = {
  createEmployee,
  getAllEmployees,
  getActiveEmployees,
  getEmployeeById
}
