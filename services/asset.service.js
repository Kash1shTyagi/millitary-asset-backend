const { Asset, Purchase, Transfer } = require('../models');

class AssetService {
  static async getCurrentBalance(assetId, baseId) {
    const asset = await Asset.findOne({
      where: { id: assetId, baseId }
    });

    if (!asset) throw new Error('Asset not found in base');

    return asset.current_quantity;
  }

  static async updateBalances(assetId, baseId, quantityChange) {
    const transaction = await sequelize.transaction();
    
    try {
      const asset = await Asset.findOne({
        where: { id: assetId, baseId },
        transaction
      });

      asset.current_quantity += quantityChange;
      await asset.save({ transaction });

      await transaction.commit();
      return asset.current_quantity;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = AssetService;