var shell = require('shellljs');

module.exports = () => {
  shell.exec('npx sequelize db:create');
  shell.exec('npx sequelize db:migrate');
}