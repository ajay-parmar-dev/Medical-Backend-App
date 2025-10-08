const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const Keycloak = require('keycloak-connect');
const config = require('../config/config');
const catchAsync = require('../middlewares/catchAsync');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');

function generateToken(payload) {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: `${config.jwt.accessExpirationMinutes}m`,
  });
}

exports.signup = catchAsync(async (req, res) => {
  const { username, email, password, role } = req.body;

  const existing = await User.findOne({ where: { [Op.or]: [{ email }, { username }] } });
  if (existing) {
    throw new ApiError(httpStatus.CONFLICT, 'User with email or username already exists');
  }

  const salt = await bcrypt.genSalt(config.bcrypt.saltRounds);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password_hash: passwordHash,
    role: role || 'PATIENT',
  });

  const token = generateToken({ sub: user.id, role: user.role });
  res.status(httpStatus.CREATED).json({
    user: { id: user.id, username: user.username, email: user.email, role: user.role },
    token,
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email_id, user_password } = req.body;

  const keycloakConfig = {
    clientId: config.keycloak.clientId,
    bearerOnly: true,
    serverUrl: config.keycloak.serverUrl,
    realm: config.keycloak.realm,
    credentials: { secret: config.keycloak.clientSecret },
  };

  const keycloak = new Keycloak({}, keycloakConfig);
  const username = email_id;
  const password = user_password;

  try {
    const grant = await keycloak.grantManager.obtainDirectly(username, password);
    return res.json({
      message: 'User Login Successful',
      status: true,
      access_token: grant.access_token.token,
      refresh_token: grant.refresh_token.token,
      user_id: grant.access_token.content.sub,
      role: grant.access_token.content?.realm_access?.roles,
    });
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: 'Authentication failed',
      status: false,
      access_token: null,
      refresh_token: null,
      user_id: null,
    });
  }
});

exports.getProfile = catchAsync(async (req, res) => {
  const user = await User.findByPk(req.userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  res.json({ id: user.id, username: user.username, email: user.email, role: user.role });
});


