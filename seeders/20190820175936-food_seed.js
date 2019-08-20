'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Foods',
    [
      {
        name: 'Banana',
        calories: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Orange',
        calories: 80,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Strawberry',
        calories: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kiwi',
        calories: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  )},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Foods', null, {});
  }
};
