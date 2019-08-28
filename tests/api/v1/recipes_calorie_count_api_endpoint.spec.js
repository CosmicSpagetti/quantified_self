var shell = require('shelljs');
var request = require('supertest');

var app = require('../../../app');
var cleanup = require('../../helpers/test_clear_database');


describe('recipes api endpoint', () => {
  test.only('user can fetch all recipes by calorie count', () => {
    return request(app)
    .get('/api/v1/recipes/calorie_count?q=4231')
    .then(response => {
      expect(response.statusCode).toBe(200)
      expect(Object.keys(response.body.data.recipes[0])).toContain('id')
      expect(Object.keys(response.body.data.recipes[0])).toContain('calorieCount')
      expect(Object.keys(response.body.data.recipes[0])).toContain('name')
      expect(Object.keys(response.body.data.recipes[0])).toContain('foodType')
      expect(Object.keys(response.body.data.recipes[0])).toContain('recipeUrl')
      expect(Object.keys(response.body.data.recipes[0])).toContain('numberOfIngredients')
      expect(Object.keys(response.body.data.recipes[0])).toContain('preparationTime')
    })
  })

  test.only('user gets 404 when searching for calorie count that does not exist', () => {
    return request(app)
    .get('/api/v1/recipes/calorie_count?q=100')
    .then(response => {
      expect(response.statusCode).toBe(404)
    })
  })
})
