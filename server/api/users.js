const router = require('express').Router()
const isLoggedIn = require('../middleware/isLoggedIn'
)
const { models: { User }} = require('../db')
module.exports = router

// router.get('/', isLoggedIn, async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and username fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'initials', 'firstName', 'lastName']
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })
router.put('/', isLoggedIn, async (req, res, next) => {
  const { id, initials, firstName, lastName, password } = req.body;
  try {
    let user = await User.findByPk(id)
    await user.update({ ...user, initials, firstName, lastName, password})
    user = await User.findByPk(id, {
      attributes: ['id', 'initials', 'firstName', 'lastName']
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
