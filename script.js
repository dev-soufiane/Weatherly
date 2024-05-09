// Assigning your API key to a constant variable for easy reference.
const ApiKey = "8f85e995f4e2f196c5bd4b1c7efa86b9";

// Assigning the API URL to a constant variable, including parameters for units and city search.
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Selecting the input field for searching.
const SearchCity = document.querySelector(".search input");

// Selecting the button for initiating the search.
const SearchButton = document.querySelector(".search button");

// Selecting the HTML element for displaying the weather icon.
const WeatherIcon = document.querySelector(".weather-icon");

// Defining an asynchronous function to check the weather based on the city input.
async function checkWeather(city) {
  // Making an asynchronous request to the OpenWeatherMap API using fetch.
  const response = await fetch(ApiUrl + city + `&appid=${ApiKey}`);

  // Checking if the response status is 404 (city not found).
  if (response.status == 404) {
    // Displaying an error message if the city is not found.
    document.querySelector(".error").style.display = "block";
    // Hiding the weather information display.
    document.querySelector(".weather").style.display = "none";
  } else {
    // Parsing the JSON response.
    var data = await response.json();

    // Updating HTML elements with weather information.
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

    // Setting the weather icon based on weather conditions.
    if (data.weather[0].main == "Clouds") {
      WeatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      WeatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      WeatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      WeatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      WeatherIcon.src = "images/mist.png";
    }

    // Displaying the weather information.
    document.querySelector(".weather").style.display = "block";
    // Hiding the error message if previously displayed.
    document.querySelector(".error").style.display = "none";
  }
}

// Calling the checkWeather function with "Casablanca" as the default city when the page loads.
document.addEventListener("DOMContentLoaded", () => {
  checkWeather("Casablanca");
});

// Adding an event listener to the search button for initiating the weather check.
SearchButton.addEventListener("click", () => {
  checkWeather(SearchCity.value);
});

