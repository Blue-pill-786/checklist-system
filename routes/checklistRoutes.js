const express = require('express');
const { evaluateChecklist } = require('../controllers/checklistController');

const router = express.Router();

// Route to display checklist dashboard
router.get('/', evaluateChecklist);

module.exports = router;
