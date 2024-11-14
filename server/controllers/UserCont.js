const express = require('express');
const userService = require('../services/UserService');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.get('/status/:id', async (req, res) => {
  try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid user ID format" });
      }

      const user = await User.findById(id);

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Check if the user can log in
      let canLogin = false;
      
      // If the user has actions left, they can log in
      if (user.NumOfActionsLeft > 0) {
          canLogin = true;
      } else {
          // If 24 hours have passed, reset actions
          const currentDate = new Date();
          const lastActionDate = new Date(user.lastActionDate);
          if (currentDate - lastActionDate >= 24 * 60 * 60 * 1000) {
              user.NumOfActionsLeft = user.NumOfActions;  // Reset actions
              user.lastActionDate = currentDate;  // Update last action date to now
              await user.save();
              canLogin = true;
          }
      }

      res.json({ canLogin });
  } catch (error) {
      console.error("Error in /status route:", error.message);
      res.status(500).json({ message: error.message });
  }
});



// Get All users
router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const users = await userService.getAllUsers(filters);
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

// Get a user By ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

// Add a new user
router.post('/', async (req, res) => {
  try {
    const obj = req.body;
    const result = await userService.addUser(obj);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await userService.updateUser(id, obj);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

// Delete a user
router.delete('/:id/', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
