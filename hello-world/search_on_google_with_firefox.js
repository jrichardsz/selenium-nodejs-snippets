var webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
var By = webdriver.By;
var until = webdriver.until;

async function doit() {
  var driver = await new webdriver.Builder()
    .forBrowser('firefox')
    //set here the driver path (https://github.com/mozilla/geckodriver/releases)
    .setFirefoxService(new firefox.ServiceBuilder("/tmp/workspace/geckodriver"))
    .build();
  await driver.get('http://www.google.com');
  var searchBox = driver.findElement(webdriver.By.name('q'));
  await searchBox.sendKeys('selenium node automation');
  var result = await searchBox.getAttribute('value');
	console.log(result);
  await driver.quit();

}

doit();
