const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee', // Reference to the Employee model
      required: true
    }
  });

const Department = mongoose.model('department', departmentSchema);

module.exports = Department;


