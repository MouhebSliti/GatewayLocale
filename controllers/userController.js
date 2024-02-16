const Account = require("../models/Account");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Email received :", email); // Log the type of the received email

    const user = await Account.findOne({ email });
    //console.log("User found:", user.username); // Log the user object retrieved from the database

    // Check if user with the provided email exists
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    } 

    // Check if the provided password matches the password stored in the database
    if (password === user.password) {
      // Create and sign a JWT token
      const token = jwt.sign({ id: user.id }, "" + process.env.jwtSecret, {
        expiresIn: "10y",
      });

      // Return user data and JWT token in the response
      const UserInfoResponse = {
        ID_ORANGE: user.ID_ORANGE,
        ID_META: user.ID_META,
        email: user.email,
        username: user.username,
        token,
      };
      return res.status(200).json(UserInfoResponse);
    } else {
      return res.status(401).json({ error: "Invalid password" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { signin };
