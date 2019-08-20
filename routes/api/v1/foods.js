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
})

module.exports = router;
