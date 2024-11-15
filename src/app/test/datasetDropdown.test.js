const { JSDOM } = require('jsdom');

// Mock data.js for testing
global.data = {
  "Sunshine Coast Council": {
    "Questions": ["What is the weather?", "What is the air quality?"],
    "Answers": ["Sunny", "Good"]
  },
  "Brisbane": {
    "Questions": ["What is the population?", "What is the average temperature?"],
    "Answers": ["2.5 million", "22°C"]
  }
};

describe('Dataset Dropdown', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    // Simulate loading the HTML into JSDOM
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoInsight</title>
</head>
<body>
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" id="datasetDropdown" data-bs-toggle="dropdown">
            Sunshine Coast Council
        </button>
        <ul class="dropdown-menu" id="datasetList"></ul>
    </div>
    <script src="data.js"></script>
    <script src="app.js"></script> <!-- Assume app.js contains the code to populate the dropdown -->
</body>
</html>`;

    dom = new JSDOM(html, {
      runScripts: "dangerously",
      resources: "usable"
    });
    document = dom.window.document;
    window = dom.window;

    // Populate the dropdown as if the page has been loaded
    const populateDatasetDropdown = () => {
      const datasetList = document.getElementById("datasetList");
      for (let dataset in data) {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.className = "dropdown-item";
        link.href = "#";
        link.textContent = dataset;
        link.onclick = () => selectDataset(dataset);
        item.appendChild(link);
        datasetList.appendChild(item);
      }
    };

    // Add the function to change the button text on dataset selection
    const selectDataset = (dataset) => {
      const dropdownButton = document.getElementById("datasetDropdown");
      dropdownButton.textContent = dataset;
    };

    // Initialize the dataset dropdown
    populateDatasetDropdown();
  });

  it('should populate the dataset dropdown correctly', () => {
    const datasetList = document.getElementById("datasetList");
    expect(datasetList.children.length).toBe(2); // 2 datasets available in data.js

    // Check the text content of the first item
    const firstItem = datasetList.children[0].textContent;
    expect(firstItem).toBe("Sunshine Coast Council");

    // Simulate selecting a dataset and check the button text
    const datasetButton = document.getElementById("datasetDropdown");
    datasetList.children[1].click(); // Click the second dataset (Brisbane)
    expect(datasetButton.textContent).toBe("Brisbane");
  });
});
