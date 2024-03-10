import {
  kastTerning,
  vælgInputFelt,
  getTotal,
  ones,
  twos,
  threes,
  fours,
  fives,
  sixs,
  onePairPoints,
  twoPairPoints,
  threeSamePoints,
  fourSamePoints,
  fullHousePoints,
  smallStraightPoints,
  largeStraightPoints,
  chancePoints,
  yatzyPoints,
  nuværendeSlag,
} from "./Logic.js";

let terningeBilleder = document.getElementsByClassName("terning");
let button = document.getElementById("kastTerninger");
let slagString = document.getElementById("slagString");
let pointfelter = document
  .getElementById("pointDiv")
  .getElementsByClassName("pointFelt");
let totalFelt = document.getElementById("total");
let myHoldArray = [true, true, true, true, true];
let slagNr = 0;

terningSetup();
pointfelterSetup();
updateTotal();

button.onclick = function () {
  let slag = kastTerning(myHoldArray);
  terningeBillederVis(slag, myHoldArray);
  terningSetup();
  opdaterPointfelter();

  slagNr++;
  slagString.innerHTML = `Slag nr ${slagNr}`;
  console.log(slagNr);
  stopVedTreSlag();
};

function terningeBillederVis(slag, holdArray) {
  terningeBilleder.innerHTML = "";
  let i = 0;

  slag.forEach((element) => {
    if (holdArray[i]) {
      terningeBilleder[i].outerHTML = `<img
    src="img/terning${element}.png"
    width="100"
    height="100"
    class="terning"
    id="img${i + 1}"
    />`;
    }
    i++;
  });
}

function terningSetup() {
  Array.from(terningeBilleder).forEach((element) => {
    element.onclick = function () {
      if (myHoldArray[parseInt(element.id.charAt(3)) - 1]) {
        element.style = "filter: opacity(50%);";
        myHoldArray[parseInt(element.id.charAt(3)) - 1] = false;
      } else {
        element.style = "";
        myHoldArray[parseInt(element.id.charAt(3)) - 1] = true;
      }
    };
  });
}

function stopVedTreSlag() {
  if (slagNr >= 3) {
    button.disabled = true;
  }
}

function opdaterPointfelter() {
  Array.from(pointfelter).forEach((element) => {
    switch (element.id) {
      case "ones":
        // TODO virker ikke
        if (element.disabled != "disabled") {
          element.value = ones(nuværendeSlag);
        }
        break;
      case "twos":
        element.value = twos(nuværendeSlag);
        break;
      case "threes":
        element.value = threes(nuværendeSlag);
        break;
      case "fours":
        element.value = fours(nuværendeSlag);
        break;
      case "fives":
        element.value = fives(nuværendeSlag);
        break;
      case "sixs":
        element.value = sixs(nuværendeSlag);
        break;
      case "onePair":
        element.value = onePairPoints(nuværendeSlag);
        break;
      case "twoPair":
        element.value = twoPairPoints(nuværendeSlag);
        break;
      case "threeOfAKind":
        element.value = threeSamePoints(nuværendeSlag);
        break;
      case "fourOfAKind":
        element.value = fourSamePoints(nuværendeSlag);
        break;
      case "fullHouse":
        element.value = fullHousePoints(nuværendeSlag);
        break;
      case "smallStraight":
        element.value = smallStraightPoints(nuværendeSlag);
        break;
      case "largeStraight":
        element.value = largeStraightPoints(nuværendeSlag);
        break;
      case "chance":
        element.value = chancePoints(nuværendeSlag);
        break;
      case "yatzy":
        element.value = yatzyPoints(nuværendeSlag);
        break;
    }
  });
}

function pointfelterSetup() {
  Array.from(pointfelter).forEach((element) => {
    element.onclick = function () {
      vælgInputFelt(parseInt(this.value));
      updateTotal();
      resetTerninger();

      // TODO virker ikke
      element.disabled = "disabled";
    };
  });
}

function updateTotal() {
  if (totalFelt.value == 0) {
    totalFelt.value = getTotal();
  } else {
    totalFelt.value = 0;
  }
}

// TODO virker ikke
function resetTerninger() {
  myHoldArray = [true, true, true, true, true];
  slagNr = 0;
  terningSetup();
}
