import { ufcFighterData } from "./data.js";

function populateFighterCards(data) {
  const cardContainer = document.getElementById("card-container");
  data.forEach((fighter) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h2 class="fighter-name">${fighter.FIGHTER}</h2>
      <p><strong>Height:</strong> ${fighter.HEIGHT}</p>
      <p><strong>Weight:</strong> ${fighter.WEIGHT}</p>
      <p><strong>Reach:</strong> ${fighter.REACH}</p>
      <p><strong>Stance:</strong> ${fighter.STANCE}</p>
      <p><strong>DOB:</strong> ${fighter.DOB}</p>
      <a href="${fighter.URL}" target="_blank">More Info</a>
    `;

    cardContainer.appendChild(card);
  });
}

populateFighterCards(ufcFighterData);
