const router = require('express').Router()
const isLoggedIn = require('../middleware/isLoggedIn'
)
const { models: { State, County, Note, User }} = require('../db')

module.exports = router

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    // res.send(await State.findAll({
    //   include: [
    //     {
    //       model: County,
    //       include: Note
    //     },
    //     {
    //       model: Note, 
    //           include: [
    //               {
    //                 model: User,
    //                 attributes: ['id', 'initials']
    //               }
    //             ]
    //     }
    //   ]
    // }));
    res.send(await State.findAll());
  }
  catch(ex){
    next(ex);
  }
})

router.get('/:id', isLoggedIn, async(req, res, next)=> {
  try {
      res.send(await State.findByPk(req.params.id, {
          include: [
              {
              model: County,
              include: Note,
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
  const { summary} = req.body;
  try {
      const _state = (await State.findByPk(req.params.id));
      await _state.update({summary});
      const state = await State.findByPk(req.params.id, {
          include: [
              {
              model: County,
              include: Note,
              },
              {
              model: Note,
              include: User
              }
          ]
      })
      res.send(state);
  }
  catch(ex){
      next(ex);
  }
});

router.get('/:id/counties', isLoggedIn, async(req, res, next)=> {
  try {
      res.send(await County.findAll({ 
      where: { 
          stateId: req.params.id
      },
      include: [
          {
          model: Note
          },
          {
          model: State
          }
      ]
      }
      ));
  }
  catch(ex){
      next(ex);
  }
});

router.get('/:id/notes', isLoggedIn, async(req, res, next)=> {
  try {
      res.send(await Note.findAll(
      { 
          where: 
          { 
          stateId: req.params.id
          },
          include: [
          {
              model: County
          },
          {
              model: State
          }
          ]
      }
      ));
  }
  catch(ex){
      next(ex);
  }
});