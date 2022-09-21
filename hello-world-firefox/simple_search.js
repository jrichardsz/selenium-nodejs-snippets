var webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var driverPath = "/tmp/workspace/geckodriver"
var By = webdriver.By;
var Key = webdriver.Key;
var until = webdriver.until;

async function start() {


  var driver = await new webdriver.Builder()
    .forBrowser('firefox')
    .setFirefoxService(new firefox.ServiceBuilder(driverPath))
    .build();


  await driver.get('http://www.google.com');
  var searchBox = driver.findElement(webdriver.By.name('q'));
  await searchBox.sendKeys('selenium', Key.RETURN);
  let el = driver.findElement(By.id("rso"));
  await driver.wait(until.elementIsVisible(el), 3000);
  const searchList = driver.findElement(By.id("rso"));
  const linksContainers = await searchList.findElements(By.className("g"));
  var firstResult = await linksContainers[0].getText();
  console.log(firstResult);
  await driver.quit();

}

start();


/*
If you have the following error, your firefox version don't match with the geckodriver or its rare bug. Please use chrome instead:
(node:31229) UnhandledPromiseRejectionWarning: NoSuchElementError: Unable to locate element: *[id="rso"]
    at Object.throwDecodedError (/tmp/workspace/selenium-nodejs-snippets/hello-world/node_modules/selenium-webdriver/lib/error.js:539:15)
    at parseHttpResponse (/tmp/workspace/selenium-nodejs-snippets/hello-world/node_modules/selenium-webdriver/lib/http.js:647:13)
    at Executor.execute (/tmp/workspace/selenium-nodejs-snippets/hello-world/node_modules/selenium-webdriver/lib/http.js:573:28)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
    at async Driver.execute (/tmp/workspace/selenium-nodejs-snippets/hello-world/node_modules/selenium-webdriver/lib/webdriver.js:735:17)
    at async toWireValue (/tmp/workspace/selenium-nodejs-snippets/hello-world/node_modules/selenium-webdriver/lib/webdriver.js:140:15)
    at async /tmp/workspace/selenium-nodejs-snippets/hello-world/node_modules/selenium-webdriver/lib/webdriver.js:190:16
    at async forEachKey (/tmp/workspace/selenium-nodejs-snippets/hello-world/node_modules/selenium-webdriver/lib/webdriver.js:184:9)
    at async convertKeys (/tmp/workspace/selenium-nodejs-snippets/hello-world/node_modules/selenium-webdriver/lib/webdriver.js:189:3)
    at async Driver.execute (/tmp/workspace/selenium-nodejs-snippets/hello-world/node_modules/selenium-webdriver/lib/webdriver.js:733:22)
(Use `node --trace-warnings ...` to show where the warning was created)
(node:31229) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:31229) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
*/
