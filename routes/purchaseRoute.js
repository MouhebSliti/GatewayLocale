const express = require('express');
const router = express.Router();
const axios = require('axios'); // Import axios for making HTTP requests

// POST request to handle buy action
router.post('/buy', async (req, res) => {
    try {
        // Extract necessary data from the request body
        const { ID_ORANGE, username, productId } = req.body;

        // Construct the JSON payload
        const payload = {
            processFlowSpecification: "OrderCapture",
            channel: [
                {
                    id: "004",
                    name: "METAVERSE"
                }
            ],
            relatedEntity: [
                {
                    id: productId,
                    "@referredType": "productOffering"
                }
            ],
            relatedParty: [
                {
                    id: ID_ORANGE,
                    name: username,
                    role: "customer",
                    "@referredType": "individual"
                }
            ]
        };

        // Make POST request to external API
        const response = await axios.post('https://clever-blue-bear.cyclic.app/mock/processFlow', payload );
        // Handle the response from the external API
        // Uncomment the following line if you want to log the success response
         console.log('Success:', response.data);

        // Send the data received from the external API in the response to the client
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error processing buy request:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});


// POST request to handle the confirmConf action
router.post('/confirmConf', async (req, res) => {
    
    try {
        // Extract necessary data from the request body
        const { ID_ORANGE, username } = req.body;

        // Construct the JSON payload
        const payload = {
            channel: [
                {
                    id: "004",
                    name: "METAVERSE"
                }
            ],
            relatedParty: [
                {
                    id: ID_ORANGE,
                    name: username,
                    role: "customer",
                    "@referredType": "individual"
                }
            ],
            characteristic: [
                {
                    name: "ConfirmConfigurationIsProcessed",
                    valueType: "Object",
                    value: {
                        "configuration.id": "ACK",
                        "configuration.state": "confValidated"
                    },
                    "@type": "ObjectCharacteristic"
                }
            ]
        };

        // Make POST request to another backend endpoint
        const response = await axios.post('https://clever-blue-bear.cyclic.app/mock/confirmConf', payload);
        // Log the success response
        console.log('Success:', response.data);

        // Send the data received from the external API in the response to the client
        res.status(200).json(response.data);
    } catch (error) {
        // Log and handle errors
        console.error('Error processing confirmConf request:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

router.post('/validateOrder', async (req, res) => {
    
    try {
        // Extract necessary data from the request body
        const { ID_ORANGE, username } = req.body;

        // Construct the JSON payload
        const payload = {
            "relatedParty": [
              {
                "id": ID_ORANGE,
                "name": username,
                "role": "customer",
                "@referredType": "individual"
              }
            ],
            "characteristic": [
              {
                "name": "ValidateOrderByCustomer",
                "valueType": "Object",
                "value": {
                  "productOrderId": "65d4caf69d6c4567d4b6da47",
                  "orderValidationStatus": "orderValidatedByCustomer"
                },
                "@baseType": null,
                "@schemaLocation": null,
                "@type": "ObjectCharacteristic"
              }
            ]
          };

        // Make POST request to another backend endpoint
        const response = await axios.post('https://clever-blue-bear.cyclic.app/mock/validateorder', payload);
        // Log the success response
        console.log('Success:', response.data);

        // Send the data received from the external API in the response to the client
        res.status(200).json(response.data);
    } catch (error) {
        // Log and handle errors
        console.error('Error processing confirmConf request:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});


router.post('/payOrder', async (req, res) => {
    try {
        // Extract necessary data from the request body
        const { ID_ORANGE, username, paymentRefId } = req.body;

        // Construct the JSON payload
        const payload = {
            "relatedParty": [
              {
                "id": ID_ORANGE,
                "name": username,
                "role": "customer",
                "@referredType": "individual"
              }
            ],
            "characteristic": [
              {
                "name": "ProvidePaymentRef",
                "id":paymentRefId,
                "valueType": "Object",
                "value": {
                  "paymentRefId": [
                    {
                      "id": "paid_100"
                    }
                  ]
                },
                "@type": "ObjectCharacteristic"
              },
              {
                "name": "OrderItemToBePaid",
                "value": "{{order_item_id1}}",
                "characteristicRelationship": [
                  {
                    "id": paymentRefId,
                    "relationshipType": "relatedTo"
                  }
                ],
                "valueType": "Object",
                "@type": "ObjectCharacteristic"
              }
            ],
            "@type": "TaskFlow"
          };

        // Make POST request to another backend endpoint for payment
        const response = await axios.post('https://clever-blue-bear.cyclic.app/mock/payOrder', payload);
        // Log the success response
        console.log('Success:', response.data);

        // Send the data received from the external API in the response to the client
        res.status(200).json(response.data);
    } catch (error) {
        // Log and handle errors
        console.error('Error processing the payOrder request:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;




module.exports = router;

