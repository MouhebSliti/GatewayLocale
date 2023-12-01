const bodyParser = require("body-parser");
const fs = require('fs');
const express = require("express");

const app = express();
const port = 3000;

app.use(bodyParser.json());

let Jsondata;

fs.readFile("./MP1.json", "utf8", (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  Jsondata = JSON.parse(data);
});

app.get('/processJson', (req, res) => {
  const result = {
    id: Jsondata.id,
    name: Jsondata.name,
    bundledProductOffering: Jsondata.bundledProductOffering.map(product => {
      return {
        id: product.id,
        name: product.name
      };
    })
  };

  res.json(result);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});