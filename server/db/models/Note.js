const Sequelize = require('sequelize')
const db = require('../db')

const { STRING, TEXT, BOOLEAN } = Sequelize;

const Note = db.define('note', {
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  text: TEXT,
  link: STRING,
  paid: {
    type: BOOLEAN,
    defaultValue: false
  },
  password: {
    type: BOOLEAN,
    defaultValue: false
  }
});

module.exports = Note