// routes/AuthenticationRoute.js

const express = require('express');
const router = express.Router();
const { signin, signup, updateCoins } = require('../controllers/userController'); // Import both signin and signup functions
const Account = require("../models/Account"); // Import the Account model

// Signin route
router.post('/signin', signin);

// Signup route
router.post('/signup', signup); 
router.post('/updateCoins', updateCoins);

// Route to fetch users
router.get('/users', async (req, res) => {
    try {
        const users = await Account.find();

        // Format the response
        const formattedResponse = {
            totalUsers: users.length,
            users: users.map((user, index) => {
                return {
                    [`user${index + 1}`]: {
                        ID_ORANGE: user.ID_ORANGE,
                        ID_META: user.ID_META,
                        email: user.email,
                        username: user.username,
                        token: user.token,
                        coins: user.coins
                    }
                };
            })
        };

        res.status(200).json(formattedResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
