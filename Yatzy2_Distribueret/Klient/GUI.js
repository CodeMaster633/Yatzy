 //import {
//     kastTerning,
//     vælgInputFelt,
//     getTotal,
//     slagNr,
//     ones,
//     twos,
//     threes,
//     fours,
//     fives,
//     sixs,
//     onePairPoints,
//     twoPairPoints,
//     threeSamePoints,
//     fourSamePoints,
//     fullHousePoints,
//     smallStraightPoints,
//     largeStraightPoints,
//     chancePoints,
//     yatzyPoints,
//     nuværendeSlag,
//     resetSlag,
//     addToSum,
//     getSum,
//     getBonus,
//     resetSpil,
         //myHoldArray
        // feltValgt,
        // bonusFelt
 //} from "../Server/Logic.js";

// import { kastTerning } from "../Server/Logic.js";
// import { nuværendeSlag } from "../Server/Logic.js";
import{get,post,put} from "./YatzyFetch.js"

let terningeBilleder = document.getElementsByClassName("terning");
let button = document.getElementById("kastTerninger");
let slagString = document.getElementById("slagString");
let pointfelter = document
    .getElementById("pointDiv")
    .getElementsByClassName("pointFelt");
let totalFelt = document.getElementById("total");
let sumFelt = document.getElementById("sum");
let bonusFelt = document.getElementById("bonus");
//let myHoldArray = [true, true, true, true, true];
//let feltValgt = false;
//let tempElement = null;

 let ip = "http://10.10.130.135:8000/"

 async function hentHoldArray(){
    return await get(ip + "holdArray")
} 

async function putHoldArray(terningNr){
    return await put(ip + "putHoldArray",{terningNr})
}

async function resetHoldArray(){
    return await put(ip + "resetHoldArray")
}

 async function hentAktuelSlag(){
    return await get(ip + "slag")
}

async function hentSlagNr() {
     const response = await get(ip + "getSlagNr");
     return response.slagNr;
}

async function opdaterSlagNr(newSlagNr) {
     return await put(ip + "putSlagNr", { slagNr: newSlagNr });
 }

 async function kastAktuelSlag(){
    return await put( ip + "kastTerninger")
} 

async function putPoints(){
    return await put(ip + "putPoints")
} 

async function lockPoint(navn) {
     return await put(ip + "lockPoint", { navn })
}

async function hentPoints() {
    try {
        return await get(ip + "points");
    } catch (error) {
        console.error("Fejl ved hentning af points:", error);
        return 0;
    }
}

terningeBillederVis(await hentAktuelSlag(), await hentHoldArray());

// terningSetup();
pointfelterSetup();
//terningSetup2()
//terningSetup();
terningSetup()
// pointfelterSetup();
//updateResultatfelter();

 button.addEventListener('click', kastTerningKnap);

async function kastTerningKnap() {
    let currentSlagNr = await hentSlagNr();
    if (currentSlagNr >= 3) {
        console.log("3 slag")
        return;
    }
    console.log("kast terning")
    kastAktuelSlag()
    await opdaterSlagNr(currentSlagNr + 1)
    terningeBillederVis(await hentAktuelSlag(), await hentHoldArray());

    //terningSetup();
    //await opdaterPointfelter();
    // stopVedTreSlag();
    // updateSlagString(); 
    // terningSetup();

    updateSlagString(currentSlagNr + 1);
    await opdaterPointfelter();
    stopVedTreSlag(currentSlagNr + 1);

     //updateResultatfelter()
    // håndterFelt();
    // checkFærdig();
}

async function terningeBillederVis(slag, holdArray) {
    console.log(slag)
    terningeBilleder.innerHTML = "";
    let i = 0;
    holdArray = await hentHoldArray();
    slag.forEach((element) => {
        if (holdArray[i]) {
            terningeBilleder[i].src=`img/terning${element}.png`
            terningeBilleder[i].id=`img${i + 1}`}
        i++;

})
    ;
}

 function terningSetup() {

    Array.from(terningeBilleder).forEach((element) => {
        console.log("Tilføjer klik-hændelse til:", element);

        element.addEventListener('click', async () =>  {
            console.log("Klikket på terning");
            let arr = await hentHoldArray()
            if (arr[(parseInt(element.id.charAt(3))-1)]) {
                element.style = "filter: opacity(50%);";
                await putHoldArray((parseInt(element.id.charAt(3))-1))
            } else {
                element.style = "";
                await putHoldArray((parseInt(element.id.charAt(3))-1))
            }
        });

    })
    }

    // document.addEventListener('DOMContentLoaded', () => {
    //     let terningeBilleder = document.getElementsByClassName("terning");
    //     console.log("terningeBilleder fundet:", terningeBilleder);
    //     terningSetup();
    // });

// function terningSetup() {
//     Array.from(terningeBilleder).forEach((element) => {
//         element.onclick = async function () {
//             console.log("Klikket på terning")
//             const index = parseInt(element.id.charAt(3)) - 1;
//             if (hentHoldArray()[index]) {
//                 element.style = "filter: opacity(50%);";
//             } else {
//                 element.style = "";
//             }
//             await putHoldArray(index);
//         };
//     });
// }

// function håndterFelt() {
//     if (feltValgt) {
//         resetTerninger();
//         feltValgtIgen(tempElement)
//         kastTilgængeligIgen();
//     }
//     feltValgt = false;
// }

// function stopVedTreSlag() {
//     if (slagNr >= 3) {
//         button.disabled = true;
//     }
// }

// function kastTilgængeligIgen() {
//     button.disabled = false;
// }

async function opdaterPointfelter() {
    await putPoints();
    let points = await hentPoints()
    Array.from(pointfelter).forEach((element) => {
        switch (element.id) {
            case "ones":
                if (element.disabled != true) {
                    element.value = points[0].point;
                }
                break;
            case "twos":
                if (element.disabled != true) {
                    element.value = points[1].point;
                }
                break;
            case "threes":
                if (element.disabled != true) {
                    element.value = points[2].point;
                }
                break;
            case "fours":
                if (element.disabled != true) {
                    element.value = points[3].point;
                }
                break;
            case "fives":
                if (element.disabled != true) {
                    element.value = points[4].point;
                }
                break;
            case "sixs":
                if (element.disabled != true) {
                    element.value = points[5].point;
                }
                break;
            case "onePair":
                if (element.disabled != true) {
                    element.value = points[6].point;
                }
                break;
            case "twoPair":
                if (element.disabled != true) {
                    element.value = points[7].point;
                }
                break;
            case "threeOfAKind":
                if (element.disabled != true) {
                    element.value = points[8].point;
                }
                break;
            case "fourOfAKind":
                if (element.disabled != true) {
                    element.value = points[9].point;
                }
                break;
            case "fullHouse":
                if (element.disabled != true) {
                    element.value = points[10].point;
                }
                break;
            case "smallStraight":
                if (element.disabled != true) {
                    element.value = points[11].point;
                }
                break;
            case "largeStraight":
                if (element.disabled != true) {
                    element.value = points[12].point;
                }
                break;
            case "chance":
                if (element.disabled != true) {
                    element.value = points[13].point;
                }
                break;
            case "yatzy":
                if (element.disabled != true) {
                    element.value = points[14].point;
                }
                break;
        }
    });
}



 function pointfelterSetup() {
     Array.from(pointfelter).forEach((element) => {
         element.onclick = async function () {
             if (!element.disabled) {
                 element.disabled = true;
                 await lockPoint(element.id);
                 updateSlagString(0);
                 await opdaterSlagNr(0);
                 terningeBillederVis(await hentAktuelSlag(), await hentHoldArray());
                 updateResultatfelter();
                 resetHoldArray();
                 resetTerninger();
                 button.disabled = false;
             }
         };
     });
 }

 function resetTerninger() {
    Array.from(terningeBilleder).forEach((element) => {
                element.style = "";       
    })
 }

 function updateResultatfelter() {
     hentPoints().then(points => {
        console.log("Points: ------")
        console.log(points)
        totalFelt.value = points.reduce((acc, curr) => acc + (curr.låst ? curr.point : 0), 0);
        sumFelt.value = points.slice(0, 6).reduce((acc, curr) => acc + (curr.låst ? curr.point : 0), 0);
        bonusFelt.value = (sumFelt.value >= 63) ? 50 : 0;
     });
 }

// function feltValgtIgen(element) {
//     vælgInputFelt(parseInt(element.value));
//     if (
//         element.id == "ones" ||
//         element.id == "twos" ||
//         element.id == "threes" ||
//         element.id == "fours" ||
//         element.id == "fives" ||
//         element.id == "sixs"
//     ) {
//         addToSum(parseInt(element.value));
//     }
// }

// function updateResultatfelter() {
//     totalFelt.value = getTotal();
//     sumFelt.value = getSum();
//     bonusFelt.value = getBonus();
// }

function updateSlagString(slagNr) {
    slagString.innerHTML = `Slag nr ${slagNr}`;
}

// function resetTerninger() {
//     myHoldArray = [true, true, true, true, true];
//     updateSlagString();
//     terningeBillederVis(resetSlag(), myHoldArray);
//     kastTilgængeligIgen();
// }

// function resetUI() {
//     resetTerninger();

//     Array.from(pointfelter).forEach((felt) => {
//         felt.value = 0;
//         felt.disabled = false;
//     });

//     totalFelt.value = 0;
//     sumFelt.value = 0;
//     bonusFelt.value = 0;
// }

// document.getElementById("nulstilSpil").addEventListener("click", function () {
//     resetSpil();
//     resetUI();
// });

// function checkFærdig() {
//     let done = true;
//     let nytspil = false;
//     Array.from(pointfelter).forEach((element) => {
//         if (!element.disabled) {
//             done = false;
//         }
//     })

//     if (done) {
//         if (confirm("Vil du starte et nyt spil?") == true) {
//             console.log("Nyt spil");
//             nytspil = true
//         }
//     }

//     if (nytspil) {
//         resetSpil();
//         resetUI();
//     }
// }
