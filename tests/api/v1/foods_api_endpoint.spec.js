var shell = require('shelljs');
var request = require('supertest');

var Food = require('../../../models').Food;

var app = require('../../../app');
var cleanup = require('../../../tests/helpers/test_clear_database');

describe('foods api endpoint', () => {
  beforeEach(() => {
    cleanup();
  })

  test('user can fetch all foods', () => {
    return Food.bulkCreate([
      {
        name: 'Mango',
        calories: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Orange',
        calories: 80,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Strawberry',
        calories: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kiwi',
        calories: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    .then(food => {
    return request(app)
    .get('/api/v1/foods')
    .then(response => {
      expect(response.statusCode).toBe(200)
      expect(response.body.length).toBe(4)
      expect(Object.keys(response.body[0])).toContain('id')
      expect(Object.keys(response.body[0])).toContain('name')
      expect(Object.keys(response.body[0])).toContain('calories')
    })
    })
  });
  test('user can return a single food', () => {
    return Food.bulkCreate([
      {
        id: 6,
        name: 'Mango',
        calories: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: 'Orange',
        calories: 80,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    .then(food =>{
      return request(app)
      .get('/api/v1/foods/6')
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(Object.values(response.body)).toContain(6)
        expect(Object.values(response.body)).toContain('Mango')
        expect(Object.values(response.body)).toContain(120)
        expect(Object.keys(response.body)).not.toContain('createdAt')
      })
    });
  });
  test("user gets 404 when they fetch single food with invalid id", () => {
    return request(app)
    .get('/api/v1/foods/100')
    .then(response => {
      expect(response.statusCode).toBe(404)
      expect(response.body.error).toBe('Food not found.')
    })
  })
})
