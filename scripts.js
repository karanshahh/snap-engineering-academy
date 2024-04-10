import { ufcFighterData } from './data.js';

let currentPage = 1;
const fightersPerPage = 50;
let filteredData = ufcFighterData;
let currentRangeStart = 1;

function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

function sortData(criteria) {
  if (criteria === 'name') {
      filteredData.sort((a, b) => a.FIGHTER.localeCompare(b.FIGHTER));
  } else if (criteria === 'age') {
      filteredData.sort((a, b) => getAge(a.DOB) - getAge(b.DOB));
  }
  populateFighterCards(1);
}

document.getElementById('sort-button').addEventListener('click', () => {
  const sortCriteria = document.getElementById('sort-options').value;
  sortData(sortCriteria);
});


function updatePagination(totalItems, currentPage) {
    const pageCount = Math.ceil(totalItems / fightersPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Clear existing pagination links

    // Create previous range arrow if not at the start
    if (currentRangeStart > 1) {
        const prevRange = document.createElement('a');
        prevRange.href = '#';
        prevRange.innerHTML = '&laquo;';
        prevRange.addEventListener('click', (e) => {
            e.preventDefault();
            currentRangeStart = Math.max(1, currentRangeStart - 10);
            populateFighterCards(currentRangeStart);
        });
        paginationContainer.appendChild(prevRange);
    }

    // Display page numbers in the current range
    for (let i = currentRangeStart; i <= Math.min(pageCount, currentRangeStart + 9); i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.innerText = i;
        pageLink.className = currentPage === i ? 'active-page' : '';
        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            populateFighterCards(i);
        });
        paginationContainer.appendChild(pageLink);
    }

    // Create next range arrow if not at the end
    if (currentRangeStart + 9 < pageCount) {
        const nextRange = document.createElement('a');
        nextRange.href = '#';
        nextRange.innerHTML = '&raquo;';
        nextRange.addEventListener('click', (e) => {
            e.preventDefault();
            currentRangeStart = Math.min(pageCount - 9, currentRangeStart + 10);
            populateFighterCards(currentRangeStart);
        });
        paginationContainer.appendChild(nextRange);
    }
}

// Populate the initial fighter names
function populateFighterCards(page = 1) {
  currentPage = page;
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = '';
  
  const startIndex = (page - 1) * fightersPerPage;
  const endIndex = startIndex + fightersPerPage;
  const paginatedItems = filteredData.slice(startIndex, endIndex);

  paginatedItems.forEach(fighter => {
    const nameElement = document.createElement("div");
    nameElement.classList.add("fighter-name");
    nameElement.textContent = fighter.FIGHTER;
    nameElement.onclick = () => showFighterDetails(fighter);
    cardContainer.appendChild(nameElement);
  });

  updatePagination(filteredData.length, page);
}

// Show fighter details in a popup
function showFighterDetails(fighter) {
  // Create the overlay first to allow the user to click anywhere to close
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);
  overlay.style.display = 'block';
  overlay.onclick = () => {
    popup.remove();
    overlay.remove();
  };

  // Create the pop-up container for fighter details
  const popup = document.createElement("div");
  popup.classList.add("card-popup");

  const imageUrl = fighter.IMAGEURL || './images/no-profile-image.png'; 

  // Set up the HTML structure, placing the image to the left of the details
  popup.innerHTML = `
    <div style="display: flex;">
      <img src="${imageUrl}" alt="Image of ${fighter.FIGHTER}" style="width: 150px; height: auto; margin-right: 20px;">
      <div>
        <h2>${fighter.FIGHTER}</h2>
        <p><strong>Height:</strong> ${fighter.HEIGHT}</p>
        <p><strong>Weight:</strong> ${fighter.WEIGHT}</p>
        <p><strong>Reach:</strong> ${fighter.REACH}</p>
        <p><strong>Stance:</strong> ${fighter.STANCE}</p>
        <p><strong>DOB:</strong> ${fighter.DOB}</p>
        <a href="${fighter.URL}" target="_blank">More Info</a>
      </div>
    </div>
  `;

  // Append and display the pop-up
  document.body.appendChild(popup);
  popup.style.display = 'block';
}

// Handle search functionality
function handleSearch() {
  const searchInput = document.getElementById('search-box').value.toLowerCase();
  filteredData = ufcFighterData.filter(fighter => 
    fighter.FIGHTER.toLowerCase().includes(searchInput)
  );
  populateFighterCards(1);
}

document.getElementById('search-button').addEventListener('click', handleSearch);

function filterByDateAfter() {
  const selectedDate = document.getElementById('dob-filter-after').value;
  if (!selectedDate) {
      alert("Please select a valid date.");
      return;
  }

  filteredData = ufcFighterData.filter(fighter => {
      const dob = new Date(fighter.DOB);
      return dob > new Date(selectedDate);
  });

  populateFighterCards(1);
}

document.getElementById('dob-filter-button').addEventListener('click', filterByDateAfter);

function filterByDateBefore() {
  const selectedDate = document.getElementById('dob-filter-before').value;
  if (!selectedDate) {
      alert("Please select a valid date.");
      return;
  }

  filteredData = ufcFighterData.filter(fighter => {
      const dob = new Date(fighter.DOB);
      return dob < new Date(selectedDate);
  });

  populateFighterCards(1);
}

document.getElementById('dob-filter-before-button').addEventListener('click', filterByDateBefore);

populateFighterCards(1);
