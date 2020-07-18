'use strict';
const ROLES = [
  {
    name: 'SUPER_ADMIN',
  },
  {
    name: 'ORGANIZATION_ADMIN',
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [roles] = await queryInterface.sequelize.query(
      'SELECT * FROM "Roles"'
    );
    if (roles.length) {
      return;
    }
    const seeds = ROLES.map((role) => {
      return {
        ...role,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    return await queryInterface.bulkInsert('Roles', seeds);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
