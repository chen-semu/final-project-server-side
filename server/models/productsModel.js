const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productsSchema = schema({
  name:{type:String, required:true},
    images: { 
      public_id:{type:String, required:true}, 
      url:{type:String, required:true}, 
    },
  });
  const productModel = mongoose.model("product", productsSchema);

  module.exports = productModel
