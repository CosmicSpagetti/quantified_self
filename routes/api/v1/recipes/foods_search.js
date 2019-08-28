var express = require('express');
var fetch = require('node-fetch');

var router = express.Router();

router.get('/', (request, response) => {
  return fetch(`https://calorie-coach-ms.herokuapp.com/graphql?query={recipes(foodType:"${request.query.q}"){id,name,recipeUrl,foodType,preparationTime,calorieCount,numberOfIngredients}}`)
  .then(recipeData => {
    return recipeData.json();
  })
  .then(parsedRecipeData => {
    if (parsedRecipeData.data.recipes.length == 0) {
      response.setHeader('Content-Type', 'application/json');
      response.status(404).send(JSON.stringify({ error: `No recipes found for food type.` }));
    } else {
      response.setHeader('Content-Type', 'application/json');
      response.status(200).send(JSON.stringify(parsedRecipeData));
    }
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json');
    response.status(500).send({ error });
  })
})

module.exports = router;
