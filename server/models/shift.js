const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    date: {
      type: Date,
      required: true
    },
    startingHour: {
      type: Number,
      required: true
    },
    endingHour: {
      type: Number,
      required: true
    },
    EmployeeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee', // Reference to the Shift model
      required: true
    }
  });

const Shift = mongoose.model('shift', shiftSchema);

module.exports = Shift;
