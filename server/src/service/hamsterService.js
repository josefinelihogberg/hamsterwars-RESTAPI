import { fetchCollection } from "../mongo/hamsterMongoClient.js";

export function fetchAllHamsters() {
    return fetchCollection("hamster").find().toArray();
}


export function saveHamster(hamster) {
    const data = {
      name:hamster.name,
      imgRef: hamster.imgRef,
      id:hamster.id,
    }
    return fetchCollection("hamster").insertOne(data);
}


function increaseScore(hamsterId, score) {
  if (score == undefined) {
    score = 0;
  }

  score = score + 1;

 return fetchCollection("hamster").updateOne({id: hamsterId}, {$set: {score:score}});
}

export function updateScore(hamsterId) {

  fetchCollection("hamster").findOne({id: hamsterId}).then(data => {
    let score = data.score;
    increaseScore(hamsterId, score);
  })


}

export function deleteHamster(id) {
  return fetchCollection("hamster").deleteOne({ id: id});
}

export function fetchAllScores() {
  return fetchCollection("hamster").find({}, { projection: {_id: 0, name: 1, score: 1}} ).toArray();
}