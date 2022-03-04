const router = require('express').Router()
const isLoggedIn = require('../middleware/isLoggedIn'
)
const { models: { UserCounty, State }} = require('../db')
module.exports = router

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const {user} = req
    const userCounties = await UserCounty.findAll({
      where: {
        userId: user.id
      }
    })
    res.json(userCounties)
  } catch (err) {
    next(err)
  }
})

router.post('/', isLoggedIn, async (req, res, next) => {
  const {user} = req
  const { countyId } = req.body;
  try {
    const userCounty = await UserCounty.create({ 
      userId: user.id,
      countyId: countyId
    })
    res.json(userCounty)
  } catch (err) {
    next(err)
  }
})
