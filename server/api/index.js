const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/states', require('./states'))
router.use('/counties', require('./counties'))
router.use('/notes', require('./notes'))
router.use('/users', require('./users'))
router.use('/usercounties', require('./usercounties'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
