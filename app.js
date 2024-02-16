require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { readFile } = require('fs');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Setup database models after connecting to MongoDB
    require('./models/Account');
    
    // Setup the routes after connecting to MongoDB
    const authenticationRoutes = require('./routes/AuthentificationRoute');
    app.use('/auth', authenticationRoutes); // Use the authentication routes with base path /auth

    // Read JSON data
    let jsonData;
    readFile('./MP1.json', 'utf8', (error, data) => {
      if (error) {
        console.error('Error reading JSON file:', error);
        jsonData = null;
      } else {
        jsonData = JSON.parse(data);
      }
    });

    // Route for processing JSON data
    app.get('/processJson', (req, res) => {
      if (!jsonData) {
        return res.status(500).json({ error: 'JSON data not available' });
      }
      const result = {
        id: jsonData.id,
        name: jsonData.name,
        bundledProductOffering: jsonData.bundledProductOffering.map(product => ({
          id: product.id,
          name: product.name
        }))
      };
      res.json(result);
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
