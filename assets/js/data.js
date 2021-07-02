export function getStryktipsData() {
    return fetch("https://stryk.herokuapp.com/stryktipset-sommar-2021")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // return data.number_of_games;
            return data;
        });
}
