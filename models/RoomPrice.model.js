const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomPriceSchema = new Schema({
    roomType: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("RoomPrices", RoomPriceSchema);
