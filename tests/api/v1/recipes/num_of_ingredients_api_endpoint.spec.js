var shell = require('shelljs');
var request = require('supertest');

var app = require('../../../../app');
var cleanup = require('../../../../tests/helpers/test_clear_database');

describe('number of ingredients api endpoint', () => {
  test('user can fetch all recipes by number of ingredients', () => {
    return request(app)
    .get('/api/v1/recipes/num_of_ingredients?q=11')
    .then(response => {
      expect(response.statusCode).toBe(200)

      expect(response.body.data.recipes.length).toBe(4)
      expect(Object.keys(response.body.data.recipes[0])).toContain('id')
      expect(Object.keys(response.body.data.recipes[0])).toContain('name')
      expect(Object.keys(response.body.data.recipes[0])).toContain('foodType')
      expect(Object.keys(response.body.data.recipes[0])).toContain('recipeUrl')
      expect(Object.keys(response.body.data.recipes[0])).toContain('calorieCount')
      expect(Object.keys(response.body.data.recipes[0])).toContain('preparationTime')
      expect(Object.keys(response.body.data.recipes[0])).toContain('numberOfIngredients')
    })
  })

  test('user receives 404 error when no recipes match the specified number of ingredients', () => {
    return request(app)
    .get('/api/v1/recipes/num_of_ingredients?q=1')
    .then(response => {
      expect(response.statusCode).toBe(404)
      expect(response.body.error).toBe('No recipes found for that number of ingredients.')
    })
  })
})
