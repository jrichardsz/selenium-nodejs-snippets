selenium-webdriver
Selenium is a browser automation library. Most often used for testing web-applications, Selenium may be used for any task that requires automating interaction with the browser.

Installation

Selenium may be installed via npm with

npm install selenium-webdriver
You will need to download additional components to work with each of the major browsers. The drivers for Chrome, Firefox, PhantomJS, Opera, and Microsoft's IE and Edge web browsers are all standalone executables that should be placed on your system PATH. Apple's safaridriver is shipped with Safari 10 for OS X El Capitan and macOS Sierra. You will need to enable Remote Automation in the Develop menu of Safari 10 before testing.

NOTE: Mozilla's geckodriver is only required for Firefox 47+. Everything you need for Firefox 38-46 is included with this package.
Browser	Component
Chrome	chromedriver(.exe)
Internet Explorer	IEDriverServer.exe
Edge	MicrosoftWebDriver.msi
Firefox 47+	geckodriver(.exe)
PhantomJS	phantomjs(.exe)
Opera	operadriver(.exe)
Safari	safaridriver
Usage

The sample below and others are included in the example directory. You may also find the tests for selenium-webdriver informative.

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

driver.get('http://www.google.com/ncr');
driver.findElement(By.name('q')).sendKeys('webdriver');
driver.findElement(By.name('btnG')).click();
driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driver.quit();
Using the Builder API

The Builder class is your one-stop shop for configuring new WebDriver instances. Rather than clutter your code with branches for the various browsers, the builder lets you set all options in one flow. When you call Builder#build(), all options irrelevant to the selected browser are dropped:

var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    firefox = require('selenium-webdriver/firefox');

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .setChromeOptions(/* ... */)
    .setFirefoxOptions(/* ... */)
    .build();
Why would you want to configure options irrelevant to the target browser? The Builder's API defines your default configuration. You can change the target browser at runtime through the SELENIUM_BROWSER environment variable. For example, the example/google_search.js script is configured to run against Firefox. You can run the example against other browsers just by changing the runtime environment

# cd node_modules/selenium-webdriver
node example/google_search
SELENIUM_BROWSER=chrome node example/google_search
SELENIUM_BROWSER=safari node example/google_search
The Standalone Selenium Server

The standalone Selenium Server acts as a proxy between your script and the browser-specific drivers. The server may be used when running locally, but it's not recommend as it introduces an extra hop for each request and will slow things down. The server is required, however, to use a browser on a remote host (most browser drivers, like the IEDriverServer, do not accept remote connections).

To use the Selenium Server, you will need to install the JDK and download the latest server from Selenium. Once downloaded, run the server with

java -jar selenium-server-standalone-2.45.0.jar
You may configure your tests to run against a remote server through the Builder API:

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .usingServer('http://localhost:4444/wd/hub')
    .build();
Or change the Builder's configuration at runtime with the SELENIUM_REMOTE_URL environment variable:

SELENIUM_REMOTE_URL="http://localhost:4444/wd/hub" node script.js
You can experiment with these options using the example/google_search.js script provided with selenium-webdriver.

Documentation

API documentation is available online from the Selenium project. Additional resources include

the #selenium channel on freenode IRC
the selenium-users@googlegroups.com list
SeleniumHQ documentation
Contributing

Contributions are accepted either through GitHub pull requests or patches via the Selenium issue tracker. You must sign our Contributor License Agreement before your changes will be accepted.

Node Support Policy

Each version of selenium-webdriver will support the latest semver-minor version of the LTS and stable Node releases. All semver-major & semver-minor versions between the LTS and stable release will have "best effort" support. Following a Selenium release, any semver-minor Node releases will also have "best effort" support. Releases older than the latest LTS, semver-major releases, and all unstable release branches (e.g. "v.Next") are considered strictly unsupported.

For example, suppose the current LTS and stable releases are v6.9.5 and v7.5.0, respectively. Then a Selenium release would have the following support levels:

Version	Support
<= 6.8	unsupported
6.9	supported
7.0-4	best effort
7.5	supported
>= 7.5	best effort
v.Next	unsupported
Support Level Definitions

supported: A selenium-webdriver release will be API compatible with the platform API, without the use of runtime flags.

best effort: Bugs will be investigated as time permits. API compatibility is only guaranteed where required by a supported release. This effectively means the adoption of new JS features, such as ES2015 modules, will depend on what is supported in Node's LTS.

unsupported: Bug submissions will be closed as will-not-fix and API compatibility is not guaranteed.

Projected Support Schedule

If Node releases a new LTS each October and a new major version every 6 months, the support window for selenium-webdriver will be roughly:

Date	LTS	Stable
(current)	6.9	7.5
2017-04	6.0	8.0
2017-10	8.0	9.0
2018-04	8.0	10.0
2018-10	10.0	11.0
Issues

Please report any issues using the Selenium issue tracker. When using the issue tracker

Do include a detailed description of the problem.
Do include a link to a gist with any interesting stack traces/logs (you may also attach these directly to the bug report).
Do include a reduced test case. Reporting "unable to find element on the page" is not a valid report - there's nothing for us to look into. Expect your bug report to be closed if you do not provide enough information for us to investigate.
Do not use the issue tracker to submit basic help requests. All help inquiries should be directed to the user forum or #selenium IRC channel.
Do not post empty "I see this too" or "Any updates?" comments. These provide no additional information and clutter the log.
Do not report regressions on closed bugs as they are not actively monitored for upates (especially bugs that are >6 months old). Please open a new issue and reference the original bug in your report.
License

Licensed to the Software Freedom Conservancy (SFC) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The SFC licenses this file to you under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.