var Meal = require('../../models').Meal;
var Food = require('../../models').Food;
var MealFood = require('../../models').MealFood;

module.exports = async function cleanup() {
  await Food.destroy({ where: {} })
  await Meal.destroy({ where: {} })
  await MealFood.destroy({ where: {} })
}
