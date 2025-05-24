const express = require('express');
const router = express.Router();
const baseController = require('../controllers/base.controller');
const checkRole = require('../middlewares/rbac');

const admin = checkRole(['admin']); ;
const authJwt = require('../middlewares/auth.jwt');

router.use(authJwt);

router.post('/', admin, baseController.createBase);
router.get('/', baseController.getBases);

module.exports = router;