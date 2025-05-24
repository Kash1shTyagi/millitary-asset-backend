const { Asset, Base } = require("../models");
const AssetService = require("../services/asset.service");
const apiResponse = require("../utils/apiResponse");
const logger = require("../utils/logger");

const createAsset = async (req, res) => {
  try {
    const userRole = req.user.role.toLowerCase();
    console.log("Creating asset with data:", req.body);
    // Military security clearance check
    if (!["basecommander", "admin"].includes(userRole)) {
      return apiResponse.error(
        res,
        "Insufficient permissions for asset management",
        403
      );
    }

    const { type, name, quantity, baseId } = req.body;

    // Verify base jurisdiction
    const base = await Base.findByPk(baseId);
    if (!base) {
      return apiResponse.error(res, "Military base not found", 404);
    }

    // Create asset with initial quantity
    const asset = await Asset.create({
      type,
      name,
      current_quantity: quantity,
      baseId,
    });

    // Log inventory change
    logger.info(
      `Asset ${asset.id} created at ${base.name} by user ${req.user.id}`
    );

    apiResponse.success(res, "Military asset registered", asset, 201);
  } catch (error) {
    console.error("🔥 Asset creation failed:", error);
    logger.error(`Asset creation error: ${error.stack}`);
    apiResponse.error(res, error.message || "Failed to register asset", 500);
  }
};

const listBaseAssets = async (req, res) => {
  try {
    // Get baseId from params or user context
    const baseId = req.params.baseId || req.user.baseId;

    // Operational security: Restrict to own base unless admin
    if (req.user.role !== "Admin" && req.params.baseId) {
      return apiResponse.error(res, "Unauthorized base access", 403);
    }

    const assets = await Asset.findAll({
      where: { baseId },
      include: [
        {
          model: Base,
          attributes: ["name", "location"],
        },
      ],
    });

    apiResponse.success(res, "Base inventory retrieved", assets);
  } catch (error) {
    logger.error(`Asset listing error: ${error.message}`);
    apiResponse.error(res, "Failed to retrieve inventory", 500);
  }
};

const updateAsset = async (req, res) => {
  try {
    // Only logistics and above can modify assets
    const role = req.user.role.toLowerCase();
    if (!["logisticsofficer", "basecommander", "admin"].includes(role)) {
      return apiResponse.error(res, "Insufficient permissions", 403);
    }

    const { quantity, operation } = req.body; // operation: 'add' or 'remove'
    const asset = await Asset.findByPk(req.params.id);

    if (!asset) {
      return apiResponse.error(res, "Asset not found", 404);
    }

    // Military inventory control
    const quantityChange = operation === "add" ? quantity : -quantity;
    const updatedQuantity = await AssetService.updateBalances(
      asset.id,
      asset.baseId,
      quantityChange
    );

    apiResponse.success(res, "Inventory updated", {
      previous: asset.current_quantity,
      new: updatedQuantity,
    });
  } catch (error) {
    logger.error(`Asset update error: ${error.message}`);
    apiResponse.error(res, error.message, 400);
  }
};

module.exports = {
  createAsset,
  listBaseAssets,
  updateAsset,
};
