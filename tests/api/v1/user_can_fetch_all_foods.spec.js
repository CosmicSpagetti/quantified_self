var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app')

describe('food index api', () => {
  test('user can fetch all foods', () => {
    return request(app)
    .get('/api/v1/foods')
    .then(response => {
      expect(response.statusCode).toBe(200)
      expect(Object.keys(response.body[0])).toContain('id')
      expect(Object.keys(response.body[0])).toContain('name')
      expect(Object.keys(response.body[0])).toContain('calories')
    })
  })
})
