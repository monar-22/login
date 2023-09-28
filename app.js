const express=require("express");
const app=express();
const mongoose=require("mongoose");
app.use(express.json());
const cors=require("cors");
app.use(cors());
const bcrypt=require("bcryptjs")

const jwt=require("jsonwebtoken");

// import dotenv from 'dotenv';
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET=process.env.JWT_SECRET;

const mongoUrl=process.env.MONGOURL;

mongoose.connect(mongoUrl,{
    useNewUrlParser:true
}).then(()=>{
    console.log("Connected to database");

}).catch(e=>console.log(e));




require("./userDetails");

const User=mongoose.model("UserInfo");

app.post("/register",async(req,res)=>{

    const{fname,lname,email,password}=req.body;

    const encryptedPassword=await bcrypt.hash(password,10);
    try{
        const oldUser=await User.findOne({email});

        if(oldUser){
          return res.json({error:"User Exists"});
        }
    await User.create({
      fname,
      lname,
      email,
      password:encryptedPassword,
    });
    res.send({status:"ok"})
    }
    catch(error){
        res.send({status:"error"})
    }
})

app.post("/login-user",async(req,res)=>{
    const{email,password}=req.body;

    const user=await User.findOne({email});

    if(!user){
        return res.json({error:"User Not found"});
      }
    if(await bcrypt.compare(password,user.password)){
        const token=jwt.sign({email:user.email},JWT_SECRET);

        if(res.status(201)){
            return res.json({status:"ok",data :token});

        }
        else{
            return res.json({error:"error"});
        }
    }
   res.json({status:"error",error:"invalid password"});
});
// SAMPLE-------------------------------------
// const UserAgentModel = require('./models/UserAgent');
// app.post('/api/user-agent', async (req, res) => {
//     try {
//       const { browserName, browserVersion, osName, deviceType } = req.body;
  
//       const newUserAgent = new UserAgentModel({
//         browserName,
//         browserVersion,
//         osName,
//         deviceType,
//       });
  
//       await newUserAgent.save();
  
//       res.status(201).json(newUserAgent);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  
//   // Retrieve user agent data from MongoDB
//   app.get('/api/user-agents', async (req, res) => {
//     try {
//       const userAgents = await UserAgentModel.find();
//       res.status(200).json(userAgents);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

// SAMPLE-------------------------------------

app.post("/userData",async(req,res)=>{
    const{ token }=req.body;
    try{
        const user=jwt.verify(token,JWT_SECRET);
        console.log(user);
        const useremail=user.email;
        User.findOne({ email:useremail })
        .then((data)=>{
            res.send({status:"ok",data:data});
        })
        .catch((error)=>{
            res.send({status:"error",data:error});
        });

    }
    catch(error){

    }
});


app.get('/ip', (req, res) => {
    const ipAddress = req.ip; // This will give you the client's IP address
    res.send(`Your IP address is: ${ipAddress}`);
  });
  
app.listen(5000,()=>{
    console.log("Server started");
})





// app.post("/post",async(req,res)=>{
//     console.log(req.body);
//     const {data}=req.body;

//     try{
//     if(data=="mona"){
//         res.send({status:"ok"});
//     }
//     else{
//         res.send({status:"User Not found"});
//     }
//     }
//     catch(error){
//         res.send({status:"error"});
//     }
    
// });

// require("./userDetails");
// const User=mongoose.model("UserInfo");

