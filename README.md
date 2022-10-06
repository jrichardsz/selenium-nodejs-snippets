# selenium-nodejs-snippets


Simple collection of ready to use selenium samples with nodejs

# Requirements

- chromeor or firefox
- nodejs >= 14

# For Chrome

Go to example folder

```
export BROWSER=chrome
npm install chromedriver --detect_chromedriver_version
npm install
```

# For Firefox

- Go to example folder
- find the version of your firefox
- search the compatible version of geckodriver here https://firefox-source-docs.mozilla.org/testing/geckodriver/Support.html
- download the driver https://github.com/mozilla/geckodriver/releases

```
export BROWSER=firefox
export FIREFOX_SELENIUM_DRIVER_PATH=/foo/bar/geckodriver
npm install geckodriver@x.y.z
npm install
```


## Samples

| description | link |
|--|--|
|simple searches on google | [/01_search_on_google-world](./01_search_on_google) |


# Contributors

<table>
  <tbody>
    <td>
      <img src="https://avatars0.githubusercontent.com/u/3322836?s=460&v=4" width="100px;"/>
      <br />
      <label><a href="http://jrichardsz.github.io/">JRichardsz</a></label>
      <br />
    </td>    
  </tbody>
</table>
