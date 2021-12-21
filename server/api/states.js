const router = require('express').Router()
const isLoggedIn = require('../middleware/isLoggedIn'
)
const { models: { State }} = require('../db')

module.exports = router

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await State.findAll());
  }
  catch(ex){
    next(ex);
  }
})

router.put('/', isLoggedIn, async(req, res, next)=> {
  const { summary, id } = req.body;
  try {
      let state = (await State.findByPk(id));
      await state.update({...state, summary});
      state = await State.findByPk(id)
      res.send(state);
  }
  catch(ex){
      next(ex);
  }
});
