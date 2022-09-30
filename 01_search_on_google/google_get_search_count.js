var webdriver = require('selenium-webdriver');
var SeleniumHelper = require('./SeleniumHelper.js');
var seleniumHelper = new SeleniumHelper();
var By = webdriver.By;
var Key = webdriver.Key;
var until = webdriver.until;

async function start() {

  var driver = await seleniumHelper.getDriver();

  await driver.get('http://www.google.com');
  var searchBox = await driver.findElement(webdriver.By.name('q'));
  await searchBox.sendKeys('JRichardsz.java', Key.RETURN);

  await driver.wait(until.elementIsVisible(driver.findElement(By.id("result-stats"))),3000);

  const resultStats = await driver.findElement(By.id("result-stats")).getText();
  console.log(resultStats);
  await driver.quit();
}

start();
