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
async function Search() {
    clearError()
    console.log("Search button clicked")
    const city = cityInput.value.trim()
    if (!city) {
        citynotfound()
        return
    }
    const apiKey = "Your_API_Key_Here"
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
            console.log("Weather data received:", data)
            cityText.textContent = data.name
            tempText.textContent = data.main.temp + " °C"
            conditionText.textContent = data.weather[0].description
            humidityText.textContent = data.main.humidity + " %"
            windText.textContent = data.wind.speed + " m/s"
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
    const cityerr = document.createElement("p")
    cityerr.id = "cityerr"
    cityerr.textContent = "City not found. Please try again."
    cityerr.style.color = "red"
    document.body.appendChild(cityerr)
}

function neterr() {
    const neterr = document.createElement("p")
    neterr.id = "neterr"
    neterr.textContent = "Network Error. Please try again."
    neterr.style.color = "red"
    document.body.appendChild(neterr)
}

function miscerr() {
    const miscerr = document.createElement("p")
    miscerr.id = "miscerr"
    miscerr.textContent = "Server Error. Please try again later."
    miscerr.style.color = "red"
    document.body.appendChild(miscerr)
}

function clearError() {
    const cityErr = document.getElementById("cityerr")
    const netErr = document.getElementById("neterr")
    const miscErr = document.getElementById("miscerr")
    if (cityErr) {
        cityErr.remove()
    }
    else if (netErr) {
        netErr.remove()
    }
    else if (miscErr){
        miscErr.remove()
    }
}