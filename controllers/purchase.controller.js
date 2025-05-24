const { Purchase, Asset } = require('../models');
const AssetService = require('../services/asset.service');
const apiResponse = require('../utils/apiResponse');

exports.createPurchase = async (req, res) => {
  try {
    const { assetId, quantity, baseId } = req.body;
    
    const purchase = await Purchase.create({
      assetId,
      quantity,
      baseId,
      date: new Date()
    });

    await AssetService.updateBalances(assetId, baseId, quantity);
    
    apiResponse.success(res, 'Purchase recorded', purchase, 201);
  } catch (error) {
    apiResponse.error(res, error.message, 400);
  }
};

exports.getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.findAll({
      where: { baseId: req.user.baseId },
      include: [Asset]
    });
    apiResponse.success(res, 'Purchases retrieved', purchases);
  } catch (error) {
    apiResponse.error(res, 'Failed to retrieve purchases', 500);
  }
};