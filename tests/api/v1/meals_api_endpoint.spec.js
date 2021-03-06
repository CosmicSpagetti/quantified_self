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
    .then(() => {
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
    .then(() => {
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

  test('user can fetch all foods associated with a meal', () => {
    return Meal.create({
      name: 'Brunch',
      foods: [
        {
          name: 'Beignets',
          calories: 900
        },
        {
          name: 'Fried Chicken Sandwich',
          calories: 1100
        },
        {
          name: 'Pork Belly',
          calories: 1600
        }
      ],
    }, {
      include: 'foods'
    })
    .then(meal => {
      return request(app)
      .get(`/api/v1/meals/${meal.id}/foods`)
      .then(response => {
        expect(response.statusCode).toBe(200);

        expect(Object.keys(response.body)).toContain('id')
        expect(Object.keys(response.body)).toContain('name')

        expect(Object.keys(response.body.foods[0])).toContain('id')
        expect(Object.keys(response.body.foods[0])).toContain('name')
        expect(Object.keys(response.body.foods[0])).toContain('calories')
      })
    })
  })

  test('user receives a 404 error when no meal is found to fetch foods for', () => {
    return request(app)
    .get('/api/v1/meals/9999/foods')
    .then(response => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Meal not found.');
    })
  })
  
  test('user can add food with id to meal with id', () => {
    return Meal.create({
      name: 'Qdoba'
    })
    .then(meal => {
      return Food.create({
        name: 'Bowl with steak',
        calories: 1500
      })
      .then(food => {
        return request(app)
        .post(`/api/v1/meals/${meal.id}/foods/${food.id}`)
        .then(response => {
          expect(response.statusCode).toBe(201)
          expect(Object.keys(response.body)).toContain('message')
          expect(Object.values(response.body)).toContain(`Successfully added ${food.name} to ${meal.name}`)
        })
      })
    })
  })

  test('user receives a 404 error when the meal is not found', () => {
    return Food.create({
      name: 'ketchup',
      calories: 100
    })
    .then(food => {
      return request(app)
      .post(`/api/v1/meals/9999/foods/${food.id}`)
      .then(response => {
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Meal not found.')
      })
    })
  })

  test('user receives a 404 error when the food is not found', () => {
    return Food.create({
      name: 'ketchup',
      calories: 100
    })
    .then(food => {
      return request(app)
      .post(`/api/v1/meals/9999/foods/${food.id}`)
      .then(response => {
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Meal not found.')
      })
    })
  })

  test('user can delete food associated with a meal', () => {
    return Meal.create({
      name: 'snack',
      foods: [
        {
          id: 101,
          name: 'Gummies',
          calories: 800
        },
        {
          name: 'Blue-Sharks',
          calories: 30
        },
        {
          name: 'Capri-Sun',
          calories: 300
        }
      ]
    }, {
      include: 'foods'
    })
    .then(meal => {
      return request(app)
      .delete(`/api/v1/meals/${meal.id}/foods/101`)
      .then(response => {
        expect(response.statusCode).toBe(204);
      })
    })
  })

  test('user receives a 404 error when the food is not associated with the meal', () => {
    return Food.create({
      name: 'Mayo',
      calories: 200
    })
    .then(food => {
      return request(app)
      .delete(`/api/v1/meals/9999/foods/${food.id}`)
      .then(response => {
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Not found.');
      })
    })
  })

  test('user receives a 404 error when no food is found to delete', () => {
    return Meal.create({
      name: 'Midnight Snack'
    })
    .then(meal => {
      return request(app)
      .delete(`/api/v1/meals/${meal.id}/foods/9999`)
      .then(response => {
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Not found.');
      })
    })
  })
})
