const User = require('../models/user');


// Get All
const getAllUsers = (filters) => {
  return User.find(filters);
};

// Get By ID
const getById = (id) => {
  return User.findById(id);
};

// Create
const addUser = (obj) => {
  const userAdd = new User(obj);
  return userAdd.save();
};

// Update
const updateUser = (id, obj) => {
  return User.findByIdAndUpdate(id, obj);
};

// Delete
const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  getById,
  addUser,
  updateUser,
  deleteUser,
};
