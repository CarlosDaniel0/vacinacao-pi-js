const { Builder, By } = require('selenium-webdriver')
const { Options } = require('selenium-webdriver/firefox')
const xlsx = require('node-xlsx').default
const fs = require('fs')
const { connection } = require('../database')
const { DosesSchema } = require('../schema/doses')
const { mapDoses } = require('../util/convert')

async function example() {
  // Options
  //   let options = new Options();
  //   options.setPreference("browser.download.folderList", 2);
  //   options.setPreference("browser.download.manager.showWhenStarting", false);
  //   options.setPreference("browser.download.dir", `${__dirname}/downloads`);
  //   options.setPreference("browser.download.useDownloadDir", true);
  //   options.setPreference(
  //     "browser.helperApps.neverAsk.saveToDisk",
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //   );
  //   options.headless();
  //   let driver = await new Builder()
  //     .forBrowser("firefox")
  //     .setFirefoxOptions(options)
  //     .build();

  //   try {
  //     await driver.get(
  //       "https://qsprod.saude.gov.br/extensions/DEMAS_C19Vacina/DEMAS_C19Vacina.html"
  //     );

  //     await driver.sleep(10000);

  //     await driver.executeScript(
  //       "document.querySelector('table').scrollIntoView()"
  //     );

  //     let elements = await driver.findElements(
  //       By.xpath("//table[@class='ng-scope']//td")
  //     );
  //     // Click no + de Nordeste
  //     await elements[6].click();
  //     await driver.sleep(2000);

  //     elements = await driver.findElements(
  //       By.xpath("//table[@class='ng-scope']//td")
  //     );
  //     // Click no - de AL
  //     await elements[13].click();
  //     await driver.sleep(5000);

  //     elements = await driver.findElements(
  //       By.xpath("//table[@class='ng-scope']//td")
  //     );
  //     // Click no + de PI
  //     await elements[56].click();
  //     await driver.sleep(5000);

  //     await driver.executeScript(
  //       "document.querySelector('#QV1-G11A').scrollIntoView()"
  //     );
  //     await driver.sleep(2000);

  //     await driver.findElement(By.xpath("//div[@id='QV1-G11A-menu']")).click();
  //     await driver.sleep(5000);
  //   } finally {
  //     await driver.quit();
  //   }

  try {
    fs.readdir(`${__dirname}/downloads`, async (err, files) => {
      const workSheetsFromBuffer = xlsx.parse(
        `${__dirname}/downloads/${files[0]}`
      )
      let data = workSheetsFromBuffer[0].data

      data.shift()

      // salvar no banco de dados

      const db = await connection()
      const Doses = db.model('doses', DosesSchema)

      const doses = mapDoses(data)

      Doses.remove({}, (err) => {
        if (err) console.log(err)
      })
      await Doses.insertMany(doses).catch((err) => {
        console.log(err)
      })

      db.disconnect()

      // Remover arquivo se downloads
      // fs.rm(`${__dirname}/downloads/${files[0]}`, (err) => {
      //   if (err) console.log(err)
      // })
    })
  } catch (err) {
    console.log(err)
  }
}

example()
