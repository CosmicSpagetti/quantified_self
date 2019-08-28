var shell = require('shelljs');
var request = require('supertest');

var app = require('../../../../app');


describe('recipes api endpoint', () => {
  test('user can get average count by food type', () => {
    return request(app)
    .get('/api/v1/recipes/average_calorie_count?q=chicken')
    .then(response => {
      expect(response.statusCode).toBe(200)
      expect(Object.keys(response.body.data.averageCalorieCount[0])).toContain('foodType')
      expect(Object.keys(response.body.data.averageCalorieCount[0])).toContain('average')
    })
  })

  test('user gets 404 when searching for a food type that does not exist', () => {
    return request(app)
    .get('/api/v1/recipes/average_calorie_count?q=fish')
    .then(response => {
      expect(response.statusCode).toBe(404)
    })
  })
})
