const express = require('express')
const router = express.Router()
const doses = require('./doses')

router.get('/', async (req, res) => {
  res.render('pages/index')
})
router.use('/doses', doses)

module.exports = router
