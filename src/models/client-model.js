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
      contact: {
        name: {
          type: String,
          required: [true, "User name is required"],
          trim: true,
          minlength: 3,
        },
        lastname: {
          type: String,
          required: [true, "User last name is required"],
          trim: true,
          minlength: 3,
        },
        phone: {
          type: String,
          trim: true,
          minlength: 6,
          required: true,
        },
        current_address: {
          type: String,
          required: true,
        },
        profession: {
          type: String,
          required: true,
        },
        heritage: {
          type: Number,
          required: true,
        },
        email: {
          type: String,
          required: true,
          trim: true,
          lowercase: true,
          validate: {
            validator: validator.isEmail,
            message: (props) => `${props.value} is not a valid email address`,
          },
        },
      },
      property_id: {
        type: String,
        required: true,
      },
    },
    favorites: {
      type: Array,
    },
    unwanted_properties: {
      type: Array,
    },
  },
  {
    timestamps: true,
  },
);

const Client = mongoose.model("client", ClientSchema);

module.exports = Client;
