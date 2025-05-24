const { Asset, Purchase, Transfer } = require('../models');
const apiResponse = require('../utils/apiResponse');

exports.getBaseMetrics = async (req, res) => {
  try {
    const baseId = req.user.baseId;
    
    const assets = await Asset.findAll({ where: { baseId } });
    const purchases = await Purchase.findAll({ where: { baseId } });
    const transfers = await Transfer.findAll({ 
      where: { [Op.or]: [{ fromBaseId: baseId }, { toBaseId: baseId }] } 
    });

    // Calculate metrics
    const metrics = {
      totalAssets: assets.reduce((sum, a) => sum + a.current_quantity, 0),
      pendingTransfers: transfers.filter(t => t.status === 'pending').length,
      recentPurchases: purchases.slice(-5)
    };

    apiResponse.success(res, 'Base metrics retrieved', metrics);
  } catch (error) {
    apiResponse.error(res, 'Failed to load dashboard', 500);
  }
};