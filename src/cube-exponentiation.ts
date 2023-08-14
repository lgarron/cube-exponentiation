import { Alg, Grouping } from "cubing/alg";
import { TwistyPlayer, type TwistyAlgEditor } from "cubing/twisty";
import { randomScrambleForEvent } from "cubing/scramble";
import { eventInfo } from "cubing/puzzles";

const event = new URL(location.href).searchParams.get("event") ?? "333";
const exponent = parseInt(new URL(location.href).searchParams.get("exponent") ?? "12");
let puzzle;
try {
  puzzle = eventInfo(event)?.puzzleID;
} catch(e) {
  document.body.append("Invalid event ID: ", event)
}

const player = document.querySelector("twisty-player") as TwistyPlayer;
player.puzzle = puzzle;


const subsequentPlayers : TwistyPlayer[] = [];
for (let i = 2; i <= exponent; i++) {
  const nextPlayer = document.body.appendChild( new TwistyPlayer({puzzle}));
  subsequentPlayers.push(nextPlayer);
}

player.experimentalModel.alg.addFreshListener((alg) => {
  for (let i = 2; i <= exponent; i++) {
    subsequentPlayers[i-2].experimentalSetupAlg = new Alg([new Grouping(alg.alg, i-1)]);
    subsequentPlayers[i-2].alg = alg.alg;
    subsequentPlayers[i-2].timestamp= "end";
  }
})

document.querySelector("#random-scramble")?.addEventListener("click",async () => {
  player.alg = await randomScrambleForEvent(event);
})
