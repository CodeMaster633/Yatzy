function kastTerning(holdArray) {
    let slag = [];
    let i = 0;

    holdArray.forEach((element) => {
        if (element == true) {
            slag[i] = Math.floor(Math.random() * 6 + 1);
        }
        i++;
    });

    return slag;
}

export { kastTerning };

function frequency(dice) {
    const freq = Array(7).fill(0);
    dice.forEach(value => {
        freq[value]++;
    });
    return freq;
}

function onePairPoints(dice) {
    const freq = frequency(dice);
    let sum = 0;
    for (let i = 0; i < freq.length; i++) {
        if (freq[i] >= 2) {
            sum = i * 2;
        }
    }

    return sum;
}

function twoPairPoints(dice) {
    const freq = frequency(dice);
    let pairs = 0;
    let sum = 0;
    for (let i = 0; i < freq.length; i++) {
        if (freq[i] >= 3) {
            sum = i * 3;
        }
    }

    if (pairs == 2) {
        return sum;
    }

    return 0;
}
