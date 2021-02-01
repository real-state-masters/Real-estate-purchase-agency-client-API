const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const config = require("../config");

const ClientSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: 8,
    },
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

ClientSchema.pre("save", async function preSave(next) {
  const client = this;

  if (!client.isModified("password")) return next();

  try {
    const hash = await bcrypt.hash(client.password, config.bcryptSaltRounds);

    client.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

ClientSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

const Client = mongoose.model("client", ClientSchema);

module.exports = Client;
