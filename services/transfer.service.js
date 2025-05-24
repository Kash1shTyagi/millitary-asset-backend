const { Transfer, Asset } = require('../models');
const AssetService = require('./asset.service');

class TransferService {
  static async validateTransfer(fromBaseId, assetId, quantity) {
    const currentBalance = await AssetService.getCurrentBalance(assetId, fromBaseId);
    
    if (currentBalance < quantity) {
      throw new Error(`Insufficient assets for transfer. Available: ${currentBalance}`);
    }

    const asset = await Asset.findByPk(assetId);
    if (!asset.transferrable) {
      throw new Error('This asset type cannot be transferred');
    }

    return true;
  }

  static async executeTransfer(fromBaseId, toBaseId, assetId, quantity) {
    const transaction = await sequelize.transaction();
    
    try {
      await AssetService.updateBalances(assetId, fromBaseId, -quantity);
      await AssetService.updateBalances(assetId, toBaseId, quantity);
      
      const transfer = await Transfer.create({
        fromBaseId,
        toBaseId,
        assetId,
        quantity
      }, { transaction });

      await transaction.commit();
      return transfer;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = TransferService;