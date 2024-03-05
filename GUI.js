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
  // Tilføjet parameter til funktionen
  // Fikset syntaksfejl i nedenstående linje
  terningeBilleder.innerHTML = `<p><img src="img/terning${slag}.png" /></p>`; // Brugte template strings til at indsætte variabel
}

function terningeBillederVis() {
  terningeBilleder.innerHTML =
    innerHTML +
    (
      <p>
        <img src="img/terning1.png" />
      </p>
    );
}
