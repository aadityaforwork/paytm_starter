const express = require('express');
const zod= require('zod');
const usersRouter = express.Router();
const {User} = require('../../model/User');
const jwt= require('jsonwebtoken');
const {JWT_SECRET} = require('../../config/config');
const { authMiddleware } = require('../../middlewares/middleware');
const { Account } = require('../../model/Account');



//!sign up
const signUpBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})


usersRouter.post('/signup', async(req,res)=>{
    const {success} = signUpBody.safeParse(req.body);
    if(!success){
        return res.status(400).json(error)
    }

    const existingUser = await User.findOne({username: req.body.username});
    if(existingUser){
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const user=await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })

    const userId=user._id;

    await Account.create({
        userId: userId,
        balance: 100
    
    })

    const token= jwt.sign({userId},JWT_SECRET);

    return res.status(200).json({
        message: "User created successfully",
        token: token,
    })

})


//!sign in
const signInBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

usersRouter.post("/signin",async(req,res)=>{
    const success = signInBody.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            message: "Invalid Request"
        })
    }
    const user= await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user)
    {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }
    else{
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }
});


//!update user
const updateUserBody = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

usersRouter.put("/update",authMiddleware,async(req,res)=>{
 const success = updateUserBody.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            message: "Invalid Request"
        })
    }
    await User.updateOne({_id: req.userId},req.body);

    return res.status(200).json({
        message: "User updated successfully"
    })
})


//!Get the user
usersRouter.get("/bulk",async(req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = usersRouter;