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
  var searchBox = await driver.findElement(webdriver.By.name('q'));
  await searchBox.sendKeys('jrichardsz', Key.RETURN);

  await driver.wait(until.elementIsVisible(driver.findElement(By.id("result-stats"))),3000);

  const resultStats = await driver.findElement(By.id("result-stats")).getText();
  console.log(resultStats);
  await driver.quit();
}

start();
