// ShiftCont.js
const express = require('express');
const shiftService = require('../services/ShiftService');
const authenticate = require('../middlewares/authenticate'); // ייבוא של middleware האימות
const limitActions = require('../middlewares/limitActions'); // ייבוא של limitActions
const router = express.Router();

// Entry point: http://localhost:3000/Shift

// Get all shifts - לא צריך limitActions
router.get('/', async (req, res) => {
    try {
        const shifts = await shiftService.getAllShifts();
        res.json(shifts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get shift by ID - נחשב כפעולה יומית
router.get('/:id', authenticate, limitActions, async (req, res) => {
    try {
        const { id } = req.params;
        const shift = await shiftService.getById(id);
        res.json(shift);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new shift - נחשב כפעולה יומית
router.post('/', authenticate, limitActions, async (req, res) => {
    try {
        const shiftData = req.body;
        const result = await shiftService.addShift(shiftData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update shift - נחשב כפעולה יומית
router.put('/:id', authenticate, limitActions, async (req, res) => {
    try {
        const { id } = req.params;
        const shiftData = req.body;
        const result = await shiftService.updateShift(id, shiftData);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete shift - נחשב כפעולה יומית
router.delete('/:id', authenticate, limitActions, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await shiftService.deleteShift(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
