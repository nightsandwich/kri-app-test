const router = require('express').Router()
const isLoggedIn = require('../middleware/isLoggedIn'
)
const { models: { UserCounty, County }} = require('../db')
module.exports = router

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const {user} = req
    const userCounties = await UserCounty.findAll({
      where: {
        userId: user.id
      }, 
      include: County
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
    let userCounty = await UserCounty.create({ 
      userId: user.id,
      countyId: countyId
    })
    userCounty = await UserCounty.findByPk(userCounty.id, {
      include: County
    })
    res.json(userCounty)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isLoggedIn, async(req, res, next)=> {
  try {
    const userCounty = (await UserCounty.findByPk(req.params.id));
    await userCounty.destroy();
    res.sendStatus(201)
  }
  catch(ex){
    next(ex);
  }
});
