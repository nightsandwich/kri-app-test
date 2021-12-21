const router = require('express').Router()
const isLoggedIn = require('../middleware/isLoggedIn'
)
const { models: { State, County, Note, User }} = require('../db')

module.exports = router

router.put('/:id', isLoggedIn, async(req, res, next)=> {
  const {text, link, title, paid, password, userId} = req.body;
  try {
    const _note = (await Note.findByPk(req.params.id));
    await _note.update({text, link, title, paid, password, userId});
    // const note = await Note.findByPk(req.params.id, {
    //   include: [
    //     {
    //       model: State
    //     },
    //     {
    //       model: County
    //     },
    //     {
    //       model: User
    //     }
    //   ]
    // })
    const note = await Note.findByPk(req.params.id, {
      include: User
    })
    res.send(note);
  }
  catch(ex){
    next(ex);
  }
});

router.get('/', isLoggedIn, async(req, res, next)=> {
  try{
    res.send(await Note.findAll({
      include: User
    }));
    // res.send(await Note.findAll({
    //   include: [
    //     {
    //       model: State
    //     },
    //     {
    //       model: County
    //     },
    //     {
    //       model: User, 
    //       attributes: ['initials', 'id']
    //     }
    //   ]
    // }));
  }
  catch(ex){
    next(ex)
  }
});

router.post('/', isLoggedIn, async(req, res, next)=> {
  try {
    const _note = (await Note.create(req.body, {
      include: User
    }));
    // const note = (await Note.findByPk(_note.id, {
    //   include: [
    //     {
    //       model: State
    //     },
    //     {
    //       model: County
    //     },
    //     {
    //       model: User
    //     }
    //   ]
    // }))
    const note = (await Note.findByPk(_note.id, {
      include: User
    }))
    res.status(201).send(note);
  }
  catch(ex){
    next(ex);
  }
});

router.delete('/:id', isLoggedIn, async(req, res, next)=> {
  try {
    const note = (await Note.findByPk(req.params.id));
    await note.destroy();
    res.sendStatus(201)
  }
  catch(ex){
    next(ex);
  }
});
