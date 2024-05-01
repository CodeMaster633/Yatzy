export let nuværendeSlag = [1, 3, 1, 6, 1];
export let totalVærdi = 0;
export let sum = 0;
export let bonus = 0;
export let slagNr = 0;
export let myHoldArray = [true, true, true, true, true];


export function kastTerning() {
    let i = 0;

    myHoldArray.forEach((element) => {
        if (element == true) {
            nuværendeSlag[i] = Math.floor(Math.random() * 6 + 1);
        }
        i++;
    });
    slagNr++;

    return nuværendeSlag;
}

export function vælgInputFelt(værdi) {
    totalVærdi += værdi;
}

export function addToSum(værdi) {
    sum += værdi;
    if (sum >= 63 && bonus === 0) {
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

export function ones(dice) {
    const freq = frequency(dice);
    return freq[1] * 1;
}

export function twos(dice) {
    const freq = frequency(dice);
    return freq[2] * 2;
}

export function threes(dice) {
    const freq = frequency(dice);
    return freq[3] * 3;
}

export function fours(dice) {
    const freq = frequency(dice);
    return freq[4] * 4;
}

export function fives(dice) {
    const freq = frequency(dice);
    return freq[5] * 5;
}

export function sixs(dice) {
    const freq = frequency(dice);
    return freq[6] * 6;
}

export function onePairPoints(dice) {
    const freq = frequency(dice);
    let sum = 0;

    for (let i = 0; i < freq.length; i++) {
        if (freq[i] >= 2) {
            sum = i * 2;
        }
    }

    return sum;
}

export function twoPairPoints(dice) {
    const freq = frequency(dice);
    let pairs = 0;
    let sum = 0;

    for (let i = 0; i < freq.length; i++) {
        if (freq[i] >= 2) {
            sum += i * 2;
            pairs++;
        }
    }

    if (pairs == 2) {
        return sum;
    }

    return 0;
}

export function threeSamePoints(dice) {
    const freq = frequency(dice);
    let sum = 0;

    for (let i = 0; i < freq.length; i++) {
        if (freq[i] >= 3) {
            sum += i * 3;
        }
    }

    return sum;
}

export function fourSamePoints(dice) {
    const freq = frequency(dice);
    let sum = 0;
    for (let i = 0; i < freq.length; i++) {
        if (freq[i] >= 4) {
            sum += i * 4;
        }
    }

    return sum;
}

export function fullHousePoints(dice) {
    const freq = frequency(dice);
    let sum = 0;
    let foundThree = false;
    let foundTwo = false;

    for (let i = 0; i < freq.length; i++) {
        if (freq[i] == 3) {
            foundThree = true;
        }
        if (freq[i] == 2) {
            foundTwo = true;
        }
    }

    if (foundThree && foundTwo) {
        for (let i = 0; i < dice.length; i++) {
            sum += dice[i];
        }
    }

    return sum;
}

export function smallStraightPoints(dice) {
    const freq = frequency(dice);
    let duplicates = 0;
    let sum = 0;

    for (let i = 0; i < freq.length; i++) {
        if (freq[i] == 2) {
            duplicates++;
        }
        sum = sum + freq[i] * i;
    }

    if (sum == 15 && duplicates < 2) {
        return sum;
    } else {
        return 0;
    }
}

//Skal ændres TODO
export function largeStraightPoints(dice) {
    const freq = frequency(dice);
    if (freq[2] === 1 && freq[3] === 1 && freq[4] === 1 && freq[5] === 1 && freq[6] === 1) {
        return 20;
    }
    return 0;
}

export function chancePoints(dice) {
    let sum = 0;

    for (let i = 0; i < dice.length; i++) {
        sum += dice[i];
    }

    return sum;
}

export function yatzyPoints(dice) {
    let sum = 0;
    let first = dice[0];
    let yatzy = false;

    for (let i = 0; i < dice.length; i++) {
        if (dice[i] != first) {
            yatzy = false;
            break;
        } else {
            yatzy = true;
        }
    }

    if (yatzy) {
        sum = 50;
    }

    return sum;
}
