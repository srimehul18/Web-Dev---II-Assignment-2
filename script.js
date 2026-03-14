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
const consoleLog = document.getElementById("console-log")

async function Search() {
    clearError()
    consoleLog.innerHTML = ""
    console.log("Search button clicked")
    consoleLog.innerHTML += "<p>Search button clicked</p>"
    const city = cityInput.value.trim()
    if (!city) {
        citynotfound()
        return
    }
    const apiKey = "Your API Key here"
    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    console.log("Before Fetching the weather data")
    consoleLog.innerHTML += "<p>Before Fetching the weather data</p>"
    try {
        consoleLog.innerHTML += "<p>Fetching weather data...(microtask)</p>"
        const res = await fetch(url)
        console.log("After Fetching the weather data")
        consoleLog.innerHTML += "<p>After Fetching the weather data</p>"
        if (!res.ok) {
            if (res.status === 404) {
                consoleLog.innerHTML += "<p>Error! City not found</p>"
                throw new Error("City not found")              
            }

            else if (res.status === 500 || res.status === 429 || res.status === 400) {
                consoleLog.innerHTML += "<p>Error! Server error or too many requests</p>"
                throw new Error("Server error or Too many requests")
            }
            else {
                consoleLog.innerHTML += "<p>Error! Network error</p>"
                throw new Error("Network error")
            }
        }
        res.json()
            .then(data => {
                box.innerHTML = originalWeatherContent;
                consoleLog.innerHTML += "<p>Parsing JSON data</p>"

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
                consoleLog.innerHTML += "<p>Data upload completed</p>"

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