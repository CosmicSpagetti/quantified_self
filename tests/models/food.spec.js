var app = require('../../app')
var cleanup = require('../../tests/helpers/test_clear_database')

var Food = require('../../models').Food;
var Meal = require('../../models').Meal;

describe('food model', () => {
  beforeEach(() => {
    cleanup();
  })

  test('it has attributes', () => {
    return Food.create({
      name: 'Banana',
      calories: 120,
    })
    .then(food => {
      expect(food.dataValues.name).toBe('Banana');
      expect(food.dataValues.calories).toBe(120);
    })
  })

  test('it title cases food names before creation', () => {
    return Food.create({
      name: 'turkey ham',
      calories: 800,
    })
    .then(food => {
      expect(food.dataValues.name).toBe('Turkey Ham');
      expect(food.dataValues.calories).toBe(800);
    })
  })

  test('it cannot be created with a name already in the database', () => {
    return Food.create({
      name: 'crackers',
      calories: 100,
    })
    .then(food => {
      return Food.create({
        name: food.name,
        calories: food.calories
      })
      .catch(error => {
        expect(error.name).toBe('SequelizeUniqueConstraintError');
      })
    })
  })

  test('it is associated with meals', () => {
    return Food.create({
      name: 'Rhubarb',
      calories: 40
    })
    .then(food => {
      return Meal.create({
        name: 'Fourth Meal',
      })
      .then(meal => {
        return food.hasMeal(meal)
        .then(result => {
          expect(result).toBe(false);

          return food.addMeal(meal);
        })
        .then(() => {
          return food.hasMeal(meal);
        })
        .then(result => {
          expect(result).toBe(true);
        })
      })
    })
  })
})
