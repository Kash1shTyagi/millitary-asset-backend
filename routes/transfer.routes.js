const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transfer.controller');
const authJwt = require('../middlewares/auth.jwt');
const checkRole = require('../middlewares/rbac');

const logistics = checkRole(['LogisticsOfficer', 'BaseCommander', 'Admin']); 
router.use(authJwt, logistics);

router.post('/', transferController.initiateTransfer);
router.get('/', transferController.getTransfers);

module.exports = router;