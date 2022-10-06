# Requirements

- chrome
- nodejs >= 14

# Libraries

```
npm install chromedriver --detect_chromedriver_version
npm install
```

# Examples

| script| descripcion |
|:--|:--|
|`node google_simple_search.js`|A simple search on google|
|`node google_simple_search_with_variable.js --word_to_search Java`|Receive a word as argument, 
search it on and print the first result count|
|`node google_get_search_count.js`|Search a word and obtain the result count|
