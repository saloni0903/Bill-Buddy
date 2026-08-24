const express = require('express');
const router = express.Router();
const { createSub, getDashboard, toggleSub } = require('../controllers/subController');

router.post('/', createSub);
router.get('/dashboard', getDashboard);
router.patch('/:id/toggle', toggleSub);

module.exports = router;
