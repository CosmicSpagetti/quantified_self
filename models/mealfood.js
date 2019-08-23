'use strict';

module.exports = (sequelize, DataTypes) => {
  const MealFood = sequelize.define('MealFood', {
    foodId: DataTypes.INTEGER,
    mealId: DataTypes.INTEGER
  }, {});
  MealFood.associate = function(models) {
  };
  return MealFood;
};
