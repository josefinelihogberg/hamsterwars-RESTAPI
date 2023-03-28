const hamsterContainer = document.querySelector(".hamster-container");
const hamsterwarsBtn = document.querySelector(".hamsterwars-btn");
const scoreboardBtn = document.querySelector(".scoreboard-btn");
const scoreboardContainer = document.querySelector(".scoreboard-container");

scoreboardBtn.addEventListener("click", fetchScoreBoard);
async function fetchScoreBoard() {
  hamsterContainer.innerHTML = "";
  scoreboardContainer.innerHTML = "";
  let result = await fetch("http://127.0.0.1:3030/api/scoreboard/");
  let hamsters = await result.json();
  console.log(hamsters);

  for (let hamster of hamsters) {
    let div = document.createElement("div");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");

    div.className = "scoreboard";
    p1.textContent = `name: ${hamster.name}`;

    if (hamster.score != null) {
      p2.textContent = `score: ${hamster.score}`;
    } else {
      p2.textContent = `score: 0`;
    }
    div.append(p1, p2);
    scoreboardContainer.append(div);
  }
}

hamsterwarsBtn.addEventListener("click", fetchPairHamster);

async function fetchPairHamster() {
  hamsterContainer.innerHTML = "";
  scoreboardContainer.innerHTML = "";

  let result = await fetch("http://127.0.0.1:3030/api/pair/hamster/");
  let hamsters = await result.json();

  for (let hamster of hamsters) {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");
    let input = document.createElement("input");

    input.type = "submit";
    input.value = "Vote";
    input.name = `${hamster.id}`;

    img.src = `./image/${hamster.imgRef}`;
    img.width = "300";
    figcaption = hamster.name;

    figure.append(img, figcaption, input);

    hamsterContainer.append(figure);

    input.addEventListener("click", voteHamster);

    async function voteHamster() {
      let id = input.name;
      console.log(id);

      let response = await fetch(`http://127.0.0.1:3030/api/hamster/${id}`, {
        method: "PUT",
        // body: JSON.stringify({id: id}),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(await response.json());
    }
  }
}

// what is chat gpt?
