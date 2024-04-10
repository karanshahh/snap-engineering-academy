// Function to fetch CSV data from a URL
const fetchCSV = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const csvData = await response.text();
    return csvData;
  } catch (error) {
    console.error('Error fetching CSV data:', error);
    return null;
  }
};

// Function to parse CSV data and convert it into a JavaScript array
const parseCSV = (csv) => {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const fighter = {};
    const values = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      fighter[headers[j]] = values[j];
    }

    data.push(fighter);
  }

  return data;
};

// Function to display the parsed data (for testing purposes)
const displayData = (data) => {
  console.log(data); // You can replace this with your own logic to use the data
  showFighters(data); // Call showFighters with the parsed data
};

// Function to display fighters from the parsed data
function showFighters(data) {
  const fighterContainer = document.getElementById("fighter-container");
  fighterContainer.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const fighter = data[i];
    const fighterCard = createFighterCard(fighter);
    fighterContainer.appendChild(fighterCard);
  }
}

function createFighterCard(fighter) {
  const card = document.createElement("div");
  card.classList.add("fighter-card");

  const fighterName = document.createElement("h2");
  fighterName.textContent = fighter.FIGHTER;

  const fighterDetails = document.createElement("div");
  fighterDetails.classList.add("fighter-details");
  fighterDetails.innerHTML = `
    <p>Height: ${fighter.HEIGHT}</p>
    <p>Weight: ${fighter.WEIGHT}</p>
    <p>Reach: ${fighter.REACH}</p>
    <p>Stance: ${fighter.STANCE}</p>
    <p>DOB: ${fighter.DOB}</p>
    <p>URL: <a href="${fighter.URL}" target="_blank">${fighter.URL}</a></p>
  `;

  card.appendChild(fighterName);
  card.appendChild(fighterDetails);

  return card;
}

// Fetch the CSV data and process it
const processCSV = async (csvUrl) => {
  const csvData = await fetchCSV(csvUrl);
  if (csvData) {
    const parsedData = parseCSV(csvData);
    displayData(parsedData);
  } else {
    console.error('Failed to fetch CSV data');
  }
};

// Replace 'path/to/your/csv/file.csv' with the actual URL of your CSV file
const csvUrl = './ufc_fighter_tott.csv';
processCSV(csvUrl);
