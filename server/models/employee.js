const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
      },
      LastName: {
        type: String,
        required: true
      },
      StartWorkYear: {
        type: Number,
        required: true
      },
      DepartmentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department', // Reference to the Department model
        required: true
      },
      
    });

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;
