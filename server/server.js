const dotenv=require("dotenv")
dotenv.config()
// // const mongoose= require("mongoose")
const express= require("express")
const app= express()
const cors= require("cors")
var bodyParser = require('body-parser');
const port= 8080
require("./DB/index")
// const io=require('socket.io')(server)
const passport=require("passport")
require("./config/passport")(passport)
const  path= require("path")

const authMiddleWare=require('./middleware/priveteRoutesMW')


const usersRouter=require("./routes/usersRouter")
const productsRouter=require("./routes/productsRouter")
const ordersRouter=require("./routes/ordersRouter")
const packagesRouter=require("./routes/packagesRouter")


app.use(passport.initialize())
// app.use(express.json({extended:true}))
// app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors())

app.use("/users",usersRouter)
app.use("/products",
//  authMiddleWare,
  productsRouter)
app.use("/orders", authMiddleWare, ordersRouter)
app.use("/packages", authMiddleWare, packagesRouter)

 


// io.on('connection',(socket)=>{
//     socket.on('massage',(txtMsg)=>{
//         io.emit('massage', txtMsg)
//     })
// })


app.listen(port,(error)=>{
    if(error){
        console.log(`faild to connect to port: ${port}`);
        
    }
    console.log(`successful in connecting to port: ${port}`);
    })

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../client/build")))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname, "../client/build", 'inde.html'))
    })
}

// var express = require('express');
// var bodyParser = require('body-parser');
// var multer = require('multer');
// var upload = multer();
// var app = express();

// app.get('/', function(req, res){
//    res.render('form');
// });

// app.set('view engine', 'pug');
// app.set('views', './views');

// // for parsing application/json
// app.use(bodyParser.json()); 

// // for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true })); 
// //form-urlencoded

// // for parsing multipart/form-data
// app.use(upload.array()); 
// app.use(express.static('public'));

// app.post('/', function(req, res){
//    console.log(req.body);
//    res.send("recieved your request!");
// });
// app.listen(9090);