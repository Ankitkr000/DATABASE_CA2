const express=require("express")
const router=express.Router()

const workoutModel=require("../models/Workout")


router.post("/",async(req,res)=>{
    try{
    const {user,date,duration,caloriesBurned}=req.body

    if(!user || !date || !duration ){
        return res.status(400).json({error:"Validation failed:field is required"})
    }

    const newSession=new workoutModel({user,date,duration,caloriesBurned})
    await newSession.save()

    res.status(200).json({message:"New Session Logged Successfully"})

    }catch(err){
        return res.json({error:"Something went wrong"})
    }


})


router.get("/:id",async(req,res)=>{
    try{
    const workout=await workoutModel.findById(req.params.id)

        if(!workout){
            return res.status(400).json({error:"Workout not found"})
        }

    res.json(workout)
    }
    catch(err){
        return res.status(400).json({error:"Something went wrong"})

    }


})


router.put("/:id",async(req,res)=>{
    try {
        const {user,date,duration,caloriesBurned,exercises}=req.body

        const updatedWorkout= await workoutModel.findByIdAndUpdate(
                    req.params.id,
                    {user,date,duration,caloriesBurned,exercises},
                    {new:true})

        res.status(200).json({message:"workout updated Successfully"})

        
    } catch (error) {
        return res.status(400).json({error:"Something went wrong"})
        
    }
})


router.delete("/:id",async(req,res)=>{
    try {
        const deletedWorkout=await workoutModel.findByIdAndDelete(req.params.id)
        if(deletedWorkout){
            res.status(200).json({message:"Workout deleted Successfully"})
        }
        
    } catch (error) {

        return res.status(400).json({error:"Somethig went wrong"})
        
    }
})

module.exports=router