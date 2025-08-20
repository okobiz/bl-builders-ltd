const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Serviceschema = new Schema(
  {
    category: {
      type: String,
      enum: ["land", "apartment"],
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
      enum: ["delivered", "running", "upcoming"],
    },
  },
  { timestamps: true }
);

const ServiceSchema = mongoose.model("service", Serviceschema);

module.exports = { ServiceSchema };

