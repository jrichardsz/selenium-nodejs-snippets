const { program } = require('commander');
var webdriver = require('selenium-webdriver');
var SeleniumHelper = require('./SeleniumHelper.js');
var seleniumHelper = new SeleniumHelper();
const By = webdriver.By;
const Key = webdriver.Key;
const until = webdriver.until;

program
  .requiredOption('-w, --word_to_search <string>', 'word to be searched on google');

program.parse();
const options = program.opts();

async function start() {

  console.log(options.word_to_search)

  var driver = await seleniumHelper.getDriver();

  await driver.get('http://www.google.com');
  var searchBox = driver.findElement(webdriver.By.name('q'));
  await searchBox.sendKeys(options.word_to_search, Key.RETURN);
  const searchList = driver.findElement(By.id("rso"));
  const linksContainers = await searchList.findElements(By.className("g"));
  var firstResult = await linksContainers[0].getText();

  console.log("######## google first result ########");
  console.log(firstResult);
  await driver.quit();

}

start();
