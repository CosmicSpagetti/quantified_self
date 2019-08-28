var shell = require('shelljs');
var request = require('supertest');

var app = require('../../../app');
var cleanup = require('../../../tests/helpers/test_clear_database');

describe('recipes api endpoint', () => {
  beforeEach(async function() {
    await cleanup();
  })

  test('user can fetch all recipes by food type', () => {
    return request(app)
    .get('/api/v1/recipes/foods_search?q=chicken')
    .then(response => {
      expect(response.statusCode).toBe(200)

      expect(response.body.data.recipes.length).toBe(10)
      expect(Object.keys(response.body.data.recipes[0])).toContain('id')
      expect(Object.keys(response.body.data.recipes[0])).toContain('name')
      expect(Object.keys(response.body.data.recipes[0])).toContain('foodType')
      expect(Object.keys(response.body.data.recipes[0])).toContain('recipeUrl')
      expect(Object.keys(response.body.data.recipes[0])).toContain('calorieCount')
      expect(Object.keys(response.body.data.recipes[0])).toContain('preparationTime')
      expect(Object.keys(response.body.data.recipes[0])).toContain('numberOfIngredients')
    })
  })

  test('user receives 404 error when no recipes of the specified food type are found', () => {
    return request(app)
    .get('/api/v1/recipes/foods_search?q=pork')
    .then(response => {
      expect(response.statusCode).toBe(404)
      expect(response.body.error).toBe('No recipes found for pork.')
    })
  })
})
