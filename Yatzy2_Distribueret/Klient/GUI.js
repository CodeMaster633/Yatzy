import { get, post, put } from "./YatzyFetch.js";

let terningeBilleder = document.getElementsByClassName("terning");
let button = document.getElementById("kastTerninger");
let slagString = document.getElementById("slagString");
let pointfelter = document.getElementById("pointDiv").getElementsByClassName("pointFelt");
let totalFelt = document.getElementById("total");
let sumFelt = document.getElementById("sum");
let bonusFelt = document.getElementById("bonus");

let ip = "http://localhost:8000/";
let gameId = localStorage.getItem('gameId');

async function createNewGame() {
    const response = await post(ip + "newGame", {});
    gameId = response.gameId;
    console.log(`Received new gameId: ${gameId}`);
    localStorage.setItem('gameId', gameId);
    return gameId;
}

if (gameId) {
    await createNewGame();
}

async function hentHoldArray() {
    return await get(`${ip}holdArray/${gameId}`);
}

async function putHoldArray(terningNr) {
    return await put(`${ip}putHoldArray/${gameId}`, { terningNr });
}

async function resetHoldArray() {
    return await put(`${ip}resetHoldArray/${gameId}`);
}

async function hentAktuelSlag() {
    return await get(`${ip}slag/${gameId}`);
}

async function hentSlagNr() {
    const response = await get(`${ip}getSlagNr/${gameId}`);
    return response.slagNr;
}

async function opdaterSlagNr(newSlagNr) {
    return await put(`${ip}putSlagNr/${gameId}`, { slagNr: newSlagNr });
}

async function kastAktuelSlag() {
    return await put(`${ip}kastTerninger/${gameId}`);
}

async function putPoints() {
    return await put(`${ip}putPoints/${gameId}`);
}

async function lockPoint(navn) {
    return await put(`${ip}lockPoint/${gameId}`, { navn });
}

async function hentPoints() {
    try {
        return await get(`${ip}points/${gameId}`);
    } catch (error) {
        console.error("Fejl ved hentning af points:", error);
        return 0;
    }
}

terningeBillederVis(await hentAktuelSlag(), await hentHoldArray());

pointfelterSetup();
terningSetup();

button.addEventListener('click', kastTerningKnap);

async function kastTerningKnap() {
    let currentSlagNr = await hentSlagNr();
    if (currentSlagNr >= 3) {
        console.log("3 slag")
        return;
    }
    console.log("kast terning")
    await kastAktuelSlag();
    await opdaterSlagNr(currentSlagNr + 1);
    terningeBillederVis(await hentAktuelSlag(), await hentHoldArray());

    updateSlagString(currentSlagNr + 1);
    await opdaterPointfelter();
    stopVedTreSlag(currentSlagNr + 1);
}

 function stopVedTreSlag(slagNr) {
     if (slagNr >= 3) {
         button.disabled = true;
     }
}

async function terningeBillederVis(slag, holdArray) {
    console.log(slag);
    terningeBilleder.innerHTML = "";
    let i = 0;
    holdArray = await hentHoldArray();
    slag.forEach((element) => {
        if (holdArray[i]) {
            terningeBilleder[i].src = `img/terning${element}.png`
            terningeBilleder[i].id = `img${i + 1}`
        }
        i++;
    });
}

function terningSetup() {
    Array.from(terningeBilleder).forEach((element) => {
        console.log("Tilføjer klik-hændelse til:", element);
        element.addEventListener('click', async () => {
            console.log("Klikket på terning");
            let arr = await hentHoldArray();
            const index = parseInt(element.id.charAt(3)) - 1;
            if (arr[index]) {
                element.style = "filter: opacity(50%);";
            } else {
                element.style = "";
            }
            await putHoldArray(index);
        });
    });
}

async function opdaterPointfelter() {
    await putPoints();
    let points = await hentPoints();
    Array.from(pointfelter).forEach((element) => {
        switch (element.id) {
            case "ones":
                if (!element.disabled) element.value = points[0].point;
                break;
            case "twos":
                if (!element.disabled) element.value = points[1].point;
                break;
            case "threes":
                if (!element.disabled) element.value = points[2].point;
                break;
            case "fours":
                if (!element.disabled) element.value = points[3].point;
                break;
            case "fives":
                if (!element.disabled) element.value = points[4].point;
                break;
            case "sixs":
                if (!element.disabled) element.value = points[5].point;
                break;
            case "onePair":
                if (!element.disabled) element.value = points[6].point;
                break;
            case "twoPair":
                if (!element.disabled) element.value = points[7].point;
                break;
            case "threeOfAKind":
                if (!element.disabled) element.value = points[8].point;
                break;
            case "fourOfAKind":
                if (!element.disabled) element.value = points[9].point;
                break;
            case "fullHouse":
                if (!element.disabled) element.value = points[10].point;
                break;
            case "smallStraight":
                if (!element.disabled) element.value = points[11].point;
                break;
            case "largeStraight":
                if (!element.disabled) element.value = points[12].point;
                break;
            case "chance":
                if (!element.disabled) element.value = points[13].point;
                break;
            case "yatzy":
                if (!element.disabled) element.value = points[14].point;
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
                await resetHoldArray();
                resetTerninger();
                button.disabled = false;
            }
        };
    });
}

function resetTerninger() {
    Array.from(terningeBilleder).forEach((element) => {
        element.style = "";
    });
}

function updateResultatfelter() {
    hentPoints().then(points => {
        console.log("Points: ------");
        console.log(points);
        totalFelt.value = points.reduce((acc, curr) => acc + (curr.låst ? curr.point : 0), 0);
        sumFelt.value = points.slice(0, 6).reduce((acc, curr) => acc + (curr.låst ? curr.point : 0), 0);
        bonusFelt.value = (sumFelt.value >= 63) ? 50 : 0;
    });
}

function updateSlagString(slagNr) {
    slagString.innerHTML = `Slag nr ${slagNr}`;
}
