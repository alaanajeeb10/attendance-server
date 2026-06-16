const express = require('express');
const router = express.Router();
module.exports = router;

const attendance_R = require('./attendance_R');
router.use('/ATT',[],attendance_R);
