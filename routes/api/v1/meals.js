var express = require('express');

var Meal = require('../../../models').Meal;
var Food = require('../../../models').Food;
var MealFood = require('../../../models').MealFood;

var router = express.Router();

router.get('/', (request, response) => {
  return Meal.findAll({
    include: 'foods'
  })
  .then(meals => {
    response.setHeader('Content-Type', 'application/json');
    response.status(200).send(JSON.stringify(meals, ['id', 'name', 'foods', 'id', 'name', 'calories']));
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json');
    response.status(500).send({ error });
  })
})

router.get('/:id/foods', (request, response) => {
  return Meal.findOne({
    where: {
      id: request.params.id
    },
    include: 'foods'
  })
  .then(meal => {
    if (meal) {
      response.setHeader('Content-Type', 'application/json');
      response.status(200).send(JSON.stringify(meal, ['id', 'name', 'foods', 'id', 'name', 'calories']));
    } else {
      response.setHeader('Content-Type', 'application/json');
      response.status(404).send({ error: 'Meal not found.' });
    }
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json');
    response.status(500).send({ error })
  })
})

router.post('/:id/foods/:food_id', (request, response) => {
  return Meal.findOne({
    where: {
      id: request.params.id
    }
  })
  .then(meal => {
    if (meal) {
      return Food.findOne({
        where: {
          id: request.params.food_id
        }
      })
      .then(food => {
        if (food) {
          return meal.addFood(food)
          .then(() => {
            response.setHeader('Content-Type', 'application/json');
            response.status(201).send(JSON.stringify({ message: `Successfully added ${food.name} to ${meal.name}`})); 
          })
        } else {
          response.setHeader('Content-Type', 'application/json');
          response.status(404).send({ error: 'Food not found.' }); 
        } 
      })
    } else {
      response.setHeader('Content-Type', 'application/json');
      response.status(404).send({ error: 'Meal not found.' }); 
    }
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json');
    response.status(500).send({ error });
  })
})

router.delete('/:id/foods/:food_id', (request, response) => {
  return MealFood.findOne({
    where: {
      foodId: request.params.food_id,
      mealId: request.params.id
    }
  })
  .then(mealFood => {
    if (mealFood) {
      return mealFood.destroy()
      .then(destroyedMealFood => {
        response.setHeader('Content-Type', 'application/json');
        response.status(204).send(JSON.stringify(destroyedMealFood));
      })
    } else {
      response.setHeader('Content-Type', 'application/json');
      response.status(404).send({ error: 'Not found.' });
    }
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json');
    response.status(500).send({ error });
  })
})

module.exports = router;
