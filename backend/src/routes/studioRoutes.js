const express = require('express');
const router = express.Router();
const studioController = require('../controllers/studioController');

router.get('/', studioController.getAllStudios);
router.post('/', studioController.createStudio);

module.exports = router;
