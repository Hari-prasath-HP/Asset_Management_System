const { Employee } = require('../models');

// Create new employee
const createEmployee=async(data)=>{
  try {
    const employee = await Employee.create(data);
    return employee;
  } catch (error) {
    throw error;
  }
};

// Get all employees
const getAllEmployees=async()=>{
  try {
    const employees = await Employee.findAll({
      order: [['id', 'ASC']]
    });

    return employees;
  } catch (error) {
    throw error;
  }
};

// Get only active employees
const getActiveEmployees=async()=>{
  try {
    const activeEmployees = await Employee.findAll({
      where: {
        isActive: true
      }
    });

    return activeEmployees;
  } catch (error) {
    throw error;
  }
};

// Get employee by id
const getEmployeeById=async(employeeId)=>{
  try {
    const employee = await Employee.findByPk(employeeId);
    return employee;
  } catch (error) {
    throw error;
  }
};

// Update employee details
const updateEmployee=async(employeeId,data)=>{
  try {
    const result = await Employee.update(data, {
      where: { id: employeeId }
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getActiveEmployees,
  getEmployeeById,
  updateEmployee
};
