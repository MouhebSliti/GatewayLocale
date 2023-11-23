const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const https = require("https");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

async function fetchJsonDataFromApi() {
  try {
    const response = await axiosInstance.get(
      "https://catalog-product-catalog-staging-disco.apps.fr01.paas.tech.orange/productCatalogManagement/v1/productOffering/6c4820dc-89ae-4c7a-adb0-23e9384407b4"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

app.get('/processJson', async (req, res) => {
  try {
    const jsonData = await fetchJsonDataFromApi();

    const result = {
      id: jsonData.id,
      name: jsonData.name,
      bundledProductOffering: jsonData.bundledProductOffering.map(product => {
        return {
          id: product.id,
          name: product.name
        };
      })
    };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
