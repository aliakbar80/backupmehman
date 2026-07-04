const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuestSchema = new Schema({
    fullname: { type: String, require: true },
    description: { type: String , default: "" },
    isSpecial: { type: Boolean, default: false },
    number_room: {
        type: Number,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    login_date: {
        type: String,
        require: true
    },
    logout_date: {
        type: String,
        require: true
    },
    price_room: {
        type: Number,
        require: true
    },
    stay_time: {
        type: Number,
        require: true
    },
    discount: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        require: true
    },
}, { timestamps: true });

module.exports = mongoose.model("Guests", GuestSchema);