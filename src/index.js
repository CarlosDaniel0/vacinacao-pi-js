const express = require('express')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.get('/', (req, res) => {
    res.send('Chegou aqui BB')
})

app.listen(3000,() => {
    console.log('🚀 Server running in port 3000.\n\tClick here: http://localhost:3000')
})