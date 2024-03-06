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
