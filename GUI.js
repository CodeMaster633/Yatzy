import { kastTerning } from "./Logic.js";

let input = document.querySelector("input");
let terningeBilleder = document.getElementsByClassName("terning");
let button = document.getElementById("kastTerninger");
let myHoldArray = [true, true, true, true, true];

button.onclick = function () {
  let slag = kastTerning(myHoldArray);
  terningeBillederVis(slag, myHoldArray);
};

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
