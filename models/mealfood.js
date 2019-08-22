'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealFood = sequelize.define('MealFood', {
    FoodId: DataTypes.INTEGER,
    MealId: DataTypes.INTEGER
  }, {});
  MealFood.associate = function(models) {
  };
  return MealFood;
};