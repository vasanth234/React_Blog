const router=require("express").Router();
//const { User } = require('../index');
const User =require('../models/User')
const Post=require("../models/Post")
const bcrypt=require('bcrypt');

//CREATE Post
router.post("/",async (req,res)=>{
const newpost=new Post(req.body);
try{
    const savedpost=await newpost.save();
    res.status(200).json(savedpost)
}
catch(err){
    res.status(500).json(err)
}
   
    
});



// Update
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedpost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, { new: true });
                res.status(200).json(updatedpost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can update only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete
router.delete("/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the logged-in user is authorized to delete the post
        if (post.username !== req.body.username) {
            return res.status(401).json({ error: 'You can delete only your post' });
        }

        // Proceed with deleting the post
        await post.delete();
        res.status(200).json({ message: 'Post has been deleted' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});


//GET

router.get('/:id',async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
      
        res.status(200).json(post);
    }
    catch(err){
        res.status(500).json(err)
    }
})

//GET ALL POSTS

router.get('/',async (req,res)=>{
    const username=req.query.user;
    const catName=req.query.cat;
    try{
        let posts;
        if(username){
            posts=await Post.find({username})
        }
        else if(catName){
            posts=await Post.find({categories:{
                $in:[catName]
            }})
        }
      else{
        posts=await Post.find()
      }
      
        res.status(200).json(posts);
    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports=router