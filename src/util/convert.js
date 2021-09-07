const CsvParser = require('json2csv').Parser

const mapDoses = (data) => {
  let doses = []

  for (let i = 0; i < data.length; i++) {
    const dose = {
      municipio: data[i][0],
      doses_distribuidas: data[i][1],
      doses_aplicadas: data[i][2],
      porcentagem: isNaN(data[i][3])
        ? 0.0
        : Number(Number(data[i][3]).toFixed(2)),
    }

    doses.push(dose)
  }

  return doses
}

const toCsv = (data) => {
  let doses = []

  data.map((obj) => {
    const {
      municipio,
      doses_distribuidas,
      doses_aplicadas,
      porcentagem,
      data,
    } = obj

    doses.push({
      municipio,
      doses_distribuidas,
      doses_aplicadas,
      porcentagem,
      data,
    })
  })

  const csvFields = [
    'municipio',
    'doses_distribuidas',
    'doses_aplicadas',
    'porcentagem',
    'data',
  ]
  const csvParser = new CsvParser({
    csvFields,
    withBOM: true,
  })
  const csvData = csvParser.parse(doses)

  return csvData
}

module.exports = { mapDoses, toCsv }
