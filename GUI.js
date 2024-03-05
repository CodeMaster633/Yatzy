let button = document.getElementById("kastTerninger");
let input = document.querySelector("input");
let terningeBilleder = document.getElementsByClassName("terning");

button.onclick = function () {
  kastTerning([true, true, true, true, true, true]);
};

function kastTerning(holdArray) {
  console.log("Kast");
  let slag = [];
  let i = 0;

  holdArray.forEach((element) => {
    if (element == true) {
      slag[i] = Math.floor(Math.random() * 6 + 1);
    }
    i++;
  });

  //input.value = slag;
  terningeBillederVis(slag, holdArray);
}

function terningeBillederVis(slag, holdArray) {
  //terningeBilleder.innerHTML = `<p><img src="img/terning${slag}.png" /></p>`;
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

  //  terningeBilleder.innerHTML =
  //  '<img src="img/terning2.png" width="100" height="100" /> <img src="img/terning1.png" width="100" height="100" /> <img src="img/terning1.png" width="100" height="100" /> <img src="img/terning1.png" width="100" height="100" /><img src="img/terning1.png" width="100" height="100" /><img src="img/terning1.png" width="100" height="100" />'
}
