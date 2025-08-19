const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Serviceschema = new Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const ServiceSchema = mongoose.model("service", Serviceschema);

module.exports = { ServiceSchema };


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Serviceschema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    details: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
    },
    location: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
     status: {
      type: String,
    },
  },
  { timestamps: true }
);

const ServiceSchema = mongoose.model("service", Serviceschema);

module.exports = { ServiceSchema };

