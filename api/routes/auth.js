const router=require("express").Router();
//const { User } = require('../index');
const User=require('../models/User')
const bcrypt=require('bcrypt');

//REGISTER
router.post("/register",async (req,res)=>{
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPass=await bcrypt.hash(req.body.password,salt);
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass,
        })
        const user=await newUser.save();
        res.status(200).json(user);
        console.log('Received request body:', req.body);
    }
  

    catch(err){
        console.error('Error during registration:', err);
       res.status(500).json(err) 
    }
});

//LOGIN
router.post('/login',async (req,res)=>{
    try{
      const user=await User.findOne({username:req.body.username})
      !user && res.status(400).json("wrong credential!")

      const validated=await bcrypt.compare(req.body.password,user.password)
      !validated && res.status(400).json("wrong credential!")

      const {password, ...others}=user;//this is for not showing the password when user logged in with others unnecessary statements also
      res.status(200).json(others);
    }
    catch(err){
res.status(500).json(err)
    }
})

module.exports=router