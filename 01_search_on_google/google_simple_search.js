var webdriver = require('selenium-webdriver');
var SeleniumHelper = require('./SeleniumHelper.js');
var seleniumHelper = new SeleniumHelper();
var By = webdriver.By;
var Key = webdriver.Key;
var until = webdriver.until;

async function start() {

  var driver = await seleniumHelper.getDriver();
  await driver.get('http://www.google.com');

  var searchBox = driver.findElement(webdriver.By.name('q'));
  await searchBox.sendKeys('selenium', Key.RETURN);
  
  const searchList = driver.findElement(By.id("rso"));
  await driver.wait(until.elementIsVisible(searchList),3000);
  const linksContainers = await searchList.findElements(By.className("g"));
  
  var firstResult = await linksContainers[0].getText();
  
  console.log("######## google first result ########");
  console.log(firstResult);
  await driver.quit();

}

start();
