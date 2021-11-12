const router = require("express").Router();
const { Workout } = require("../models");

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

// router.put("/api/workouts", ({params},res) => {
//    Workout.update({
        
//       },
//       {
//         $set: {
          
//         }
//       },
  
//       (error, edited) => {
//         if (error) {
//           console.log(error);
//           res.send(error);
//         } else {
//           console.log(edited);
//           res.send(edited);
//         }
//       })
// })

// router.post("/api/workouts" (req,res) => {

// })

// router.get("/api/workouts/range")

module.exports = router;