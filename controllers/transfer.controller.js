const TransferService = require("../services/transfer.service");
const apiResponse = require("../utils/apiResponse");
const { Transfer, Asset, Base } = require('../models');


exports.initiateTransfer = async (req, res) => {
  try {
    const { fromBaseId, toBaseId, assetId, quantity } = req.body;

    const transfer = await TransferService.createTransfer({
      assetId,
      fromBaseId,
      toBaseId,
      quantity,
    });

    apiResponse.success(res, "Transfer completed", transfer, 201);
  } catch (error) {
    apiResponse.error(res, error.message, 400);
  }
};

exports.getTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.findAll({
      include: [
        { model: Asset },
        { model: Base, as: 'fromBase' },
        { model: Base, as: 'toBase' }
      ]
    });

    apiResponse.success(res, 'Transfers retrieved', transfers);
  } catch (error) {
    apiResponse.error(res, error.message, 500);
  }
};
