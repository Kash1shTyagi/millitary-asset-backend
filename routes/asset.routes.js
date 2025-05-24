const express = require('express');
const router = express.Router();
const assetController = require('../controllers/asset.controller');

const authJwt = require('../middlewares/auth.jwt');
const checkRole = require('../middlewares/rbac');

const logistics = checkRole(['LogisticsOfficer']); 
const commander = checkRole(['BaseCommander', 'Admin']); 

// Military asset management endpoints
router.post('/', 
  authJwt, 
  commander, 
  assetController.createAsset
);

// Fixed route definition (remove optional parameter syntax)
router.get('/', 
  authJwt, 
  assetController.listBaseAssets
);

router.get('/:baseId', 
  authJwt, 
  assetController.listBaseAssets
);

router.patch('/:id', authJwt, (req, res, next) => {
  next();
}, assetController.updateAsset);

module.exports = router;    