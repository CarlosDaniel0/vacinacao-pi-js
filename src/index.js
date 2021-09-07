const express = require('express')
const routes = require('./routes/index')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use(express.static(__dirname + '/public'))

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `🚀 Server running in port ${
      process.env.PORT ? process.env.PORT : 3000
    }.\n\tClick here: http://localhost:${
      process.env.PORT ? process.env.PORT : 3000
    }`
  )
})
