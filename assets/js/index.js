import { getStryktipsData } from "./data.js";
// const dataRetreiver = require('./data.js');

async function apa() {
    getStryktipsData().then(function (stryktipsData) {
        console.dir(stryktipsData);
    });
}

apa();
