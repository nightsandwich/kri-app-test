//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const State = require('./models/State')
const County = require('./models/County')
const Note = require('./models/Note')

//associations could go here!
County.belongsTo(State);
State.hasMany(County);

Note.belongsTo(County);
County.hasMany(Note);

Note.belongsTo(State);
State.hasMany(Note);

Note.belongsTo(User);
User.hasMany(Note);

module.exports = {
  db,
  models: {
    User,
    State,
    County,
    Note
  },
}
