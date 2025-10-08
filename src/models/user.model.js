const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password_hash: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('ADMIN', 'DOCTOR', 'PATIENT', 'NURSE', 'STAFF'),
      defaultValue: 'PATIENT',
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    indexes: [
      { unique: true, fields: ['username'] },
      { unique: true, fields: ['email'] },
      { fields: ['role'] },
    ],
  }
);

module.exports = User;


