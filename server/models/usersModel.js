const mongoose= require("mongoose")
const ordersDB=require('./ordersModel')
const schema=mongoose.Schema

const usersSchema= schema({
    fullName:{type:String, required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    orders:[{type:mongoose.Schema.Types.ObjectId, required:true, ref:`${this._id}`}],
    active:{type:Boolean},
})

module.exports=mongoose.model("users",usersSchema)