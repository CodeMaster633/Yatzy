export let games = [];

export function createNewGame() {
    const newGame = {
        nuværendeSlag: [1, 3, 1, 6, 1],
        totalVærdi: 0,
        sum: 0,
        bonus: 0,
        slagNr: 0,
        myHoldArray: [true, true, true, true, true],
        feltValgt: false,
        tempElement: null,
        points: [
            { navn: "ones", point: 0, låst: false },
            { navn: "twos", point: 0, låst: false },
            { navn: "threes", point: 0, låst: false },
            { navn: "fours", point: 0, låst: false },
            { navn: "fives", point: 0, låst: false },
            { navn: "sixs", point: 0, låst: false },
            { navn: "onePair", point: 0, låst: false },
            { navn: "twoPair", point: 0, låst: false },
            { navn: "threeSame", point: 0, låst: false },
            { navn: "fourSame", point: 0, låst: false },
            { navn: "fullHouse", point: 0, låst: false },
            { navn: "smallStraight", point: 0, låst: false },
            { navn: "largeStraight", point: 0, låst: false },
            { navn: "chance", point: 0, låst: false },
            { navn: "yatzy", point: 0, låst: false }
        ]
    };
    games.push(newGame);
    console.log(`New game created with ID: ${games.length - 1}`);
    return games.length - 1;
}

export function getGame(gameId) {
    const game = games[gameId];
    console.log(`Retrieved game with ID: ${gameId}, game: ${game ? 'exists' : 'does not exist'}`);
    return game;
}

export function kastTerning(gameId) {
    let game = getGame(gameId);
    let i = 0;

    game.myHoldArray.forEach((element) => {
        if (element == true) {
            game.nuværendeSlag[i] = Math.floor(Math.random() * 6 + 1);
        }
        i++;
    });
    if (game.slagNr >= 3) {
        game.slagNr = 0;
    } else {
        game.slagNr++;
    }
    return game.nuværendeSlag;
}

export function vælgInputFelt(gameId, værdi) {
    let game = getGame(gameId);
    game.totalVærdi += værdi;
}

export function addToSum(gameId, værdi) {
    let game = getGame(gameId);
    game.sum += værdi;
    if (game.sum >= 63 && game.bonus === 0) {
        console.log("bonus opnået")
        game.bonus = 50;
        game.totalVærdi += game.bonus;
    }
}

export function getTotal(gameId) {
    return getGame(gameId).totalVærdi;
}

export function getSum(gameId) {
    return getGame(gameId).sum;
}

export function getBonus(gameId) {
    let game = getGame(gameId);
    if (game.sum >= 63) {
        game.bonus = 50;
        game.totalVærdi += game.bonus;
    }
    return game.bonus;
}

export function resetSpil(gameId) {
    let game = getGame(gameId);
    game.nuværendeSlag.fill(1);
    game.totalVærdi = 0;
    game.sum = 0;
    game.bonus = 0;
}

export function resetSlag(gameId) {
    let game = getGame(gameId);
    game.nuværendeSlag = [1, 1, 1, 1, 1];
    game.slagNr = 0;
    return game.nuværendeSlag;
}

export function frequency(dice) {
    const freq = Array(7).fill(0);
    dice.forEach((value) => {
        freq[value]++;
    });
    return freq;
}

export function putHoldArray(gameId, terningNr) {
    let game = getGame(gameId);
    game.myHoldArray[terningNr] = !game.myHoldArray[terningNr];
}

export function resetHoldArray(gameId) {
    let game = getGame(gameId);
    game.myHoldArray = [true, true, true, true, true];
}

export function putPoints(gameId) {
    let game = getGame(gameId);
    if (!game.points.find(e => e.navn === "ones").låst) { ones(gameId); }
    if (!game.points.find(e => e.navn === "twos").låst) { twos(gameId); }
    if (!game.points.find(e => e.navn === "threes").låst) { threes(gameId); }
    if (!game.points.find(e => e.navn === "fours").låst) { fours(gameId); }
    if (!game.points.find(e => e.navn === "fives").låst) { fives(gameId); }
    if (!game.points.find(e => e.navn === "sixs").låst) { sixs(gameId); }
    if (!game.points.find(e => e.navn === "onePair").låst) { onePairPoints(gameId); }
    if (!game.points.find(e => e.navn === "twoPair").låst) { twoPairPoints(gameId); }
    if (!game.points.find(e => e.navn === "threeSame").låst) { threeSamePoints(gameId); }
    if (!game.points.find(e => e.navn === "fourSame").låst) { fourSamePoints(gameId); }
    if (!game.points.find(e => e.navn === "fullHouse").låst) { fullHousePoints(gameId); }
    if (!game.points.find(e => e.navn === "smallStraight").låst) { smallStraightPoints(gameId); }
    if (!game.points.find(e => e.navn === "largeStraight").låst) { largeStraightPoints(gameId); }
    if (!game.points.find(e => e.navn === "chance").låst) { chancePoints(gameId); }
    if (!game.points.find(e => e.navn === "yatzy").låst) { yatzyPoints(gameId); }
}

export function ones(gameId) {
    const game = getGame(gameId);
    const freq = frequency(game.nuværendeSlag);
    let pointEntry = game.points.find(e => e.navn === "ones");
    if (pointEntry) {
        pointEntry.point = freq[1] * 1;
    }
}

export function twos(gameId) {
    let game = getGame(gameId);
    const freq = frequency(game.nuværendeSlag);
    let pointEntry = game.points.find(e => e.navn === "twos");
    console.log(pointEntry)
    if (pointEntry) {
        console.log("twos")
        console.log(pointEntry)
        pointEntry.point = freq[2] * 2;
    }

}

export function threes(gameId) {
    let game = getGame(gameId);
    const freq = frequency(game.nuværendeSlag);
    let pointEntry = game.points.find(e => e.navn === "threes")
    if (pointEntry)
        pointEntry.point = freq[3] * 3;
}

export function fours(gameId) {
    let game = getGame(gameId);
    const freq = frequency(game.nuværendeSlag);
    let pointEntry = game.points.find(e => e.navn === "fours");
    if (pointEntry)
        pointEntry.point = freq[4] * 4;
}

export function fives(gameId) {
    let game = getGame(gameId);
    const freq = frequency(game.nuværendeSlag);
    let pointEntry = game.points.find(e => e.navn === "fives")
    if (pointEntry)
        pointEntry.point = freq[5] * 5;
}

export function sixs(gameId) {
    let game = getGame(gameId);
    const freq = frequency(game.nuværendeSlag);
    let pointEntry = game.points.find(e => e.navn === "sixs");
    if (pointEntry)
        pointEntry.point = freq[6] * 6;
}

export function onePairPoints(gameId) {
    let game = getGame(gameId);
    const freq = frequency(game.nuværendeSlag);
    let sum = 0;
    let pointEntry = game.points.find(e => e.navn === "onePair")
    if (pointEntry) {
        for (let i = 0; i < freq.length; i++) {
            if (freq[i] >= 2) {
                sum = i * 2;
            }
        }
        pointEntry.point = sum;
    }
}

export function twoPairPoints(gameId) {
    let game = getGame(gameId);
    const freq = frequency(game.nuværendeSlag);
    let pairs = 0;
    let sum = 0;
    let pointEntry = game.points.find(e => e.navn === "twoPair");
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

export function threeSamePoints(gameId) {
    let game = getGame(gameId)
    const freq = frequency(game.nuværendeSlag);
    let sum = 0;
    let pointEntry = game.points.find(e => e.navn === "threeSame");
    if (pointEntry) {
        for (let i = 0; i < freq.length; i++) {
            if (freq[i] >= 3) {
                sum += i * 3;
            }
        }
        pointEntry.point = sum;
    }
}

export function fourSamePoints(gameId) {
    let game = getGame(gameId)
    const freq = frequency(game.nuværendeSlag);
    let sum = 0;
    let pointEntry = game.points.find(e => e.navn === "fourSame");
    if (pointEntry) {
        for (let i = 0; i < freq.length; i++) {
            if (freq[i] >= 4) {
                sum += i * 4;
            }
        }
        pointEntry.point = sum;
    }
}

export function fullHousePoints(gameId) {
    let game = getGame(gameId);
    const freq = frequency(game.nuværendeSlag);
    let sum = 0;
    let foundThree = false;
    let foundTwo = false;
    let pointEntry = game.points.find(e => e.navn === "fullHouse");
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
            for (let i = 0; i < game.nuværendeSlag.length; i++) {
                sum += game.nuværendeSlag[i];
            }
        }
        pointEntry.point = sum;
    }
}

export function smallStraightPoints(gameId) {
    let game = getGame(gameId)
    const freq = frequency(game.nuværendeSlag);
    let duplicates = 0;
    let sum = 0;
    let pointEntry = game.points.find(e => e.navn === "smallStraight")
    if (pointEntry) {
        for (let i = 0; i < freq.length; i++) {
            if (freq[i] === 2) {
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

export function largeStraightPoints(gameId) {
    let game = getGame(gameId)
    const freq = frequency(game.nuværendeSlag);
    let pointEntry = game.points.find(e => e.navn === "largeStraight");
    if (pointEntry) {
        if (freq[2] === 1 && freq[3] === 1 && freq[4] === 1 && freq[5] === 1 && freq[6] === 1) {
            pointEntry.point = 20;
        }
        pointEntry.point = 0;
    }
}

export function chancePoints(gameId) {
    let game = getGame(gameId)
    let sum = 0;
    let pointEntry = game.points.find(e => e.navn === "chance");
    if (pointEntry) {
        for (let i = 0; i < game.nuværendeSlag.length; i++) {
            sum += game.nuværendeSlag[i];
        }
        pointEntry.point = sum;
    }
}

export function yatzyPoints(gameId) {
    let game = getGame(gameId)
    let sum = 0;
    let first = game.nuværendeSlag[0];
    let yatzy = false;
    let pointEntry = game.points.find(e => e.navn === "yatzy");
    if (pointEntry) {
        for (let i = 0; i < game.nuværendeSlag.length; i++) {
            if (game.nuværendeSlag[i] !== first) {
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

export function lockPoints(navn, gameId) {
    let game = getGame(gameId)
    console.log("lockPoints navn: " + navn)
    let pointEntry = game.points.find(e => e.navn === navn);
    if (pointEntry && !pointEntry.låst) {
        pointEntry.låst = true;
        addToSum(gameId, pointEntry.point);
        vælgInputFelt(gameId, pointEntry.point);
    }
}

export function calculateTotal(gameId) {
    let game = getGame(gameId)
    game.totalVærdi = game.points.reduce((acc, curr) => acc + (curr.låst ? curr.point : 0), 0);
}
