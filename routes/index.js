const router = require("express").Router();
const { Workout } = require("../models");
const path = require('path');
const mongoose = require('mongoose')

router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/exercise.html'))
})

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/stats.html'))
})

router.get("/api/workouts", async(req, res) => {
  try  {
  let docs = await Workout.aggregate([
     {
       $addFields: {totalDuration: {$sum: "$exercises.duration"}}
     }
   ])
    console.log(docs);
    res.json(docs);
  }
  catch(err) {
    console.log(err)
  }
});

router.put("/api/workouts/:id", async (req,res) => {
  try { 
    const put = await Workout.updateOne({ _id: mongoose.Types.ObjectId(req.params.id)}, {$push: {exercises: req.body}}, {new:true}) 
    res.json(put)  
  }
    catch(err) {
      console.log(err)
    }
});


router.post("/api/workouts", async (req,res) => {
  const newWorkout = req.body;
  const exercise = await Workout.create(newWorkout);
  console.log(exercise);
  res.json(exercise);
  
});

router.get("/api/workouts/range", async (req,res) => {
  try{
  const past = await Workout.aggregate([
    {
      $sort: {_id: -1}
    },
    {
      $limit: 7
    },
    {
      $addFields: {totalDuration: {$sum: "$exercises.duration"}}
    }
  ])
  res.json(past)
} catch(err) {
  res.json(err)};
});


module.exports = router;