//Code written by Nadia & Nadim
const express = require('express');
const router = express.Router();
const data = require('../data')
const path = require('path');

// Helper function for validation
const validateProduct = (product) => {
    if (product.price <= 0) return 'Price must be greater than 0';
    if (product.stock <= 0) return 'Stock must be greater than 0';
    return null;
};

// GET /api/products
router.get('/', (req, res) => {
    res.json({ products: data.products });
});

// GET /api/products/:id
//get product by id (path param)
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = data.products.find(item=>item.id===parseInt(id))
    if(product) res.json(product)
    else res.status(404).json({ message: `Product with ID: ${id} not found` });
});

// POST /api/product
//add product (body data)
router.post('/', (req, res) => {
    const productData = req.body
     // Check if product ID already exists
    const existingProduct = data.products.find(item => item.id === productData.id);
    if (existingProduct) {
        return res.status(400).json({ message: 'Product ID already exists' });
    }
    
    const validationError = validateProduct(productData);
    if (validationError) return res.status(400).json({ message: validationError });
    data.products.push(productData)
    res.json({ message: `Product added`, products: data.products });
});

// PUT /api/products/:id
//update product by id (path param + body data)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const productData = req.body
    //find index of user by id into array 
    const productInd = data.products.findIndex(item=>item.id===parseInt(id))

    if(productInd !== -1){
        //change product into array
        data.products[productInd]=productData
        res.json({ message: `Product with ID: ${id} updated`, products: data.products });
    }else{
        res.status(404).json({ message: `Product not found` })
    }
});

// DELTE /api/products
//delete product by id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const productInd = data.products.findIndex(item=>item.id===parseInt(id))

    if(productInd !== -1){
        //delete product into array
        data.products.splice(productInd, 1)
        res.json({ message: `Products with ID: ${id} deleted`, products: data.products });
    }else{
        res.status(404).json({ message: `Products not found` })
    }

});
module.exports = router;
