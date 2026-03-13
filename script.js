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
    console.log("Search button clicked")
    const city = cityInput.value
    console.log("City variable:", city);
    console.log("Searching weather for City: " + city)
    console.log("Before Fetching the weather data")
    const apiKey = "Your_API_Key_Here"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;  
    try{
    const res = await fetch(url)
    console.log("After Fetching the weather data")
    const data = await res.json()
    cityText.textContent = data.name
    tempText.textContent = data.main.temp + "°C"
    conditionText.textContent = data.weather[0].description
    humidityText.textContent = data.main.humidity + "%"
    windText.textContent = data.wind.speed + " m/s"
    console.log("Weather data received:", data)}
    catch(error){
        console.error("Error fetching weather data:", error)
    }
}



