const router = require('express').Router()
const isLoggedIn = require('../middleware/isLoggedIn'
)
const { models: { State, County, Note, User }} = require('../db')

module.exports = router

router.get('/', isLoggedIn, async(req, res, next)=> { 
  try {
    res.send(await County.findAll({
      include: [
        {
          model: State,
          include: Note
        },
        {
          model: Note, 
                  include: [
                      {
                        model: User,
                        attributes: ['id', 'initials']
                      }
                    ]
        }
      ]
    }));
  }
  catch(ex){
    next(ex);
  }
});
  
  router.get('/:id', isLoggedIn, async(req, res, next)=> {
    try {
      res.send(await County.findByPk(req.params.id, {
        include: [
          {
            model: State,
            include: Note
          },
          {
            model: Note,
            include: User
          }
        ]
      }));
    }
    catch(ex){
      next(ex);
    }
  });
  
  router.put('/:id', isLoggedIn, async(req, res, next)=> {
    const {name, summary, id, inProject} = req.body;
    // console.log(req.body)
    try {
      const _county = (await County.findByPk(id));
      await _county.update({name, summary, inProject});
      const county = await County.findByPk(id, {
        include: [
          {
            model: State,
            include: Note
          },
          {
            model: Note,
            include: User
          }
        ]
      })
      res.send(county);
    }
    catch(ex){
      next(ex);
    }
  });
  
  router.post('/', isLoggedIn, async(req, res, next)=> {
    try {
      
      const _county = (await County.create(req.body));
      const county = await County.findByPk(_county.id, {
        include: [
          {
            model: State,
            include: Note
          },
          {
            model: Note,
            include: User
          }
        ]
      })
      res.status(201).send(county);
    }
    catch(ex){
      next(ex);
    }
  });

  router.delete('/:id', isLoggedIn, async(req, res, next)=> {
    // console.log(req.params.id)
    try {
      const county = (await County.findByPk(req.params.id));
      await county.destroy();
      res.sendStatus(201)
    }
    catch(ex){
      next(ex);
    }
  });