const { program } = require('commander');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const driverPath = require('chromedriver').path;
const By = webdriver.By;
const Key = webdriver.Key;
const until = webdriver.until;

program
  .requiredOption('-w, --word_to_search <string>', 'word to be searched on google');

program.parse();
const options = program.opts();

async function start() {

  console.log(options.word_to_search)

  var service = new chrome.ServiceBuilder(driverPath).build();
  chrome.setDefaultService(service);

  var driver = await new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();

  await driver.get('http://www.google.com');
  var searchBox = driver.findElement(webdriver.By.name('q'));
  await searchBox.sendKeys(options.word_to_search, Key.RETURN);
  let el = driver.findElement(By.id("rso"));
  await driver.wait(until.elementIsVisible(el),3000);
  const searchList = driver.findElement(By.id("rso"));
  const linksContainers = await searchList.findElements(By.className("g"));
  var firstResult = await linksContainers[0].getText();
  console.log(firstResult);
  await driver.quit();

}

start();
