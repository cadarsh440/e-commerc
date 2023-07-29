// Import the Express module
const express = require('express');

// Set the port number
const port = process.env.PORT || 8000;

// Create an instance of the Express application
const app = express();

const env = require('dotenv').config();

// middleware's for parsing data in database
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Import the Mongoose module for database connection
const db = require('./config/mongoose');

// Import the router for product-related routes
const productRouter = require('./routers/product');

// Use the product router for all routes starting with '/'
app.use('/products', productRouter);

// Start the server and listen on the specified port
app.listen(port, (err) => {
    if (err) {
        // Print an error message if the server fails to start
        console.log(`Error in connecting to the server: ${err}`);
    }
    // Print a success message if the server starts successfully
    console.log(`Server is up and running successfully on port: ${port}`);
});
