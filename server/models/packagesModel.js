const mongoose = require("mongoose");
const schema = mongoose.Schema;
const productModel = require('./productsModel');


const packagesSchema = schema({
    name: { type: String, required: true },
    products: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "product" },
    ],
    price: { type: Number, required: true },
  });
  const packageModel = mongoose.model("package", packagesSchema);

  module.exports = packageModel