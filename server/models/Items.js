const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    itemPrice: {
        type: String,
        required: true
    },
    itemDescription: {
        type: String,
        required: true
    },
    itemImageUrl: {
        type: String,
        required: true
    },
    
    email: String,
    password: String,
});

const ItemModel = mongoose.model("Item", ItemSchema);
module.exports = ItemModel;
