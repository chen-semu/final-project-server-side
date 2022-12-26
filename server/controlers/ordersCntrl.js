const orderModel = require("../models/ordersModel.js");
const bcrypt= require("bcryptjs")
const key=process.env.SECRET_KEY;

const getAllOrders = async (req, res) => {
    await orderModel.find({}).then((result, error) => {
      if (error) {
        return res.status(400).json({
          success: false,
          massage: error,
        });
      }
      if(result.length===0){
          return res.status(300).json({
              success:false,
              massage:"there are no orders available"
          })
      }
      return res.status(200).json({
          success:true,
          massage:result
      })
    });
  };
  const addNewOrder= async (req,res)=>{
      await orderModel.insertMany(req.body)
      .then(()=>res.status(300).json({success:true,massage:"success in adding new order"}))
      .catch(error=>res.status(400).json({success:false,error}))
  }

  const getOrderById = async (req, res) => {
    await orderModel.findById(req.params.id)
        .then(order => {
            if (!order) {
                return res.json({ success: false, massage: "order is not available" })
            }
            return res.status(200).json({ success: true, order })
        })
        .catch(error => res.status(400).json({ success: false, error }))
}

const updateOrder = async (req, res) => {
  await orderModel.findByIdAndUpdate(req.params.id, req.body)
      .then(result => res.status(200).json({ success: true, result }))
      .catch(error => res.status(400).json({ success: false, error }))
}

const deleteOrder = async (req, res) => {
  await orderModel.findByIdAndDelete(req.params.id)
      .then(() => res.status(300).json({ success: true }))
      .catch(error => res.status(400).json({ success: false ,error}))
}

  module.exports={
    getAllOrders,
    addNewOrder,
    getOrderById,
    updateOrder,
    deleteOrder
  }