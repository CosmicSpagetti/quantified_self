var express = require('express');

var Food = require('../../../models').Food;

var router = express.Router();

router.get('/', (request, response) => {
  return Food.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] }
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

module.exports = router;
