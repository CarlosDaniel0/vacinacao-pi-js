const { connection } = require('../database')
const { DosesSchema } = require('../schema/doses')
const { toCsv } = require('../util/convert')

const getAll = async (req, res) => {
  const db = await connection()
  const Doses = db.model('doses', DosesSchema)

  let doses = []
  try {
    doses = await Doses.find()
  } catch (err) {
    console.log('Houve um erro: ', err)
  }
  db.disconnect()

  if (!req.query.type) res.send(doses)
  if (req.query.type == 'csv') {
    doses = await toCsv(doses)
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename=data.csv')
    res.send(doses).end()
  }
}

module.exports = { getAll }
