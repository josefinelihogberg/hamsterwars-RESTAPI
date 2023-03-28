import express from "express";
import { fetchAllHamsters, saveHamster, updateScore, deleteHamster, fetchAllScores} from "../service/hamsterService.js";

const router = express.Router();

// Get all hamsters

router.get("/hamster/", async (request, response) => {
    const hamsters = await fetchAllHamsters();
    
    response.send(hamsters);
});

// Get two hamsters

const randomIndex = (list) => Math.floor(Math.random()*list.length);

router.get("/pair/hamster/", async (request, response) => {
    const data = await fetchAllHamsters();
    const hamsterPair = [
        data[randomIndex(data)], 
    data[randomIndex(data)]
];
    
    response.send(hamsterPair);
});

//Get scoreboard
router.get("/scoreboard/", async (request, response) => {
    const scores = await fetchAllScores();
    response.send(scores);

});
// Create a new vote
router.put("/hamster/:id", async (request, response) => {
    let hamsterId = request.params.id;
    console.log(hamsterId);    
    await updateScore(hamsterId);

   const responseData = {
    content: hamsterId,
    event: "Created a new vote for hamster: " + hamsterId
   };

   response.send(responseData);

});


// Create a new hamster

router.post("/hamster/", async (request, response) => {
    let hamster = request.body;
    const result = await saveHamster(hamster);
    console.log(result);

   const responseData = {
    content: hamster,
    insertedid: result.insertedId,
    event: "Created new hamster"
   };

   response.send(responseData);

});

router.delete("/hamster/:id", async (request, response) => {
    let hamsterId = request.body.id;
    await deleteHamster(hamsterId);

   const responseData = {
    content: hamsterId,
    event: "Deleted a hamster with Id: " + hamsterId
   };

   response.send(responseData);

});


export default router;