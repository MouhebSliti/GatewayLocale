const express = require('express');
const router = express.Router();
const axios = require('axios'); // Import axios for making HTTP requests

//request to handle buy action
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

//request to handle the confirmConf action
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

// request to handle the validation action
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

//request to handle the payment action

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

let notificationStatus = {}; // Object to store notification completion status for each user

router.post('/notification', async (req, res) => {
    try {
        const username = req.body.username;

        if (!notificationStatus[username] || !notificationStatus[username].isCompleted) {
            // If notification is not completed for this user, return nothing
            return res.status(200).json({ message: "No order notifications for now" });
        }

        // If notification is completed for this user, return the completed notification response
        const mockedNotifResponse = {
            id: "5c1b0a6c-5ae4-4c1b-ac40-a3209aa63eee",
            href: `https://poi-integration.apps.fr01.paas.tech.orange/5c1b0a6c-5ae4-4c1b-ac40-a3209aa63eee}`,
            orderDate: new Date().toISOString(),
            productOrderItem: [
                {
                    id: "dc105e36-e288-47f5-894d-0b422f85e54f",
                    quantity: 1,
                    action: "add",
                    productOffering: {
                        id: "5c1b0a6c-5ae4-4c1b-ac40-a3209aa63eee",
                        name: "Mobile Package 1",
                        "@type": "Contract"
                    },
                    bundledProductOffering: [
                        {
                            id: "a2s2qsd4qs4d-d1sq1d1qs5d-zezeae",
                            name: "Mobile Line"
                        },
                        {
                            id: "a2s2qsd4qs4zzd-d1sq1d1qs5d-zezeae",
                            name: "Connectivity"
                        },
                        {
                            id: "a2s2qsd4es4d-d1sq1d1qs5d-zezeae",
                            name: "Time Bundle"
                        },
                        {
                            id: "a2s2qsd4qs4d-d1sq1da1qs5d-zezeae",
                            name: "Sim Card"
                        },
                    ],
                    productOrderItemRelationship: [
                        {
                            id: "46df67c7-6a0d-450c-a327-4b6563742ce7",
                            relationshipType: "bundles"
                        }
                    ],
                    state: "completed",
                    "@type": "ProductOrderItem",
                    isInstallable: true
                }
            ],
            relatedParty: [
                {
                    id: req.body.ID_ORANGE,
                    name: req.body.username,
                    role: "customer",
                    "@referredType": "individual"
                }
            ],
            state: "completed",
            "@type": "ProductOrder"
            // Construct your mocked notification response here
        };

        res.status(200).json(mockedNotifResponse);
    } catch (error) {
        console.error('Error processing the notification request:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

router.post('/completeNotification', async (req, res) => {
    try {
        const username = req.body.username;

        notificationStatus[username] = { isCompleted: true };
        
        res.status(200).json({ message: "Notification completed" });
    } catch (error) {
        console.error('Error completing the notification:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});




module.exports = router;





