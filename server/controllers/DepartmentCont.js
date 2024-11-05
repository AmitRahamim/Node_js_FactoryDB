// DepartmentCont.js
const express = require('express');
const departmentService = require('../services/DepartmentService');
const authenticate = require('../middlewares/authenticate'); // ייבוא של middleware האימות
const limitActions = require('../middlewares/limitActions'); // ייבוא של limitActions
const router = express.Router();

// Entry point: http://localhost:3000/Department

// Get all departments - לא צריך limitActions
router.get('/', async (req, res) => {
    try {
        const departments = await departmentService.getAllDepartments();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get department by ID - נחשב כפעולה יומית
router.get('/:id', authenticate, limitActions, async (req, res) => {
    try {
        const { id } = req.params;
        const department = await departmentService.getById(id);
        res.json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new department - נחשב כפעולה יומית
router.post('/', authenticate, limitActions, async (req, res) => {
    try {
        const departmentData = req.body;
        const result = await departmentService.addDepartment(departmentData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update department - נחשב כפעולה יומית
router.put('/:id', authenticate, limitActions, async (req, res) => {
    try {
        const { id } = req.params;
        const departmentData = req.body;
        const result = await departmentService.updateDepartment(id, departmentData);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete department - נחשב כפעולה יומית
router.delete('/:id', authenticate, limitActions, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await departmentService.deleteDepartment(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
