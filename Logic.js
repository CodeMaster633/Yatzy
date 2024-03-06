let nuværendeSlag = [1, 1, 1, 1, 1];

function kastTerning(holdArray) {
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

export { kastTerning };
