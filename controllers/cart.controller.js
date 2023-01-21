const Cart = require('../models/cart.model');
const Products = require('../models/products.model');

exports.getCartDetails = (req, res)=> {
    try{
        Cart.findOne({userId: req.params.userId},(err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while getting cart details.'})
            }

            res.status(200).send({cart: data});
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'})
    }
};

exports.addProductToCart = async (req, res)=> {
    try{
        const {productId, quantity} = req.body;

        let cart = await Cart.findOne({userId: req.params.userId});
        const product = await Products.findOne({_id: productId});

        if(!product){
            return res.status(404).send({message: 'Product not found.'})
        }

        const {name, price} = product;

        if(cart){
            let productIndex = cart.items.findIndex(p => p.productId == productId);

            if(productIndex > -1){
                let productItem = cart.items[productIndex];
                productItem.quantity = productItem.quantity + quantity;
                cart.items[productIndex] = productItem;
            }else{
                cart.items.push({productId, name, quantity, price})
            }

            cart.billAmount  = cart.billAmount + (quantity * price);
            cart = await cart.save();

            return res.status(200).send({message: 'Cart has been added', cart: cart})
        }else{
            const newCart = await Cart.create({
                userId: req.params.userId,
                items: [{productId, name, quantity, price}],
                billAmount: quantity*price
            })
            return res.status(201).send({message: 'New cart has been added', cart: cart})
        }
    }catch(error){
        console.log('Error: ', error);
        res.status(500).send({message: 'Internal Server Error'})
    }
};

exports.updateCart = async (req, res)=> {
    try{
        const {productId, quantity} = req.body;

        let cart = await Cart.findOne({userId: req.params.userId});
        let product = await Products.findOne({_id: productId});

        if(!product){
            return res.status(404).send({message: 'Product not found.'})
        }

        if(!cart){
            return res.status(404).send({message: 'Cart not found.'})
        }


        if(cart){
            let productIndex = cart.items.findIndex(p => p.productId == productId);

            if(productIndex > -1){
                let productItem = cart.items[productIndex];
                productItem.quantity = productItem.quantity + quantity;
                cart.items[productIndex] = productItem;
            }else{
                return res.status(404).send({message: "Product not found in the cart."})
            }

            cart.billAmount  = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
            cart = await cart.save();

            return res.status(200).send({message: 'Cart has been updated', cart: cart})
        }
    }catch(error){
        console.log(error)
        res.status(500).send({message: 'Internal Server Error'})
    }
};

exports.deleteProductFromCart = async (req, res)=> {
    const userId = req.params.userId;
    const productId = req.params.productId;
    try{
        let cart = await Cart.findOne({userId});
        let itemIndex = cart.items.findIndex(p => p.productId == productId);
        if(itemIndex > -1)
        {
            let productItem = cart.items[itemIndex];
            cart.billAmount -= productItem.quantity*productItem.price;
            cart.items.splice(itemIndex,1);
        }
        cart = await cart.save();
        return res.status(201).send({message: 'Product has been removed from cart', cart: cart});
    }
    catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal Server Error"});
    }
};