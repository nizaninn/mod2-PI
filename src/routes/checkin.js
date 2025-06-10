const express = require('express');
const router = express.Router();
const CheckinController = require('../controllers/CheckinController');

router.post('/checkin', CheckinController.registrarCheckin);
router.get('/checkin', CheckinController.listarCheckins); // uso de query param: ?evento=ID

module.exports = router;
