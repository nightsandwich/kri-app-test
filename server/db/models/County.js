const Sequelize = require('sequelize')
const db = require('../db')

const { STRING, TEXT, BOOLEAN } = Sequelize;

const County = db.define('county', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  summary: TEXT,
  inProject: {
    type: BOOLEAN,
    defaultValue: false
  }
});

module.exports = County