const Employee = require('../models/employee');


// Get All
const getAllEmployees = (filters) => {
  return Employee.find(filters);
};

// Get By ID
const getById = (id) => {
  return Employee.findById(id);
};

// Create
const addEmployee = (obj) => {
  const employeeAdd = new Employee(obj);
  return employeeAdd.save();
};

// Update
const updateEmployee = (id, obj) => {
  return Employee.findByIdAndUpdate(id, obj);
};

// Delete
const deleteEmployee = (id) => {
  return Employee.findByIdAndDelete(id);
};

module.exports = {
  getAllEmployees,
  getById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
