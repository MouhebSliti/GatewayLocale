const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const https = require("https");
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let Jsondata;  // Declare Jsondata outside the callback to make it accessible

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