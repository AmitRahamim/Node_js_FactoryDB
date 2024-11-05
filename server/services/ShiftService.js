const shiftRepo = require('../repositories/ShiftRepo');

const getAllShifts = (filters) => {
  return shiftRepo.getAllShifts(filters);
};

const getById = (id) => {
  return shiftRepo.getById(id);
};

const addShift = (obj) => {
  return shiftRepo.addShift(obj);
};

const updateShift = (id, obj) => {
  return shiftRepo.updateShift(id, obj);
};

const deleteShift = (id) => {
  return shiftRepo.deleteShift(id);
};

module.exports = {
  getAllShifts,
  getById,
  addShift,
  updateShift,
  deleteShift,
};
