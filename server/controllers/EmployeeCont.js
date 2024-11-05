// EmployeeCont.js
const express = require('express');
const employeeService = require('../services/EmployeeService');
const limitActions = require('../middlewares/limitActions');
const authenticate = require('../middlewares/authenticate'); // ייבוא של middleware האימות
const router = express.Router();

// Entry point: http://localhost:3000/Employee

// Get All employees - לא צריך limitActions
router.get('/', async (req, res) => {
    try {
        const filters = req.query;
        const employees = await employeeService.getAllEmployees(filters);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get employee by ID - נחשב כפעולה יומית
router.get('/:id', authenticate, limitActions, async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await employeeService.getById(id);
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new employee - נחשב כפעולה יומית
router.post('/', authenticate, limitActions, async (req, res) => {
    try {
        const employeeData = req.body;
        const result = await employeeService.addEmployee(employeeData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update employee - נחשב כפעולה יומית
router.put('/:id', authenticate, limitActions, async (req, res) => {
    try {
        const { id } = req.params;
        const employeeData = req.body;
        const result = await employeeService.updateEmployee(id, employeeData);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete employee - נחשב כפעולה יומית
router.delete('/:id', authenticate, limitActions, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await employeeService.deleteEmployee(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
