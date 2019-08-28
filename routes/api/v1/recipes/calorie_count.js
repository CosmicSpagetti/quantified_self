var express = require('express');
var fetch = require('node-fetch')
var router = express.Router();

router.get('/', (request,response) => {
  return fetch(`https://calorie-coach-ms.herokuapp.com/graphql?query={recipes(calorieCount:${request.query.q}){id,name,calorieCount,foodType,recipeUrl,numberOfIngredients,preparationTime}}`)
  .then(recipesData => {
    return recipesData.json()
  })
  .then(recipes => {
    if (recipes.data.recipes.length == 0) {
      response.setHeader('Content-Type', 'application/json')
      response.status(404).send(JSON.stringify({error: "No recipes found for calorie count"}))
    } else {
      response.setHeader('Content-Type', 'application/json')
      response.status(200).send(JSON.stringify(recipes))
    }
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json');
    response.status(500).send({ error });
  })
})

module.exports = router