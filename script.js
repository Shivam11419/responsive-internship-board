const internshipList = document.getElementById("internshipList");
const searchInput = document.getElementById("searchInput");
const domainFilter = document.getElementById("domainFilter");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const errorState = document.getElementById("errorState");

let internships = [];

// Load internship data from JSON file
async function loadInternships() {
    try {
        const response = await fetch("internship-record-sample.json");

        if (!response.ok) {
            throw new Error("Could not load internship data");
        }

        const data = await response.json();

        internships = data.internships;

        displayInternships(internships);

    } catch (error) {
        console.error(error);
        errorState.hidden = false;
        resultCount.textContent = "Unable to load data";
    }
}

// Display internship cards
function displayInternships(list) {

    internshipList.innerHTML = "";

    resultCount.textContent =
        `${list.length} internship${list.length !== 1 ? "s" : ""} found`;

    if (list.length === 0) {
        emptyState.hidden = false;
        return;
    }

    emptyState.hidden = true;

    list.forEach(function (internship) {

        const card = document.createElement("article");

        card.className = "internship-card";
        card.tabIndex = 0;

        card.innerHTML = `
            <h3>${internship.title}</h3>

            <p>
                <strong>Domain:</strong>
                ${internship.domain}
            </p>

            <p>
                <strong>Mode:</strong>
                ${internship.mode}
            </p>

            <p>
                <strong>Location:</strong>
                ${internship.location}
            </p>

            <p>
                <strong>Openings:</strong>
                ${internship.openings}
            </p>

            <div>
                ${internship.skills.map(
                    skill => `<span class="badge">${skill}</span>`
                ).join("")}
            </div>
        `;

        internshipList.appendChild(card);
    });
}

// Search and domain filtering
function filterInternships() {

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedDomain = domainFilter.value;

    const filtered = internships.filter(function (internship) {

        const searchableText = `
            ${internship.title}
            ${internship.domain}
            ${internship.location}
            ${internship.skills.join(" ")}
        `.toLowerCase();

        const matchesSearch =
            searchableText.includes(searchText);

        const matchesDomain =
            selectedDomain === "all" ||
            internship.domain === selectedDomain;

        return matchesSearch && matchesDomain;
    });

    displayInternships(filtered);
}

// Events
searchInput.addEventListener("input", filterInternships);

domainFilter.addEventListener("change", filterInternships);

// Start application
loadInternships();