import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    products: [
      {
        product: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;