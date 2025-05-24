const apiResponse = {
  success: (res, message, data = {}, status = 200) => {
    res.status(status).json({
      success: true,
      message,
      data
    });
  },

  error: (res, message, status = 500, error = {}) => {
    res.status(status).json({
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

module.exports = apiResponse;