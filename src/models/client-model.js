const mongoose = require("mongoose");
const validator = require("validator");

const ClientSchema = new mongoose.Schema(
  {
    _id: String,
    email: {
      type: String,
      required: true,
      unique: [true, "This email already exist"],
      trim: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    booked_properties: {
      type: Array,
    },
    bought_properties: {
      type: Array,
    },
    favorites: {
      type: Array,
    },
    unwanted_properties: {
      type: Array,
    },
    shopping_cart: {
      type: Array,
    },
  },
  {
    timestamps: true,
  },
);

const Client = mongoose.model("client", ClientSchema);

module.exports = Client;
