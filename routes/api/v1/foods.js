var express = require('express');

var Food = require('../../../models').Food;

var router = express.Router();

router.get('/', (request, response) => {
  return Food.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
  .then(foods => {
    response.setHeader('Content-Type', 'application/json');
    response.status(200).send(JSON.stringify(foods));
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json');
    response.status(500).send({ error })
  })
});

router.get('/:id', (request, response) => {
  return Food.findOne({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    where: {
      id: request.params.id
    }
  })
  .then(food => {
    if (food) {
    response.setHeader('Content-Type', 'application/json');
    response.status(200).send(JSON.stringify(food));
    } else {
      response.setHeader('Content-Type', 'application/json');
      response.status(404).send(JSON.stringify({error: "Food not found."}));
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
        response.status(202).send(JSON.stringify({
          id: updatedFood.id,
          name: updatedFood.name,
          calories: updatedFood.calories
        }));
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
