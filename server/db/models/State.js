const Sequelize = require('sequelize')
const db = require('../db')

const { STRING, TEXT } = Sequelize;

const State = db.define('state', {
  name: STRING,
  abbreviation: STRING,
  summary: TEXT,
});

module.exports = State