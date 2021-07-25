const Sequelize = require('sequelize');
const sequelize = new Sequelize('crud', 'root', 'matrix1982*', {
    dialect: 'mysql', 
    host: 'localhost',
    port: 3306
});

module.exports = sequelize;