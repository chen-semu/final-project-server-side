
const jwt=require("jsonwebtoken")

const key = process.env.SECRET_KEY;
const auth=(req,res,next)=>{

const token=req.header('authToken')
if(!token){
res.status(400).json({success:false,massage:"Unauthorized"})
}
try {
const verified=jwt.verify(token,key)
req.body=verified;
console.log(verified);
next()

} catch (error) {
    res.status(400).json({success:false,massage:"invaild token"})
}

}

module.exports= auth