export function getStryktipsData() {
    return fetch("https://stryk.herokuapp.com/stryktipset-sommar-2021")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Extract relevant data.
            return data.matches;
        });
}
