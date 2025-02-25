const express=require("express")
const app=express()
require("dotenv").config()

const connectDB=require("./config/db")

const routes=require("./routes/routeCRUD")

app.use(express.json())




app.get("/",(req,res)=>{
    res.send("working")
})


app.use("/workout/CRUD",routes)


connectDB()
app.listen(process.env.PORT,()=>{
    console.log("server is running on port 8000")
})