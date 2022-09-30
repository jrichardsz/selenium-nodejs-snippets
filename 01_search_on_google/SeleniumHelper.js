var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var firefox = require('selenium-webdriver/firefox');

function SeleniumHelper() {

    this.getDriver = async() => {
        if (process.env.BROWSER.toLowerCase() === "chrome") {
            var driverPath = require('chromedriver').path;
            var service = new chrome.ServiceBuilder(driverPath).build();
            chrome.setDefaultService(service);

            var driver = await new webdriver.Builder()
                .withCapabilities(webdriver.Capabilities.chrome())
                .build();
            return driver;
        } else if (process.env.BROWSER.toLowerCase() === "firefox") {

            if (typeof process.env.FIREFOX_SELENIUM_DRIVER_PATH === 'undefined') {
                throw new Error("Selenium for firefox require the FIREFOX_SELENIUM_DRIVER_PATH env var");
            }

            var driverPath = process.env.FIREFOX_SELENIUM_DRIVER_PATH;
            var driver = await new webdriver.Builder()
                .forBrowser('firefox')
                .setFirefoxService(new firefox.ServiceBuilder(driverPath))
                .build();
            return driver;

        } else {
            throw new Error("Not supported browser:" + process.env.BROWSER);
        }
    };
}

module.exports = SeleniumHelper;