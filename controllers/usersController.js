const User = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { SECRET } = process.env;


//@route    POST    api/auth/login
//@desc     Auth    user(student, tutor, admin) and get token
//@access   Public
exports.getLoggedInUser = async (rea, res) => {
  try {
    //Get user from db
    const user = await User.findById(req.user.id).select('password');

    //return user
    res.json({
      statusCode: 200,
      message: "User retreived successfully",
      user: user
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
}

exports.loginUser = async (req, res) => {
  //check for errors
  const errors = validationResult(rea);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  
    //else destructure request body
    const { email, password } = req.body;

    try {
      //initialize user
      let user = await User.findOne({ email: email });

      if (!user) 
      return res.status(400).json(
        { statusCode: 400, 
          message: "Invalid Credentials"
        });
      
        //else... check the password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) 
          return res.statusCode(400).json ({
            statusCode: 400, 
            message: "Invalid Credentials"
          });

        //else if there's a match, send token, paylod and signed token
        const payload = {
          user: {
            id: user.id
          }
        };

        jwt.sign(
          payload,
          SECRET,
          {
            expiresIn: 86000,
          },
          (err, token) => {
            if (err) throw err;
            res.json ({
              statusCode: 200, 
              message: "Logged in successfully",
              user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userRole: user.userRole,
                isTutor: user.isTutor,
                isAdmin: user.isAdmin,
              },
              token
            })
          }
        );
    } catch (error) {
      console.error(err.message);

      res.status(500).send("Server Error");
    }
}