/**
 * 1. Create a connection function for MongoDB
 * 2. Start a local mongodb server connection
 */

const mongoose = require("mongoose");
require('dotenv').config();
const { MONGO_URI } = process.env;

//Async mongoose connection
const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});

		console.log('MongoDB connected!!!')

		// Seed data
	} catch (err) {
		console.error(err.message);

		//Exit upon failure
		process.exit(1);
	}
}

module.exports = connectDB; 