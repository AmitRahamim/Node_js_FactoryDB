const userRepo = require('../repositories/UserRepo');
const moment = require('moment');

const getAllUsers = (filters) => {
  return userRepo.getAllUsers(filters);
};

const getById = (id) => {
  return userRepo.getById(id);
};

const addUser = (obj) => {
  return userRepo.addUser(obj);
};

const updateUser = (id, obj) => {
  return userRepo.updateUser(id, obj);
};

const deleteUser = (id) => {
  return userRepo.deleteUser(id);
};

// UserService.js


// בדיקת כמות הפעולות היומית ועדכון הפעולות אם מדובר ביום חדש
const getCurrentActionsToday = async (userId) => {
    const user = await userRepo.getById(userId);
    const today = moment().startOf('day');


    // אם lastActionDate ריק (null) או שהתאריך אינו היום הנוכחי
    if (!user.lastActionDate || !moment(user.lastActionDate).isSame(today, 'day')) {
        console.log('Resetting NumOfActionsLeft to NumOfActions');
        user.NumOfActionsLeft = user.NumOfActions; // איפוס כמות הפעולות היומית
        user.lastActionDate = new Date(); // הגדרת lastActionDate לתאריך הנוכחי
        await user.save(); // שמירת השינויים במסד הנתונים
    }

    console.log(`NumOfActionsLeft after reset: ${user.NumOfActionsLeft}`);
    return user.NumOfActionsLeft;
};
// פונקציה שבודקת אם ניתן לבצע פעולה והפחתה במקרה של פעולה
const checkAndDecrementActions = async (userId) => {
    const actionsLeft = await getCurrentActionsToday(userId);
    if (actionsLeft <= 0) {
        throw new Error('User has reached the daily action limit');
    }
    await decrementActionCount(userId);
};

// הפחתת כמות הפעולות היומית
const decrementActionCount = async (userId) => {
    const user = await userRepo.getById(userId);
    if (user.NumOfActionsLeft > 0) {
        user.NumOfActionsLeft -= 1;
        user.lastActionDate = new Date();
        await user.save();
    }
};

// פונקציה שבודקת אם ניתן להתחבר למערכת
const canUserLogin = async (userId) => {
    const user = await userRepo.getById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const actionsLeft = await getCurrentActionsToday(userId);
    return actionsLeft > 0;
};

module.exports = {
  getAllUsers,
  getById,
  addUser,
  updateUser,
  deleteUser,
  getCurrentActionsToday,
    decrementActionCount,
    checkAndDecrementActions,
    canUserLogin
};
