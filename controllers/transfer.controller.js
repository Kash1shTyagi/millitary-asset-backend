const TransferService = require('../services/transfer.service');
const apiResponse = require('../utils/apiResponse');

exports.initiateTransfer = async (req, res) => {
  try {
    const { fromBaseId, toBaseId, assetId, quantity } = req.body;
    
    await TransferService.validateTransfer(fromBaseId, assetId, quantity);
    const transfer = await TransferService.executeTransfer(fromBaseId, toBaseId, assetId, quantity);
    
    apiResponse.success(res, 'Transfer completed', transfer, 201);
  } catch (error) {
    apiResponse.error(res, error.message, 400);
  }
};