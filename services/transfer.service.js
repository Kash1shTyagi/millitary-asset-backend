const { Transfer, Asset } = require('../models');

const updateAssetBalance = async (assetId, baseId, quantityChange) => {
  let assetBalance = await Asset.findOne({ where: { id: assetId, baseId } });

  // If asset doesn't exist at this base and quantityChange is positive, create it
  if (!assetBalance && quantityChange > 0) {
    // Fetch asset details from another base
    const sourceAsset = await Asset.findOne({ where: { id: assetId } });
    if (!sourceAsset) throw new Error(`Asset with id ${assetId} not found`);

    assetBalance = await Asset.create({
      name: sourceAsset.name,
      type: sourceAsset.type,
      current_quantity: 0,
      baseId: baseId
    });
  }

  if (!assetBalance) {
    throw new Error(`Asset balance not found for assetId ${assetId} at base ${baseId}`);
  }

  const newQuantity = assetBalance.current_quantity + quantityChange;

  if (newQuantity < 0) {
    throw new Error(`Insufficient asset quantity at base ${baseId}`);
  }

  assetBalance.current_quantity = newQuantity;
  await assetBalance.save();
};

const createTransfer = async ({ assetId, fromBaseId, toBaseId, quantity }) => {
  if (fromBaseId === toBaseId) {
    throw new Error('Source and destination base cannot be the same');
  }

  // Check availability and deduct quantity from source base
  await updateAssetBalance(assetId, fromBaseId, -quantity);

  // Add quantity to destination base
  await updateAssetBalance(assetId, toBaseId, quantity);

  // Create transfer record
  const transfer = await Transfer.create({
    assetId,
    fromBaseId,
    toBaseId,
    quantity,
    date: new Date()
  });

  return transfer;
};

module.exports = {
  createTransfer,
};
