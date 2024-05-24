import e from "express";

export let nuværendeSlag = [1, 3, 1, 6, 1];
export let totalVærdi = 0;
export let sum = 0;
export let bonus = 0;
export let slagNr = 0;
export let myHoldArray = [true, true, true, true, true];
export let feltValgt = false;
export let tempElement = null;
export let points = [
    {navn:"ones", point:0, låst:false},
    {navn:"twos", point:0, låst:false},
    {navn:"threes", point:0, låst:false},
    {navn:"fours", point:0, låst:false},
    {navn:"fives", point:0, låst:false},
    {navn:"sixs", point:0, låst:false},
    {navn:"onePair", point:0, låst:false},
    {navn:"twoPair", point:0, låst:false},
    {navn:"threeSame", point:0, låst:false},
    {navn:"fourSame", point:0, låst:false},
    {navn:"fullHouse", point:0, låst:false},
    {navn:"smallStraight", point:0, låst:false},
    {navn:"largeStraight", point:0, låst:false},
    {navn:"chance", point:0, låst:false},
    {navn:"yatzy", point:0, låst:false}
];

export function kastTerning() {
    let i = 0;

    myHoldArray.forEach((element) => {
        if (element == true) {
            nuværendeSlag[i] = Math.floor(Math.random() * 6 + 1);
        }
        i++;
    });
    if (slagNr >= 3) {
        slagNr = 0;
    } else {
        slagNr++;
    }
    return nuværendeSlag;
}

export function vælgInputFelt(værdi) {
    totalVærdi += værdi;
}

export function addToSum(værdi) {
    sum += værdi;
    if (sum >= 10 && bonus == 0) {
        console.log("bonus------")
        bonus = 50;
        totalVærdi += bonus;
    }
}

export function getTotal() {
    return totalVærdi;
}

export function getSum() {
    return sum;
}

export function getBonus() {
    if (sum >= 63) {
        bonus = 50;
        totalVærdi += bonus;
    }
    return bonus;
}

export function resetSpil() {
    nuværendeSlag.fill(1);
    totalVærdi = 0;
    sum = 0;
    bonus = 0;
}

export function resetSlag() {
    nuværendeSlag = [1, 1, 1, 1, 1];
    slagNr = 0;
    return nuværendeSlag;
}

export function frequency(dice) {
    const freq = Array(7).fill(0);
    dice.forEach((value) => {
        freq[value]++;
    });
    return freq;
}

export function putHoldArray(terningNr){
    myHoldArray[terningNr] = !myHoldArray[terningNr];
}

export function resetHoldArray(){
    myHoldArray = [true, true, true, true, true]
}


export function putPoints(){
    if(!points.find(e => e.navn === "ones").låst){ones(nuværendeSlag);}
    if(!points.find(e => e.navn === "twos").låst){twos(nuværendeSlag);}
    if(!points.find(e => e.navn === "threes").låst){threes(nuværendeSlag);}
    if(!points.find(e => e.navn === "fours").låst){fours(nuværendeSlag);}
    if(!points.find(e => e.navn === "fives").låst){fives(nuværendeSlag);}
    if(!points.find(e => e.navn === "sixs").låst){sixs(nuværendeSlag);}
    if(!points.find(e => e.navn === "onePair").låst){onePairPoints(nuværendeSlag);}
    if(!points.find(e => e.navn === "twoPair").låst){twoPairPoints(nuværendeSlag);}
    if(!points.find(e => e.navn === "threeSame").låst){threeSamePoints(nuværendeSlag);}
    if(!points.find(e => e.navn === "fourSame").låst){fourSamePoints(nuværendeSlag);}
    if(!points.find(e => e.navn === "fullHouse").låst){fullHousePoints(nuværendeSlag);}
    if(!points.find(e => e.navn === "smallStraight").låst){smallStraightPoints(nuværendeSlag);}
    if(!points.find(e => e.navn === "largeStraight").låst){largeStraightPoints(nuværendeSlag);}
    if(!points.find(e => e.navn === "chance").låst){chancePoints(nuværendeSlag);}
    if(!points.find(e => e.navn === "yatzy").låst){yatzyPoints(nuværendeSlag);}

}

export function ones(dice) {
    const freq = frequency(nuværendeSlag);
    let pointEntry = points.find(e => e.navn === "ones");
    if (pointEntry) {
        pointEntry.point = freq[1] * 1;
    }
}

export function twos(dice) {
    const freq = frequency(nuværendeSlag);
    let pointEntry = points.find(e => e.navn === "twos");
    console.log(pointEntry)
    if (pointEntry) {
        console.log("twos")
        console.log(pointEntry)
        pointEntry.point = freq[2] * 2;
    }

}

export function threes(dice) {
    const freq = frequency(dice);
    let pointEntry = points.find(e => e.navn === "threes")
    if (pointEntry)
        pointEntry.point = freq[3] * 3;
}

export function fours(dice) {
    const freq = frequency(dice);
    let pointEntry = points.find(e => e.navn === "fours");
    if (pointEntry)
        pointEntry.point = freq[4] * 4;
}

export function fives(dice) {
    const freq = frequency(dice);
    let pointEntry = points.find(e => e.navn === "fives")
    if (pointEntry)
        pointEntry.point = freq[5] * 5;
}

export function sixs(dice) {
    const freq = frequency(dice);
    let pointEntry = points.find(e => e.navn === "sixs");
    if (pointEntry)
        pointEntry.point = freq[6] * 6;
}

export function onePairPoints(dice) {
    const freq = frequency(dice);
    let sum = 0;
    let pointEntry = points.find(e => e.navn === "onePairPoints")
    if (pointEntry) {
        for (let i = 0; i < freq.length; i++) {
            if (freq[i] >= 2) {
                sum = i * 2;
            }
        }
        pointEntry.point = sum;
    }
}

export function twoPairPoints(dice) {
    const freq = frequency(dice);
    let pairs = 0;
    let sum = 0;
    let pointEntry = points.find(e => e.navn === "twoPairPoints");
    if (pointEntry) {
        for (let i = 0; i < freq.length; i++) {
            if (freq[i] >= 2) {
                sum += i * 2;
                pairs++;
            }
        }

        if (pairs === 2) {
            pointEntry.point = sum;
        }
        pointEntry.point = sum;
    }
}

export function threeSamePoints(dice) {
    const freq = frequency(dice);
    let sum = 0;
    let pointEntry = points.find(e => e.navn === "threeSamePoints");
    if (pointEntry) {
        for (let i = 0; i < freq.length; i++) {
            if (freq[i] >= 3) {
                sum += i * 3;
            }
        }
        pointEntry.point = sum;
    }
}

export function fourSamePoints(dice) {
    const freq = frequency(dice);
    let sum = 0;
    let pointEntry = points.find(e => e.navn === "fourSamePoints");
    if (pointEntry) {
        for (let i = 0; i < freq.length; i++) {
            if (freq[i] >= 4) {
                sum += i * 4;
            }
        }
        pointEntry.point = sum;
    }
}

export function fullHousePoints(dice) {
    const freq = frequency(dice);
    let sum = 0;
    let foundThree = false;
    let foundTwo = false;
    let pointEntry = points.find(e => e.navn === "fullHousePoints");
    if (pointEntry) {
        for (let i = 0; i < freq.length; i++) {
            if (freq[i] === 3) {
                foundThree = true;
            }
            if (freq[i] === 2) {
                foundTwo = true;
            }
        }

        if (foundThree && foundTwo) {
            for (let i = 0; i < dice.length; i++) {
                sum += dice[i];
            }
        }
        pointEntry.point = sum;
    }
}

export function smallStraightPoints(dice) {
    const freq = frequency(dice);
    let duplicates = 0;
    let sum = 0;
    let pointEntry = points.find(e => e.navn === "smallStraightPoints")
    if (pointEntry) {
        for (let i = 0; i < freq.length; i++) {
            if (freq[i] == 2) {
                duplicates++;
            }
            sum = sum + freq[i] * i;
        }

        if (sum == 15 && duplicates < 2) {
            pointEntry.point = sum;
        } else {
            pointEntry.point = sum;
        }
    }
}

//Skal ændres TODO
export function largeStraightPoints(dice) {
    const freq = frequency(dice);
    let pointEntry = points.find(e => e.navn === "largeStraightPoints");
    if (pointEntry) {
        if (freq[2] === 1 && freq[3] === 1 && freq[4] === 1 && freq[5] === 1 && freq[6] === 1) {
            pointEntry.point = 20;
        }
        pointEntry.point = 0;
    }
}

export function chancePoints(dice) {
    let sum = 0;
    let pointEntry = points.find(e => e.navn === "chancePoints");
    if (pointEntry) {
        for (let i = 0; i < dice.length; i++) {
            sum += dice[i];
        }
        pointEntry.point = sum;
    }
}

export function yatzyPoints(dice) {
    let sum = 0;
    let first = dice[0];
    let yatzy = false;
    let pointEntry = points.find(e => e.navn === "yatzyPoints");
    if (pointEntry) {
        for (let i = 0; i < dice.length; i++) {
            if (dice[i] !== first) {
                yatzy = false;
                break;
            } else {
                yatzy = true;
            }
        }

        if (yatzy) {
            sum = 50;
            pointEntry.point = sum;
        }

        pointEntry.point = sum;
    }
}

export function lockPoints(navn) {
    console.log("lockPoints navn: "+navn)
    let pointEntry = points.find(e => e.navn == navn);
    if (pointEntry && !pointEntry.låst) {
        pointEntry.låst = true;
        addToSum(pointEntry.point);
        vælgInputFelt(pointEntry.point);
    }
}

export function calculateTotal() {
    totalVærdi = points.reduce((acc, curr) => acc + (curr.låst ? curr.point : 0), 0);
}
