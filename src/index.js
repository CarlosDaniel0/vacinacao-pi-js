const express = require('express')
const routes = require('./routes/index')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `🚀 Server running in port ${
      process.env.PORT ? process.env.PORT : 3000
    }.\n\tClick here: http://localhost:${
      process.env.PORT ? process.env.PORT : 3000
    }`
  )
})
