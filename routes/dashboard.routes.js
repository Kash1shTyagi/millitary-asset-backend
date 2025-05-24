const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const authJwt = require('../middlewares/auth.jwt');

router.use(authJwt);
router.get('/metrics', dashboardController.getBaseMetrics);

module.exports = router;