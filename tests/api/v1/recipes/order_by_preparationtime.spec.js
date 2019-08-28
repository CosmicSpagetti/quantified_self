var shell = require('shelljs');
var request = require('supertest');

var app = require('../../../../app');


describe('recipes api endpoint', () => {
  test('user can fetch recipes by preparation time', () => {
    return request(app)
    .get('/api/v1/recipes/preparation_time')
    .then(response => {
      expect(response.statusCode).toBe(200)
      expect(Object.keys(response.body.data.preparationTime[0])).toContain('id')
      expect(Object.keys(response.body.data.preparationTime[0])).toContain('name')
      expect(Object.keys(response.body.data.preparationTime[0])).toContain('foodType')
      expect(Object.keys(response.body.data.preparationTime[0])).toContain('recipeUrl')
      expect(Object.keys(response.body.data.preparationTime[0])).toContain('calorieCount')
      expect(Object.keys(response.body.data.preparationTime[0])).toContain('preparationTime')
      expect(Object.keys(response.body.data.preparationTime[0])).toContain('numberOfIngredients')

      expect(response.body.data.preparationTime[0].preparationTime).toBeLessThanOrEqual(response.body.data.preparationTime[1].preparationTime)
      expect(response.body.data.preparationTime[1].preparationTime).toBeLessThanOrEqual(response.body.data.preparationTime[2].preparationTime)
      expect(response.body.data.preparationTime[2].preparationTime).toBeLessThanOrEqual(response.body.data.preparationTime[3].preparationTime)
      expect(response.body.data.preparationTime[3].preparationTime).toBeLessThanOrEqual(response.body.data.preparationTime[4].preparationTime)
      expect(response.body.data.preparationTime[4].preparationTime).toBeLessThanOrEqual(response.body.data.preparationTime[5].preparationTime)
    })
  })
})