import {
  kastTerning,
  onePairPoints,
  twoPairPoints,
  threeSamePoints,
  fourSamePoints,
  fullHousePoints,
  smallStraightPoints,
  chancePoints,
  yatzyPoints,
} from "./Logic.js";

let input = document.querySelector("input");
let terningeBilleder = document.getElementsByClassName("terning");
let button = document.getElementById("kastTerninger");
let slagString = document.getElementById("slagString");
let myHoldArray = [true, true, true, true, true];
let slagNr = 0;

terningSetup();

button.onclick = function () {
  let slag = kastTerning(myHoldArray);
  terningeBillederVis(slag, myHoldArray);
  terningSetup();

  slagNr++;
  slagString.innerHTML = `Slag nr ${slagNr}`;
  console.log(slagNr);
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
      console.log(myHoldArray);
    };
  });
}
