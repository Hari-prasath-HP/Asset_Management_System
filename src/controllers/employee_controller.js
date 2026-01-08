const employeeRepo = require('../repositories/employee_repository');

// Render employee list page
const renderEmployeeList=async(req, res)=>{
  try {
    const employees = await employeeRepo.getAllEmployees();
    res.render('employees/list', { employees });
  } catch (error) {
    res.status(500).send('Failed to load employees');
  }
};

// Render add employee page
const renderAddEmployee=(req, res)=>{
  res.render('employees/add');
};

// Add new employee
const addEmployee=async(req, res)=>{
  try {
    await employeeRepo.createEmployee(req.body);
    res.redirect('/employees');
  } catch (error) {
    res.render('employees/add', {
      error: error.message,
      formData: req.body
    });
  }
};

// Render edit employee page
const renderEditEmployee=async(req, res)=>{
  try {
    const employee = await employeeRepo.getEmployeeById(req.params.id);
    res.render('employees/edit', { employee });
  } catch (error) {
    res.redirect('/employees');
  }
};

// Update employee
const updateEmployee=async(req, res)=>{
  try {
    const data = {
      ...req.body,
      isActive: req.body.isActive === 'true'
    };

    await employeeRepo.updateEmployee(req.params.id, data);
    res.redirect('/employees');
  } catch (error) {
    res.redirect('/employees');
  }
};

module.exports = {
  renderEmployeeList,
  renderAddEmployee,
  addEmployee,
  renderEditEmployee,
  updateEmployee
};
