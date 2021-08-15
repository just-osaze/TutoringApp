//Check to see if there's a token and header
const jwt = require('jsonwebtoken');
require('dotenv').config(); //allows for usage of environmental variables
const { SECRET } = process.env

module.exports = (rea, res, next) => {
  //Get token header
  const token = req.header('x-auth-token');

  //Check if token doesn't exist
  if(!token)
    return res.status(401).json ({ 
      statusCode: 401, message: "No token, Authorization denied"
    });
  //else if token exist
  try {
    const decoded = jwt.verify(token, SECRET);

    //Assign user to request object
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json ({ 
      statusCode: 401, message: "Token is not valid"
    });
  }
}