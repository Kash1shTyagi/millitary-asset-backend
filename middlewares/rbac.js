module.exports = (allowedRoles = []) => {
  return (req, res, next) => {
    const userRole = req.user.role?.toLowerCase();
    const allowed = allowedRoles.map(role => role.toLowerCase());

    if (!allowed.includes(userRole)) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    next();
  };
};
