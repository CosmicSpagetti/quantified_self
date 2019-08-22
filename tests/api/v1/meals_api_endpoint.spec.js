var shell = require('shelljs');
var request = require('supertest');

var Meal = require('../../../models').Meal;
var Food = require('../../../models').Food;

var app = require('../../../app');
var cleanup = require('../../../tests/helpers/test_clear_database');

describe('meals api endpoint', () => {
  beforeEach(async function() {
    await cleanup();
  })

  test('user can fetch all meals', () => {
    return Meal.create({
      name: 'Brinner',
      foods: [
        {
          name: 'Waffles',
          calories: 800
        },
        {
          name: 'Hot Sauce',
          calories: 30
        },
        {
          name: 'Mimosa',
          calories: 300
        }
      ]
    }, {
      include: 'foods'
    })
    .then(meal => {
      return Meal.create({
        name: 'Linner',
        foods: [
          {
            name: 'Quesadilla',
            calories: 1200
          },
          {
            name: 'Salsa',
            calories: 40
          },
          {
            name: 'Sour Cream',
            calories: 400
          }
        ]
      }, {
        include: 'foods'
      })
    })
    .then(meal => {
      return request(app)
      .get('/api/v1/meals')
      .then(response => {
        expect(response.statusCode).toBe(200);

        expect(response.body.length).toBe(2);
        expect(Object.keys(response.body[0])).toContain('id');
        expect(Object.keys(response.body[0])).toContain('name');
        expect(Object.keys(response.body[0])).toContain('foods');

        expect(Object.keys(response.body[0])).not.toContain('createdAt');
        expect(Object.keys(response.body[0])).not.toContain('updatedAt');

        expect(response.body[0].foods.length).toBe(3);
        expect(Object.keys(response.body[0].foods[0])).toContain('id');
        expect(Object.keys(response.body[0].foods[0])).toContain('name');
        expect(Object.keys(response.body[0].foods[0])).toContain('calories');

        expect(Object.keys(response.body[0].foods[0])).not.toContain('createdAt');
        expect(Object.keys(response.body[0].foods[0])).not.toContain('updatedAt');
      })
    })
  })
})
