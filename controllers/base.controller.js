const { Base } = require('../models');
const apiResponse = require('../utils/apiResponse');

exports.createBase = async (req, res) => {
  try {
    const base = await Base.create(req.body);
    apiResponse.success(res, 'Base created successfully', base, 201);
  } catch (error) {
    apiResponse.error(res, error.message, 400);
  }
};

exports.getBases = async (req, res) => {
  try {
    const bases = await Base.findAll();
    apiResponse.success(res, 'Bases retrieved', bases);
  } catch (error) {
    apiResponse.error(res, 'Failed to retrieve bases', 500);
  }
};