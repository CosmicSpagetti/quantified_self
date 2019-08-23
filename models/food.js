var toTitleCase = require('../helpers/title_case')

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {
    hooks: {
      beforeSave: (food) => {
        food.name = toTitleCase(food.name);
      }
    }
  });
  Food.associate = function(models) {
    Food.belongsToMany(models.Meal, {
      through: 'MealFoods',
      foreignKey: 'foodId',
      otherKey: 'mealId',
      as: 'meals'
    })
  };
  return Food;
};
