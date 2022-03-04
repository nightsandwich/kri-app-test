const router = require('express').Router()
const isLoggedIn = require('../middleware/isLoggedIn'
)
const { models: { County}} = require('../db')

module.exports = router

router.get('/', isLoggedIn, async(req, res, next)=> { 
  try {
    res.send(await County.findAll());
  }
  catch(ex){
    next(ex);
  }
});
  
router.put('/', isLoggedIn, async(req, res, next)=> {
  const {name, summary, id, inProject} = req.body;
  try {
    let county = (await County.findByPk(id));
    await county.update({...county, name, summary, inProject});
    county = await County.findByPk(id)
    res.send(county);
  }
  catch(ex){
    next(ex);
  }
});

router.post('/', isLoggedIn, async(req, res, next)=> {
  try {
    const { name, summary, stateId } = req.body;
    let county = (await County.create({name, summary, stateId}));
    county = await County.findByPk(county.id)
    res.status(201).send(county);
  }
  catch(ex){
    next(ex);
  }
});

router.delete('/:id', isLoggedIn, async(req, res, next)=> {
  try {
    const county = (await County.findByPk(req.params.id));
    await county.destroy();
    res.sendStatus(201)
  }
  catch(ex){
    next(ex);
  }
});