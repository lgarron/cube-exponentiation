import { Alg, Grouping } from "cubing/alg";
import { TwistyPlayer, type TwistyAlgEditor } from "cubing/twisty";
import { randomScrambleForEvent } from "cubing/scramble";
import { eventInfo } from "cubing/puzzles";

const eventID = new URL(location.href).searchParams.get("event-id") ?? "333";
let puzzleID;
try {
  puzzleID = eventInfo(eventID)?.puzzleID;
} catch(e) {
  document.body.append("Invalid event ID: ", eventID)
}
const exponent = 12;

const editor = document.querySelector("twisty-alg-editor") as TwistyAlgEditor;
const player = document.querySelector("twisty-player") as TwistyPlayer;
player.puzzle = "megaminx";


const subsequentPlayers : TwistyPlayer[] = [];
for (let i = 2; i <= exponent; i++) {
  const nextPlayer = document.body.appendChild( new TwistyPlayer({puzzle: "megaminx"}));
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
  player.alg = await randomScrambleForEvent(eventID);
})
