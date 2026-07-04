const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  fullname: { type: String, default: "مهمانسرا دانشگاه شمال" },
  email: {
    type: String,
    default: "admin@email.com"
  },
  password: {
    type: String,
    default: "mehman3745"
  },
});

module.exports = mongoose.model("admins", adminSchema);