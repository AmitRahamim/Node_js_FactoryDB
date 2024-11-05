const Department = require('../models/department');


// Get All
const getAllDepartments = (filters) => {
  return Department.find(filters);
};

// Get By ID
const getById = (id) => {
  return Department.findById(id);
};

// Create
const addDepartment = (obj) => {
  const departmentAdd = new Department(obj);
  return departmentAdd.save();
};

// Update
const updateDepartment = (id, obj) => {
  return Department.findByIdAndUpdate(id, obj);
};

// Delete
const deleteDepartment = (id) => {
  return Department.findByIdAndDelete(id);
};

module.exports = {
  getAllDepartments,
  getById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
