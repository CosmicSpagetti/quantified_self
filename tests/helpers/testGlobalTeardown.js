var shell = require('shellljs');

module.exports = () => {
  shell.exec('npx sequelize db:drop');
}