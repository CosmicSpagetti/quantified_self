var express = require('express');
var fetch = require('node-fetch')
var router = express.Router();

router.get('/', (request,response) => {
  return fetch(`https://calorie-coach-ms.herokuapp.com/graphql?query={averageCalorieCount(foodType:"${request.query.q}"){foodType,average}}`)
  .then(recipesData => {
    return recipesData.json()
  })
  .then(average => {
    if (average.data.averageCalorieCount.length == 0) {
      response.setHeader('Content-Type', 'application/json')
      response.status(404).send(JSON.stringify({error: "Food type Does not exist"}))
    } else {
      response.setHeader('Content-Type', 'application/json')
      response.status(200).send(JSON.stringify(average))
    }
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json');
    response.status(500).send({ error });
  })
})

module.exports = router