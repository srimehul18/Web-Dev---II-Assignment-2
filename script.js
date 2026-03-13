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
    clearError()
    console.log("Search button clicked")
    const city = cityInput.value.trim()
    console.log("City variable:", city)
    const apiKey = "Your_API_Key_here"
    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log("Before Fetching the weather data")
    fetch(url)
    .then(res => {
        if(!res.ok){
            throw new Error("City not found")
        }
        return res.json()
    })
    .then(data => {
        console.log("Weather data received:", data)
        cityText.textContent = data.name
        tempText.textContent = data.main.temp + " °C"
        conditionText.textContent = data.weather[0].description
        humidityText.textContent = data.main.humidity + " %"
        windText.textContent = data.wind.speed + " m/s"
    })
    .catch(error => {
        console.error(error)
        citynotfound()
    })
}

function citynotfound() {
    const cityerr = document.createElement("p")
    cityerr.id = "cityerr"
    cityerr.textContent = "City not found. Please try again."
    cityerr.style.color = "red"
    document.body.appendChild(cityerr)
}

function clearError() {
    const oldError = document.getElementById("cityerr")
    if (oldError) {
        oldError.remove()
    }
}
