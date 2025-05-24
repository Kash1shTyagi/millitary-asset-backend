const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchase.controller');
const authJwt = require('../middlewares/auth.jwt');
const checkRole = require('../middlewares/rbac');

const logistics = checkRole(['LogisticsOfficer', 'BaseCommander', 'Admin']); 
router.use(authJwt, logistics);

router.post('/', purchaseController.createPurchase);
router.get('/', purchaseController.getPurchases);

module.exports = router;