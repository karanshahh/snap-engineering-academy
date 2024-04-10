import { ufcFighterData } from './data.js';

let currentPage = 1;
const fightersPerPage = 50;
let filteredData = [];

// Function to populate fighter cards
function populateFighterCards(page = 1) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = '';  // Clear existing cards before repopulating

  const startIndex = (page - 1) * fightersPerPage;
  const endIndex = startIndex + fightersPerPage;
  const paginatedItems = filteredData.slice(startIndex, endIndex);

  paginatedItems.forEach(fighter => {
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

  updatePagination(filteredData.length, page);
}

// Function to update pagination
function updatePagination(totalItems, currentPage) {
  const pageCount = Math.ceil(totalItems / fightersPerPage);
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  for (let i = 1; i <= pageCount; i++) {
    const pageLink = document.createElement('a');
    pageLink.href = '#';
    pageLink.innerText = i;
    pageLink.onclick = function() {
      populateFighterCards(i);
      return false;
    };

    if (currentPage === i) pageLink.style.fontWeight = 'bold';

    paginationContainer.appendChild(pageLink);
    paginationContainer.appendChild(document.createTextNode(' '));
  }
}

// Function to handle the search
function handleSearch() {
  const searchInput = document.getElementById('search-box').value.toLowerCase();
  filteredData = ufcFighterData.filter(fighter => 
    fighter.FIGHTER.toLowerCase().includes(searchInput)
  );
  populateFighterCards(1);
}

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', handleSearch);

// Initialize with all data
filteredData = ufcFighterData.slice(); // Copy all data to filteredData
populateFighterCards(1); // Populate cards with the first page of data
