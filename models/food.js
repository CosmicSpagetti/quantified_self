var toTitleCase = require('../helpers/title_case')

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (food) => {
        food.name = toTitleCase(food.name);
      }
    }
  });
  Food.associate = function(models) {
    // associations can be defined here
  };
  return Food;
};
