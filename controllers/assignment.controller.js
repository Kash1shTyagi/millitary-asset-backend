const { Assignment, Asset } = require('../models');
const AssetService = require('../services/asset.service');
const apiResponse = require('../utils/apiResponse');

exports.createAssignment = async (req, res) => {
  try {
    const { assetId, assignee, quantity, date } = req.body;  // use assignee and date from request

    if (!date) {
      return apiResponse.error(res, 'Assignment date is required', 400);
    }

    // Check asset availability
    const currentBalance = await AssetService.getCurrentBalance(assetId, req.user.baseId);
    if (currentBalance < quantity) {
      return apiResponse.error(res, 'Insufficient assets for assignment', 400);
    }

    const assignment = await Assignment.create({
      assetId,
      assignee,
      quantity,
      date,
      baseId: req.user.baseId
    });

    // Deduct from inventory
    await AssetService.updateBalances(assetId, req.user.baseId, -quantity);

    apiResponse.success(res, 'Assignment created', assignment, 201);
  } catch (error) {
    apiResponse.error(res, error.message, 400);
  }
};


exports.markExpended = async (req, res) => {
  try {
    const assignment = await Assignment.findOne({
      where: { id: req.params.id, baseId: req.user.baseId }
    });
    
    if (!assignment) return apiResponse.error(res, 'Assignment not found', 404);
    
    assignment.expended = true;
    await assignment.save();
    
    apiResponse.success(res, 'Asset expenditure recorded', assignment);
  } catch (error) {
    apiResponse.error(res, error.message, 500);
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.findAll({
      where: { baseId: req.user.baseId },
      include: [Asset]
    });
    apiResponse.success(res, 'Assignments retrieved', assignments);
  } catch (error) {
    apiResponse.error(res, 'Failed to retrieve assignments', 500);
  }
};