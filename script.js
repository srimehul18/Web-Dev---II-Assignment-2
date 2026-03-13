console.log("Script Started")
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityText = document.getElementById("city");
const tempText = document.getElementById("temp");
const conditionText = document.getElementById("condition");
const humidityText = document.getElementById("humidity");
const windText = document.getElementById("wind");
console.log("All Elements have been selected");

searchBtn.addEventListener("click", Search);

function Search() {
    console.log("Search button clicked")
    const city = cityInput.value
    console.log("Searching weather for City: " + city)
}