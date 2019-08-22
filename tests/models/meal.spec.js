var app = require('../../app')
var cleanup = require('../../tests/helpers/test_clear_database')

var Meal = require('../../models').Meal;
var Food = require('../../models').Food;
var MealFood = require('../../models').MealFood;

describe('Meal model', () => {
  beforeEach(() => {
    cleanup();
  })
  
  test('test it has attributes', () => {
    return Meal.create({
      name: 'Breakfast'
    })
    .then(meal => {
      expect(meal.dataValues.name).toBe('Breakfast')
    })
  })

  test('test it title cases meal names before creation', () => {
    return Meal.create({
      name: 'lunch'
    })
    .then(meal => {
      expect(meal.dataValues.name).toBe('Lunch')
    })
  })
  test('test has meal returns associated foods', () => {
    return Meal.create({
      id: 20,
      name: 'elevenzzs'
    }) 
    .then(meal => {
      return Food.bulkCreate([
        {
          id: 4,
          name: 'Mango',
          calories: 120,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: 'Orange',
          calories: 80,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6, 
          name: 'Strawberry',
          calories: 20,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 7, 
          name: 'Kiwi',
          calories: 40,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
     .then(foods => {
        return MealFood.bulkCreate([
          {
            MealId: 20, 
            FoodId: 4
          },
          {
            MealId: 20,
            FoodId: 5
          },{
            MealId: 20,
            FoodId: 6
          },{
            MealId: 20,
            FoodId: 7
          }
        ])
        .then(mealfoods => {
          
        })
     }) 
    })
  })
})