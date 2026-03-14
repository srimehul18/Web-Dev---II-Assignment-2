console.log("Script Started")
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityText = document.getElementById("city");
const tempText = document.getElementById("temp");
const conditionText = document.getElementById("condition");
const humidityText = document.getElementById("humidity");
const windText = document.getElementById("wind");
const box = document.querySelector(".weather-box")
const originalWeatherContent = box.innerHTML
console.log("All Elements have been selected");
searchBtn.addEventListener("click", Search);

async function Search() {
    clearError()
    console.log("Search button clicked")
    const city = cityInput.value.trim()
    if (!city) {
        citynotfound()
        return
    }
    const apiKey = "Your_API_KEY_Here"
    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    console.log("Before Fetching the weather data")
    try {
        const res = await fetch(url)
        console.log("After Fetching the weather data")
        if (!res.ok) {
            if (res.status === 404) {
                throw new Error("City not found")
            }
            else if (res.status === 500 || res.status === 429 || res.status === 400) {
                throw new Error("Server error or Too many requests")
            }
            else {
                throw new Error("Network error")
            }
        }
        res.json()
            .then(data => {
                box.innerHTML = originalWeatherContent;

                const cityText = document.getElementById("city");
                const tempText = document.getElementById("temp");
                const conditionText = document.getElementById("condition");
                const humidityText = document.getElementById("humidity");
                const windText = document.getElementById("wind");

                cityText.textContent = data.name;
                tempText.textContent = data.main.temp + " °C";
                conditionText.textContent = data.weather[0].description;
                humidityText.textContent = data.main.humidity + " %";
                windText.textContent = data.wind.speed + " m/s";

                saveCity(city);
                loadhistory();
            })
            .catch(error => {
                console.error("JSON parsing error:", error)
                neterr()
            })
    }
    catch (error) {
        console.error("Fetch error:", error)
        if (error.message === "City not found") {
            citynotfound()
        }
        else if (error.message === "Server error or Too many requests") {
            miscerr()
        }
        else {
            neterr()
        }
    }
}

function citynotfound() {
    clearWeather()
    const cityerr = document.createElement("p")
    cityerr.id = "cityerr"
    cityerr.textContent = "City not found"
    box.innerHTML = `
        <h3>Weather Info</h3>
        <p style="color:red; margin-top:10px;">City not found</p>
    `
}

function neterr() {
    clearWeather()
    const neterr = document.createElement("p")
    neterr.id = "neterr"
    neterr.textContent = "Network Error. Please try again."
    box.innerHTML = `
        <h3>Weather Info</h3>
        <p style="color:red; margin-top:10px;">Network Error. Please try again.</p>
    `
}

function miscerr() {
    clearWeather()
    const miscerr = document.createElement("p")
    miscerr.id = "miscerr"
    miscerr.textContent = "Server Error. Please try again later."
    box.innerHTML = `
        <h3>Weather Info</h3>
        <p style="color:red; margin-top:10px;">Server Error. Please try again later.</p>
    `
}

function clearError() {
    const cityErr = document.getElementById("cityerr")
    const netErr = document.getElementById("neterr")
    const miscErr = document.getElementById("miscerr")
    if (cityErr) { cityErr.remove() }
    if (netErr) { netErr.remove() }
    if (miscErr) { miscErr.remove() }
}

function clearWeather() {
    cityText.textContent = ""
    tempText.textContent = ""
    conditionText.textContent = ""
    humidityText.textContent = ""
    windText.textContent = ""
}

function saveCity(city) {
    const cities = JSON.parse(localStorage.getItem("cities")) || []
    if (!cities.includes(city)) {
        cities.push(city)
    }
    localStorage.setItem("cities", JSON.stringify(cities))
}

function loadhistory() {
    const history = document.getElementById("history")
    history.innerHTML = ""
    const cities = JSON.parse(localStorage.getItem("cities")) || []
    cities.forEach(city => {
        const btn = document.createElement("button")
        btn.textContent = city
        btn.addEventListener("click", () => {
            cityInput.value = city
            Search()
        })
        history.appendChild(btn)
    })
    if (cities.length > 0) {
        const clr = document.createElement("button")
        clr.textContent = "Clear History"
        clr.addEventListener("click", clearhistory)
        history.appendChild(clr)
    }
}

function clearhistory() {
    localStorage.removeItem("cities")
    loadhistory()
}

loadhistory()