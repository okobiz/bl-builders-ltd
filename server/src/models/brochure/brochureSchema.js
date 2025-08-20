const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Brochureschema = new Schema(
  {
    title: { type: String, required: true, trim: true }, // Heading
    description: { type: String, trim: true },
    companyIntroduction: { type: String, trim: true },
    successStory: { type: String, trim: true },
  },
  { timestamps: true }
);

const BrochureSchema = mongoose.model("brochure", Brochureschema);
module.exports = { BrochureSchema };
