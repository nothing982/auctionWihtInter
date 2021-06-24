const express = require('express');
const { body } = require('express-validator/check');

const vehicleController = require('../controllers/vehicle');
const isAuth = require('../middleware/is-auth');

const uploadS3 = require('../middleware/upload-image');

const router = express.Router();

router.post(
  '/addcar',
  isAuth,
  uploadS3.fields([
    { name: 'pdfFile', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  vehicleController.addVehicle
);

router.get('/getcars', vehicleController.getVehicles);
router.post('/filtercars', vehicleController.filterVehicles);

module.exports = router;
