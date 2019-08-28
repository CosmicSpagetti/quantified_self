var express = require('express');
var fetch = require('node-fetch');

var router = express.Router();

router.get('/', (request, response) => {
  return fetch(`https://calorie-coach-ms.herokuapp.com/graphql?query={preparationTime{id,name,foodType,recipeUrl,preparationTime,calorieCount,numberOfIngredients}}`)
  .then(recipeData => {
    return recipeData.json();
  })
  .then(parsedRecipeData => {
    response.setHeader('Content-Type', 'application/json');
    response.status(200).send(JSON.stringify(parsedRecipeData));
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json');
    response.status(500).send({ error });
  })
})

module.exports = router;