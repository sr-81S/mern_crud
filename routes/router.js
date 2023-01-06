const express = require("express")
const router = express.Router()
const users = require("../models/userSchema")


// Resister user api
router.post("/api/resister", async (req, res)=>{
    // console.log(req.body);
    const {name,email,age,mobile,work,add,descri} = req.body;

    if(!name || !email || !age || !mobile || !work || !add || !descri){
        res.status(422).json("please fill the data")
    }

    try {
        const preuser = await users.findOne({email:email})
        if(preuser){
            res.status(422).json("user is already present")
        }else{
            const adduser = new users({
                name,email,age,mobile,work,add,descri
            })
            await adduser.save();
            res.status(200).json(adduser)
            console.log(adduser);
            res.cookie("token","test for cookie in client")
        }
        
    } catch (error) {
        res.status(422).json(error)
    }
})



//get user and show 

router.get("/api/getdata", async(req, res)=>{
    try {
        const getUser = await users.find()
        console.log(res.cookie("token","test for cookie in client"));
        res.status(201).json(getUser)
    } catch (error) {
        res.status(422).json(error)
    }
})

//get single user

router.get("/api/getuser/:id", async(req, res)=>{
    try {
        
        const {id} = req.params;
        const indViData = await users.findById({_id:id});
        console.log(indViData);
        res.status(201).json(indViData);
    } catch (error) {
        res.status(422).json(error);
    }
})

// edit single user
router.patch("/api/update/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateUser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        })
        console.log(updateUser);
        res.status(201).json(updateUser)
    } catch (error) {
        res.status(201).json(error)
    }
})

//delete user

router.delete("/api/deleteuser/:id", async (req,res)=>{
    try {
        const {id}= req.params;
        const deleteUser = await users.findByIdAndDelete({_id:id})
        console.log(deleteUser);
        res.status(201).json(deleteUser)
    } catch (error) {
        res.status(422).json(error)
    }
})



module.exports = router