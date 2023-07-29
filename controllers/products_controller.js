const Product = require('../models/product');

// to get all the products
module.exports.products = async (req, res) => {
    try {
        const products = await Product.find()
        if (products.length === 0) {
            return res.status(400).json({
                message: "No products found"
            });
        }
        return res.status(200).json({
            data: {
                products: products
            },
            message: "All products"
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error in fetching the products"
        });
    }
};

// for creating the product
module.exports.create = async (req, res) => {
    try {
        if (!req.body.name || !req.body.quantity) {
            return res.status(400).json({
                message: "please enter name and quantity"
            });
        }
        const newProduct = await Product.create(req.body);
        return res.status(201).json({
            data: {
                product: newProduct
            },
            message: "Product Created successfully"
        })
    } catch (err) {
        return res.status(500).json({
            data: {
                err: err
            },
            message: "Error in Creating the product"
        });
    }
};

// for deleting the product
module.exports.delete = async (req, res) => {
    try {
        const productId = await req.params.id;
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        return res.status(200).json({
            message: "deleted successfully"
        })
    } catch (err) {
        return res.status(500).json({
            data: {
                err: err
            },
            message: "Error in deleting the product"
        });
    }
}

// for updating quantity of product
module.exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const quantity = req.query.number;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        if (!quantity || isNaN(quantity)) {
            return res.status(400).json({
                message: "Invalid quantity value"
            });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        product.quantity = quantity;
        const updatedProduct = await product.save();

        return res.status(200).json({
            data: {
                product: updatedProduct
            },
            message: "Updated successfully"
        });
    } catch (err) {
        return res.status(500).json({
            data: {
                err: err
            },
            message: "Error in updating the quantity"
        });
    }
};
