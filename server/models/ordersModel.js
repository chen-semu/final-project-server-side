const mongoose = require("mongoose");
const schema = mongoose.Schema;
const packagesModel= require ('./packagesModel')

const ordersSchema = schema({
  orderNum: { type: String, required: true },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "package",
  },
  date: { type: Date, default: Date.now() },
  purchaseErr: { type: Boolean, required: true },
  clientDecline: { type: Boolean, required: true },
  profit: { type: Number, required: true },
});
const orderModel = mongoose.model("orders", ordersSchema);

module.exports = orderModel 
