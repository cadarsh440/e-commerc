// Import the Mongoose module
const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

// Create the Product model using the product schema
const Product = mongoose.model('product', productSchema);

// Export the Product model
module.exports = Product;
