const router = require('express').Router()
const isLoggedIn = require('../middleware/isLoggedIn'
)
const { models: { Note, User }} = require('../db')

module.exports = router

router.put('/', isLoggedIn, async(req, res, next)=> {
  const {id, text, link, title, paid, password, userId} = req.body;
  try {
    let note = (await Note.findByPk(id));
    await note.update({...note, text, link, title, paid, password, userId});
    note = await Note.findByPk(id, {
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
  }
  catch(ex){
    next(ex)
  }
});

router.post('/', isLoggedIn, async(req, res, next)=> {
  try {
    let note = (await Note.create(req.body));
    note = (await Note.findByPk(note.id, {
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
