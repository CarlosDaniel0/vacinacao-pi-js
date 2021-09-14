const CsvParser = require('json2csv').Parser
const fs = require('fs')

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

const getData = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, file) => {
      if (err) return reject(err)
      let res = []
      const data = file.toString().split(/\r?\n/)

      data.map((e) => {
        res.push(e.split(','))
      })

      return resolve(res)
    })
  })

const toCsv = async (data) => {
  let doses = []
  let dir = __dirname.split('/')
  dir.pop()
  dir = dir.join('/')

  let csv = await getData(`${dir}/public/assets/nomes_municipios.csv`)

  csv.shift()
  data.map((obj) => {
    const item = csv.find(
      (element) =>
        element[1].toLocaleLowerCase() == obj.municipio.toLocaleLowerCase()
    )

    const {
      municipio,
      doses_distribuidas,
      doses_aplicadas,
      porcentagem,
      data,
    } = obj

    if (item) {
      doses.push({
        codarea: Number(item[0]),
        municipio,
        doses_distribuidas,
        doses_aplicadas,
        porcentagem,
        data,
      })
    }
  })

  const csvFields = [
    'codarea',
    'municipio',
    'doses_distribuidas',
    'doses_aplicadas',
    'porcentagem',
    'data',
  ]

  //'codarea', 'municipio', 'total_doses', 'doses_aplicadas', 'porcentagem'
  const csvParser = new CsvParser({
    csvFields,
    withBOM: true,
  })

  console.log(doses.length)
  const csvData = csvParser.parse(doses)
  return csvData
}

module.exports = { mapDoses, toCsv }
