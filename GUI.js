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
    addToSum,
    getSum,
    getBonus,
    resetSpil,
} from "./Logic.js";

let terningeBilleder = document.getElementsByClassName("terning");
let button = document.getElementById("kastTerninger");
let slagString = document.getElementById("slagString");
let pointfelter = document
    .getElementById("pointDiv")
    .getElementsByClassName("pointFelt");
let totalFelt = document.getElementById("total");
let sumFelt = document.getElementById("sum");
let bonusFelt = document.getElementById("bonus");
let myHoldArray = [true, true, true, true, true];
let slagNr = 0;
let feltValgt = false;
let tempElement = null;

terningSetup();
pointfelterSetup();
updateResultatfelter();

button.addEventListener('click', kastTerningKnap);

function kastTerningKnap() {
    let slag = kastTerning(myHoldArray);
    terningeBillederVis(slag, myHoldArray);
    terningSetup();
    opdaterPointfelter();
    slagNr++;
    stopVedTreSlag();
    updateSlagString();

    updateResultatfelter()
    håndterFelt();
    checkFærdig();
}

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

function håndterFelt() {
    if (feltValgt) {
        resetTerninger();
        feltValgtIgen(tempElement)
        kastTilgængeligIgen();
    }
    feltValgt = false;
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

            kastTilgængeligIgen();
            if (!feltValgt) {
                element.disabled = true;
                feltValgt = true;
                tempElement = element;
            } else {
                tempElement.disabled = false;
                element.disabled = true;
                tempElement = element;
            }
        };
    });
}

function feltValgtIgen(element) {
    vælgInputFelt(parseInt(element.value));
    if (
        element.id == "ones" ||
        element.id == "twos" ||
        element.id == "threes" ||
        element.id == "fours" ||
        element.id == "fives" ||
        element.id == "sixs"
    ) {
        addToSum(parseInt(element.value));
    }
}
function updateResultatfelter() {
    totalFelt.value = getTotal();
    sumFelt.value = getSum();
    bonusFelt.value = getBonus();
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

function resetUI() {
    resetTerninger();

    Array.from(pointfelter).forEach((felt) => {
        felt.value = 0;
        felt.disabled = false;
    });

    totalFelt.value = 0;
    sumFelt.value = 0;
    bonusFelt.value = 0;
}

document.getElementById("nulstilSpil").addEventListener("click", function () {
    resetSpil();
    resetUI();
});

function checkFærdig() {
    let done = true;
    let nytspil = false;
    Array.from(pointfelter).forEach((element) => {
        if (!element.disabled) {
            done = false;
        }
    })

    if (done) {
        if (confirm("Vil du starte et nyt spil?") == true) {
            console.log("Nyt spil");
            nytspil = true
        }
    }

    if (nytspil) {
        resetSpil();
        resetUI();
    }
}
