const { program } = require('commander');
const {By, Key, Builder, until} = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
var SeleniumHelper = require('./SeleniumHelper.js');
var seleniumHelper = new SeleniumHelper();

program.requiredOption('-w, --attribute_to_validate <string>', 'Atributo a validar');
program.requiredOption('-e, --expected_value <string>', 'Valor esperado');
program.parse();
const options = program.opts();

let driver;

async function wiki_search() {
    driver = await seleniumHelper.getDriver();
    
    try {
        // ## NAVEGANDO
        await driver.get('https://es.wikipedia.org/wiki/Wikipedia:Portada');
    
        // ## BUSCAR USIL
        await driver.findElement(By.name('search')).sendKeys('Universidad San Ignacio de Loyola', Key.ENTER);

        // ## ESTABLECIENDO ESPERA
        await driver.manage().setTimeouts({ implicit: 500 });
    } catch {
        console.log('esperando en wiki_search');
    }
}

async function usil_search() {
    try {
        // ## ESPERAR A ENCONTRAR CAJA DE RESULTADOS
        await driver.wait(until.elementLocated(By.className('mw-search-results-container')), 30000, 'Timed out after 30 seconds', 5000);

        // ## ACCEDER A LISTA DE RESULTADOS DONDE...USIL Y CLICK
        await driver.findElement(By.css("a[title='Universidad San Ignacio de Loyola']")).click();
    } catch {
        console.log('esperando en usil_search');
    }
}

async function title_search() {

    let arrData = [];

    // ## OBTENER classname 'infobox'
    //let infobox = driver.findElement(By.className('infobox'));
    // ## ESTABLECIENDO ESPERA
    //await driver.manage().setTimeouts({ implicit: 500 });

    let infobox = await driver.wait(until.elementLocated(By.className('infobox')), 30000, 'Timed out after 30 seconds', 5000);

    // ## OBTENER tr DE infobox
    let tr = await infobox.findElements(By.css('tr'));

    // ## RECORREMOS LISTA tr
    for (let item of tr) {
        // BUSCAMOS th Y td
        try {
            let th = await item.findElement(By.css('th')).getText();
            let td = await item.findElement(By.css('td')).getText();

            // ## push EN arrData([th, td])
            arrData.push(['', td]);
            arrData[arrData.length - 1][0] = th.toUpperCase();
        } catch(error) {
            // ## NO ENCUENTRA td, siguiente tr
        }
    }

    return arrData;
}

wiki_search()
.then(() => {
    usil_search();
})
.then(() => {
    return title_search();
})
.then((ARR) => {
    let search = ARR.find(element => element[0] == options.attribute_to_validate.toUpperCase());
    if (search !== undefined) {
        if (search[1] === options.expected_value) {
            console.log('Result: Success');
        } else {
            console.log('Diferente al valor esperado');
        }
    } else {
        console.log('No se encuentra título');
    }
})
.then(() => {
    driver.quit();
});
