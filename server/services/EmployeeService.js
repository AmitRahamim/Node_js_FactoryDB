const employeeRepo = require('../repositories/EmployeeRepo');

const getAllEmployees = (filters) => {
  return employeeRepo.getAllEmployees(filters);
};

const getById = (id) => {
  return employeeRepo.getById(id);
};

const addEmployee = (obj) => {
  return employeeRepo.addEmployee(obj);
};

const updateEmployee = (id, obj) => {
  return employeeRepo.updateEmployee(id, obj);
};

const deleteEmployee = (id) => {
  return employeeRepo.deleteEmployee(id);
};

module.exports = {
  getAllEmployees,
  getById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
