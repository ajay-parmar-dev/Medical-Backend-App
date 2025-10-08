'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('ADMIN', 'DOCTOR', 'PATIENT', 'NURSE', 'STAFF'),
        allowNull: false,
        defaultValue: 'PATIENT',
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    await queryInterface.addIndex('users', ['username'], { unique: true });
    await queryInterface.addIndex('users', ['email'], { unique: true });
    await queryInterface.addIndex('users', ['role']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('users', ['role']);
    await queryInterface.removeIndex('users', ['email']);
    await queryInterface.removeIndex('users', ['username']);
    await queryInterface.dropTable('users');
    await queryInterface.sequelize.query("DROP TYPE IF EXISTS \"enum_users_role\";");
  },
};


