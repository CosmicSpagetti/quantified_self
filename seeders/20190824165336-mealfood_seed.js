'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MealFoods',
    [
      {
        mealId: 1,
        foodId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mealId: 1,
        foodId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mealId: 1,
        foodId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mealId: 2,
        foodId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mealId: 2,
        foodId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mealId: 2,
        foodId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  )},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MealFoods', null, {});
  }
};
