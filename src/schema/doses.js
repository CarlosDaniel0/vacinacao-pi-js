const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

/**
 * Município
 * Doses Distribuidas
 * Doses Aplicadas
 * Porcentagem
 * Data (de Atualização)
 */
const DosesSchema = new Schema(
  {
    id: ObjectId,
    municipio: String,
    doses_distribuidas: Number,
    doses_aplicadas: Number,
    porcentagem: Number,
    data: { type: Date, default: Date.now },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
)

module.exports = { DosesSchema }
