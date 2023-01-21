const Products = require('../models/products.model');

exports.getProducts = (req, res)=> {
    try{
        Products.find((err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while getting products.'})
            }

            res.status(200).send({products: data});
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'})
    }
};

exports.addProduct = (req, res)=> {
    try{
        const newProduct = new Products(req.body);

        newProduct.save((err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while adding a new product.'})
            }

            res.status(200).send({productId: data._id, message: 'A new product has been added.'});
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'})
    }
};

exports.updateProduct = (req, res)=> {
    try{
        Products.findByIdAndUpdate({_id: req.params.productId}, {$set: req.body}, (err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while updating product.'})
            }

            res.status(200).send({productId: data._id, message: 'Product has been updated'});
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'})
    }
};

exports.deleteProduct = (req, res)=> {
    try{
        Products.deleteOne({_id: req.params.productId}, (err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while deleting product.'})
            }

            res.status(200).send({message: 'Product has been deleted successfully.'});
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'})
    }
};