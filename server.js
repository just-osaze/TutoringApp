/**
 * 1. Create an express server
 * 2. Connect to MongoDB
 * 3. Initialize Express
 * 4. Initialize middleware
 * 5. Create a simple get request route
 * 6. Inject routes
 * 7. Listen to app connection
 */

const express = require('express');
const connectDB = require('./db/main.js');
require('dotenv').config(); //allows for usage of environmental variables

//connect to DB
connectDB();

//Initialize express
const app = express();

//Initialize express middleware
app.use(express.json({ extended: false }));


//Create a basic route
app.get('/', (req, res) => {
  res.json ({ message: "Welcome to Tutoring App!!!" })
});

//PORT
// const port = process.env.PORT || PORT;

const port = 7168;

//Listen to app connection
app.listen(port, () => {
  console.log(`Server started and listening on port ${port}`)
});