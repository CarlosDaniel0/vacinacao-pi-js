const express = require('express')
const router = express.Router()
const doses = require('./doses')

router.get('/', async (req, res) => {
  res.send('Página em construção')
})
router.use('/doses', doses)

module.exports = router
