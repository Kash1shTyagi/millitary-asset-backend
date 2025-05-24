// services/asset.service.js

const { Asset } = require("../models");

const createAsset = async (assetData) => {
  try {
    console.log("User ID:", req.user.id, typeof req.user.id);
    console.log("User baseId:", req.user.baseId, typeof req.user.baseId);
    console.log("Creating asset with data:", { type, name, quantity, baseId });

    const asset = await Asset.create(assetData);
    return asset;
  } catch (error) {
    throw new Error("Error creating asset: " + error.message);
  }
};

const getAllAssets = async () => {
  try {
    const assets = await Asset.findAll();
    return assets;
  } catch (error) {
    throw new Error("Error fetching assets: " + error.message);
  }
};

const getCurrentBalance = async (assetId, baseId) => {
  const asset = await Asset.findOne({ where: { id: assetId, baseId } });
  return asset ? asset.current_quantity : 0;
};

async function updateBalances(assetId, baseId, quantityChange) {
  const asset = await Asset.findOne({
    where: { id: assetId, baseId }
  });
  if (!asset) throw new Error("Asset not found at specified base");

  const newQuantity = asset.current_quantity + quantityChange;
  if (newQuantity < 0) throw new Error("Inventory quantity cannot be negative");

  asset.current_quantity = newQuantity;
  await asset.save();
  return newQuantity;
}

const getAssetById = async (id) => {
  try {
    const asset = await Asset.findByPk(id);
    if (!asset) throw new Error("Asset not found");
    return asset;
  } catch (error) {
    throw new Error("Error fetching asset: " + error.message);
  }
};

async function updateAsset(assetId, baseId, quantityChange) {
  const asset = await Asset.findOne({
    where: { id: assetId, baseId },
  });

  if (!asset) {
    throw new Error("Asset not found at specified base");
  }

  const newQuantity = asset.current_quantity + quantityChange;

  if (newQuantity < 0) {
    throw new Error("Inventory quantity cannot be negative");
  }

  // Update quantity and save
  asset.current_quantity = newQuantity;
  await asset.save();

  return newQuantity;
}

const deleteAsset = async (id) => {
  try {
    const asset = await getAssetById(id);
    if (!asset) throw new Error("Asset not found");
    await asset.destroy();
    return true;
  } catch (error) {
    throw new Error("Error deleting asset: " + error.message);
  }
};

module.exports = {
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
  updateBalances,
  getCurrentBalance,
};
