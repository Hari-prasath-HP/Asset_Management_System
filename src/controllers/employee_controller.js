const employeeRepo = require('../repositories/employee_repository');

// Render employee list
const renderEmployeeList = async (req, res) => {
  const employees = await employeeRepo.getAllEmployees();
  res.render('employees/list', { employees });
};

// Render add employee page
const renderAddEmployee = (req, res) => {
  res.render('employees/add');
};

// Handle add employee
const addEmployee = async (req, res) => {
  await employeeRepo.createEmployee(req.body);
  res.redirect('/employees');
};


module.exports = {
    renderEmployeeList,
    renderAddEmployee,
    addEmployee
}