let button = document.querySelector("button");
let input = document.querySelector("input");
let terningeBilleder = document.querySelector(".TerningeBilleder");

button.onclick = kastTerning;

function kastTerning() {
  let slag = Math.floor(Math.random() * 6 + 1);
  input.value = slag;
  terningeBillederVis(slag);
}

function terningeBillederVis(slag) {
  terningeBilleder.innerHTML = `<p><img src="img/terning${slag}.png" /></p>`; // Brugte template strings til at indsætte variabel
}
