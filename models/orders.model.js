const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: [{
        productId: {
            type: String,
            ref: 'Products'
        },
        name: {
            type: String
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity should not be less than 1.']
        },
        price: {
            type: Number,
            required: true
        }
    }],
    billAmount: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Orders', orderSchema);