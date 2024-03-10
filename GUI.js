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
  resetSlag,
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
  updateSlagString();
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

function kastTilgængeligIgen() {
  button.disabled = false;
}

function opdaterPointfelter() {
  Array.from(pointfelter).forEach((element) => {
    switch (element.id) {
      case "ones":
        if (element.disabled != true) {
          element.value = ones(nuværendeSlag);
        }
        break;
      case "twos":
        if (element.disabled != true) {
          element.value = twos(nuværendeSlag);
        }
        break;
      case "threes":
        if (element.disabled != true) {
          element.value = threes(nuværendeSlag);
        }
        break;
      case "fours":
        if (element.disabled != true) {
          element.value = fours(nuværendeSlag);
        }
        break;
      case "fives":
        if (element.disabled != true) {
          element.value = fives(nuværendeSlag);
        }
        break;
      case "sixs":
        if (element.disabled != true) {
          element.value = sixs(nuværendeSlag);
        }
        break;
      case "onePair":
        if (element.disabled != true) {
          element.value = onePairPoints(nuværendeSlag);
        }
        break;
      case "twoPair":
        if (element.disabled != true) {
          element.value = twoPairPoints(nuværendeSlag);
        }
        break;
      case "threeOfAKind":
        if (element.disabled != true) {
          element.value = threeSamePoints(nuværendeSlag);
        }
        break;
      case "fourOfAKind":
        if (element.disabled != true) {
          element.value = fourSamePoints(nuværendeSlag);
        }
        break;
      case "fullHouse":
        if (element.disabled != true) {
          element.value = fullHousePoints(nuværendeSlag);
        }
        break;
      case "smallStraight":
        if (element.disabled != true) {
          element.value = smallStraightPoints(nuværendeSlag);
        }
        break;
      case "largeStraight":
        if (element.disabled != true) {
          element.value = largeStraightPoints(nuværendeSlag);
        }
        break;
      case "chance":
        if (element.disabled != true) {
          element.value = chancePoints(nuværendeSlag);
        }
        break;
      case "yatzy":
        if (element.disabled != true) {
          element.value = yatzyPoints(nuværendeSlag);
        }
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
  totalFelt.value = getTotal();
}

function updateSlagString() {
  slagString.innerHTML = `Slag nr ${slagNr}`;
}

function resetTerninger() {
  myHoldArray = [true, true, true, true, true];
  slagNr = 0;
  updateSlagString();
  terningeBillederVis(resetSlag(), myHoldArray);
  kastTilgængeligIgen();
}
