var app = require('../../app')
var cleanup = require('../../tests/helpers/test_clear_database')

var Meal = require('../../models').Meal;
var Food = require('../../models').Food;

describe('Meal model', () => {
  beforeEach(() => {
    cleanup();
  })

  test('it has attributes', () => {
    return Meal.create({
      name: 'Breakfast'
    })
    .then(meal => {
      expect(meal.dataValues.name).toBe('Breakfast');
    })
  })

  test('it title cases meal names before creation', () => {
    return Meal.create({
      name: 'lunch'
    })
    .then(meal => {
      expect(meal.dataValues.name).toBe('Lunch');
    })
  })

  test('it is associated with foods', () => {
    return Meal.create({
      name: 'Elevensies'
    })
    .then(meal => {
      return Food.create({
        name: 'Mango',
        calories: 120
      })
      .then(food => {
        return meal.hasFood(food)
        .then(result => {
          expect(result).toBe(false);

          return meal.addFood(food);
        })
        .then(() => {
          return meal.hasFood(food);
        })
        .then(result => {
          expect(result).toBe(true);
        })
      })
    })
  })
})
