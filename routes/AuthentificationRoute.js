const express = require('express');
const router = express.Router();
const { signin } = require('../controllers/userController');
const Account = require("../models/Account");


// Signin route
router.post('/signin', signin);

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
              token: user.token
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
