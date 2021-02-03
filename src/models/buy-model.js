const mongoose = require("mongoose");
const validator = require("validator");

const BuySchema = new mongoose.Schema(
  {
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
    client: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "client",
    },
    propertyId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const BuyProperty = mongoose.model("buyProperty", BuySchema);

module.exports = BuyProperty;
