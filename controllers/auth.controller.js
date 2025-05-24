const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Base } = require('../models');
const config = require('../config/config');
const apiResponse = require('../utils/apiResponse');

exports.register = async (req, res) => {
  try {
    const { username, password, role, baseId } = req.body;

    console.log('Register payload:', req.body);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      role,
      baseId, // directly passing here, Sequelize should handle integer/null
    });

    res.status(201).json({
      success: true,
      message: 'User created',
      data: user,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  console.log('JWT Secret:', config.jwtSecret);
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
      include: [{ model: Base, as: 'base' }]
    });

    if (!user) {
      console.log('❌ User not found');
      return apiResponse.error(res, 'Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log('🔐 Password match:', isMatch);

    if (!isMatch) {
      return apiResponse.error(res, 'Invalid credentials', 401);
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        baseId: user.baseId,
        baseName: user.base?.name
      },
      config.jwtSecret,
      { expiresIn: '8h' }
    );

    return apiResponse.success(res, 'Login successful', { token });
  } catch (error) {
    console.error('Login failed:', error);

    return apiResponse.error(res, 'Login failed', 500);
  }
};
