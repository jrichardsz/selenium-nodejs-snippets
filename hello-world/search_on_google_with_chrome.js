var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var driverPath = require('chromedriver').path;
var By = webdriver.By;
var Key = webdriver.Key;
var until = webdriver.until;

async function start() {

  var service = new chrome.ServiceBuilder(driverPath).build();
  chrome.setDefaultService(service);

  var driver = await new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();

  await driver.get('http://www.google.com');
  var searchBox = driver.findElement(webdriver.By.name('q'));
  await searchBox.sendKeys('selenium', Key.RETURN);
  let el = driver.findElement(By.id("rso"));
  await driver.wait(until.elementIsVisible(el),3000);
  const searchList = driver.findElement(By.id("rso"));
  const linksContainers = await searchList.findElements(By.className("g"));
  var firstResult = await linksContainers[0].getText();
  console.log(firstResult);
  await driver.quit();

}

start();
