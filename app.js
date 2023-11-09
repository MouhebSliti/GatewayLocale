const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const https = require("https");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/processJson', (req, res) => {
  const mobilePackage = req.body;

  const result = {
    id: mobilePackage.id,
    name: mobilePackage.name,
    bundledProductOffering: mobilePackage.bundledProductOffering.map(product => {
      return {
        id: product.id,
        name: product.name
      };
    })
  };

  res.json(result);
});

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

app.get("/product/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const response = await axiosInstance.get(
      `https://catalog-product-catalog-staging-disco.apps.fr01.paas.tech.orange/productCatalogManagement/v1/productOffering/${productId}`
    );

    const productInfo = response.data;
    res.json(productInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
