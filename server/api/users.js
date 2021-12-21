const router = require('express').Router()
const isLoggedIn = require('../middleware/isLoggedIn'
)
const { models: { User }} = require('../db')
module.exports = router

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'initials', 'firstName']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
