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

module.exports = { mapDoses }
