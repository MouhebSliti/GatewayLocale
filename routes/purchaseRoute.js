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

module.exports = router;
