let nuværendeSlag = [1, 1, 1, 1, 1];

export function kastTerning(holdArray) {
  //let slag = [];
  let i = 0;

  holdArray.forEach((element) => {
    if (element == true) {
      nuværendeSlag[i] = Math.floor(Math.random() * 6 + 1);
    }
    i++;
  });

  console.log(nuværendeSlag);
  return nuværendeSlag;
}

function frequency(dice) {
  const freq = Array(7).fill(0);
  dice.forEach((value) => {
    freq[value]++;
  });
  return freq;
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
  let pairs = 0;
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
    } else {
      yatzy = true;
    }
  }

  if (yatzy) {
    sum = 50;
  }

  return sum;
}
