let fetch = require("node-fetch");
// Open source API to get last closing stock price of given companies
fetch('https://api.iextrading.com/1.0/tops/last?symbols=GLUU,HUYA,ZNGA')
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => console.error(error))