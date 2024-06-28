const express = require('express');
const mongoose = require('mongoose');
const {Schema} = mongoose;
const app = express();
const url = 'mongodb+srv://harshvardhanjha35363:12345@cluster0.cpdrz2y.mongodb.net/Excellence?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(url);
app.use(express.json());
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("connected to mongoDB Successfully");
})


const newExercise=new Schema({
    name:String,
    description:String,
    duration:Number
});

const Exercise = mongoose.model('Exercise', newExercise);
app.post("/insert",(req,res)=>{
    Exercise.create({
        name:req.body.name,
        description:req.body.description,
        duration:req.body.duration
    })
    console.log(req.body);
    res.send("Exercise inserted successfully First");
})

app.get('/find',async (req,res)=>{
   const exercise = await Exercise.find();
  return res.json(exercise)
})

const PORT = 4500;
app.listen(PORT,()=>{
    console.log(`server is listening on port${PORT}`)
})