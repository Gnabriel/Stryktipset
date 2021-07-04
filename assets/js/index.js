import { getStryktipsData } from "./data.js";

let table;
let tableHead;
let tableBody;

function main() {
    window.removeEventListener("load", main);
    table = document.querySelector("#table");
    // Fix table header and body.
    preprocessTable();
    // Fetch data and add to table.
    fetchStryktipsData();
}

function preprocessTable() {
    // Replaces old table body with table head and creates new table body.
    let tableBodyOld = document.querySelector("#table tbody");
    tableHead = document.createElement("thead");
    let tableHeadContent = document.querySelector("#table tr");
    tableBody = document.createElement("tbody");
    // Unwrap table body (tbody element).
    tableBodyOld.replaceWith(...tableBodyOld.childNodes);
    // Add a table header (thead element) as parent to the table head.
    table.replaceChild(tableHead, tableHeadContent);
    tableHead.appendChild(tableHeadContent);
    // Add a new table body.
    table.appendChild(tableBody);
}

async function fetchStryktipsData() {
    // Fetch Stryktips-data from Stryktips API.
    getStryktipsData().then((stryktipsData) => {
        populateTable(stryktipsData);
    });
}

function populateTable(games) {
    // Loops over each game and adds a row to the table.
    games.forEach((game) => {
        addTableRow(
            game.gameNumber,
            game.opponents.one.name,
            game.opponents.one.homepage,
            game.opponents.two.name,
            game.opponents.two.homepage,
            game.gameInfo.outcome
        );
    });
}

function addTableRow(
    rowNum,
    teamOne,
    teamOneWebsite,
    teamTwo,
    teamTwoWebsite,
    gameResult
) {
    // Adds a row with game information to the table.
    let gameRow = document.createElement("tr");
    // Create and add info column.
    let infoColumn = document.createElement("td");
    infoColumn.innerText = rowNum;
    gameRow.appendChild(infoColumn);
    // Create and add team column.
    let teamColumn = document.createElement("td");
    teamColumn.innerHTML = `<a href="${teamOneWebsite}">${teamOne}</a> - <a href="${teamTwoWebsite}">${teamTwo}</a>`;
    gameRow.appendChild(teamColumn);
    // Create and add result columns.
    let resultColumns = createResultColumns(gameResult);
    gameRow.appendChild(resultColumns[0]);
    gameRow.appendChild(resultColumns[1]);
    gameRow.appendChild(resultColumns[2]);
    // Add the game row to the table.
    tableBody.appendChild(gameRow);
}

function createResultColumns(gameResult) {
    // Creates 1, X, 2 columns and add a checkmark at game result.
    let columnOne = document.createElement("td");
    let columnX = document.createElement("td");
    let columnTwo = document.createElement("td");
    let checkmark = createCheckmark();
    if (gameResult == "1") {
        columnOne.appendChild(checkmark);
    } else if (gameResult == "X") {
        columnX.appendChild(checkmark);
    } else {
        columnTwo.appendChild(checkmark);
    }
    return [columnOne, columnX, columnTwo];
}

function createCheckmark() {
    // Creates a checkmark element.
    let checkmark = document.createElement("span");
    checkmark.className = "checkmark";
    // Create and append stem.
    let stem = document.createElement("div");
    stem.className = "stem";
    checkmark.appendChild(stem);
    // Create and append kick.
    let kick = document.createElement("kick");
    kick.className = "kick";
    checkmark.appendChild(kick);
    return checkmark;
}

// Run main when website has loaded.
window.addEventListener("load", main);
