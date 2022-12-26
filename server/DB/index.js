const mongoose=require("mongoose")
const usersDataBase=process.env.BASIC_API

mongoose.connect(usersDataBase,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("user database connected"))
.catch((error)=>console.log("connection to database faild"+error.massage))

module.exports=mongoose.connection