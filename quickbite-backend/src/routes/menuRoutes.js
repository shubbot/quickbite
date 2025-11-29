const express = require('express');
const {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');

const router = express.Router();

router.get('/', getMenuItems);
router.post('/', auth, requireRole('admin'), createMenuItem);
router.put('/:id', auth, requireRole('admin'), updateMenuItem);
router.delete('/:id', auth, requireRole('admin'), deleteMenuItem);

module.exports = router;