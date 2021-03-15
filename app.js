const express = require('express');
const mongo = require('mongoose');
var bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config();

//const redis = require('redis');
// const session = require('express-session');
// let RedisStore = require('connect-redis')(session);
// let redisClient = redis.createClient();


const accountRoutes = require('./account/routes/accountRoutes.js');
const eventRoutes=require('./event/routes/eventRoutes.js');


const app = express();

// app.use(session({
//     secret: process.env.sessionSecret, 
//     name:'mern-apanjwani0',
//     saveUninitialized : true,
//     //store: new RedisStore({ client: redisClient ,ttl: 86400}),   
//     resave: true
//   }))

app.use(cors());
app.use(bodyParser.json())

//app.use('/static', express.static('static'));

app.get('/',(req,res)=>{
    res.json({
        title:"Simple Login/Signup Portal using MERN Stack",
        message:"Developed by Aman Panjwani"
    })
});

app.use('/api/accounts', accountRoutes);
app.use('/api/events', eventRoutes);



mongo.connect(process.env.MONGO_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useCreateIndex:true},(err)=>{
    if(!err){
        console.log("DB Connected");
    }else{
        console.log(err.message);
    }
})



try{
    app.listen(process.env.PORT,()=>{
        console.log(`Server Started on ${process.env.PORT}. Visit http://localhost:${process.env.PORT}`);
    })
}catch(err){
    console.log("Creating Server");
}

