var express = require('express');

var Food = require('../../../models').Food;

var router = express.Router();

router.get('/', (request, response) => {
  return Food.findAll()
  .then(foods => {
    response.setHeader('Content-Type', 'application/json');
    response.status(200).send(JSON.stringify(foods, ['id', 'name', 'calories']));
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json');
    response.status(500).send({ error })
  })
});

router.get('/:id', (request, response) => {
  return Food.findOne({
    where: {
      id: request.params.id
    }
  })
  .then(food => {
    if (food) {
    response.setHeader('Content-Type', 'application/json');
    response.status(200).send(JSON.stringify(food, ['id', 'name', 'calories']));
    } else {
      response.setHeader('Content-Type', 'application/json');
      response.status(404).send(JSON.stringify({error: 'Food not found.'}));
    }
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json');
    response.status(500).send({ error })
  })
})

router.patch('/:id', (request, response) => {
  return Food.findOne({
    where: {
      id: request.params.id,
    }
  })
  .then(food => {
    if (food) {
      return food.update({
        name: request.body.name,
        calories: request.body.calories,
      })
      .then(updatedFood => {
        response.setHeader('Content-Type', 'application/json');
        response.status(202).send(JSON.stringify(updatedFood, ['id', 'name', 'calories'] )
        );
      })
      .catch(error => {
        response.setHeader('Content-Type', 'application/json');
        response.status(500).send({ error });
      })
    } else {
      response.setHeader('Content-Type', 'application/json');
      response.status(404).send(JSON.stringify({ error: 'Food not found.' }));
    }
  })
})

router.post('/', (request, response) => {
  return Food.create({
    name: request.body.name,
    calories: request.body.calories
  })
  .then(food => {
    response.setHeader('Content-Type', 'application/json')
    response.status(201).send(JSON.stringify(food, ['id', 'name', 'calories'] ));
  })
  .catch(() => {
    response.setHeader('Content-Type', 'application/json')
    response.status(400).send(JSON.stringify({ error: 'Food not created.' }));
  })
})

router.delete('/:id', (request, response) => {
  return Food.findOne({
    where: {
      id: request.params.id,
    }
  })
  .then(food => {
    if (food) {
      return food.destroy()
      .then(destroyedFood => {
        response.setHeader('Content-Type', 'application/json');
        response.status(204).send(JSON.stringify(destroyedFood))
      })
      .catch(error => {
        response.setHeader('Content-Type', 'application/json');
        response.status(500).send({ error });
      })
    } else {
      response.setHeader('Content-Type', 'application/json');
      response.status(404).send(JSON.stringify({ error: 'Food not found.' }));
    }
  })
})

module.exports = router;
