// FORMAT DATE AND TIME FUNCTIONS
function formatDateSearch(timestamp) {
  let dateTodaySearch = new Date(timestamp);
  let date = dateTodaySearch.getDate();
  if (date.toString().length == 1) date = "0" + date;
  let year = dateTodaySearch.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dateTodaySearch.getDay()];
  let month = dateTodaySearch.getMonth() + 1;
  if (month.toString().length == 1) month = "0" + month;
  return `${day}, ${date}/${month}/${year}`;
}

function formatTimeSearch(timestamp) {
  let timeTodaySearch = new Date(timestamp);
  let hours = timeTodaySearch.getHours();
  let minutes = timeTodaySearch.getMinutes();
  if (hours.toString().length == 1) hours = "0" + hours;
  if (minutes.toString().length == 1) minutes = "0" + minutes;
  return `Last updated at ${hours}:${minutes}`;
}

function formatDaySearch(timestamp) {
  let dayTodaySearch = new Date(timestamp);
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let day = days[dayTodaySearch.getDay()];
  return `${day}`;
}

// FUNCTION SEARCH LOCATION
function search(city) {
  let apiKey = "5105e9ba47cefb06b8ba8c75ae83f74e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperatureSearch, function (error) {
    alert(
      `Little error.
        1. Did you fill in a city?
        2. Is the city spelled correctly?
        Still not working ?
        3. Try going to https://www.google.com/search?q=weather+${city}`
    );
  });
}

function searchCity(event) {
  event.preventDefault();
  buttonTempCels.removeEventListener("click", convertCelsToFahr);
  buttonTempFahr.addEventListener("click", convertFahrToCels);
  buttonTempCels.style.color = "rgb(255, 192, 203)";
  buttonTempCels.style.background = "rgb(130, 63, 146, 0.4)";
  buttonTempFahr.style.color = "rgb(128 128 128)";
  buttonTempFahr.style.background = "rgb(130, 63, 146, 0)";
  let inputCity = document.querySelector("#input-search-city");
  search(inputCity.value);
}

function showTemperatureSearch(response) {
  console.log(response);
  let city = response.data.name;
  let showSearchCity = document.querySelector("#current-location");
  showSearchCity.innerHTML = `${city}`;
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temp-current");
  currentTemp.innerHTML = `${temp}`;
  let tempFeel = Math.round(response.data.main.feels_like);
  let currentTempFeel = document.querySelector("#temp-current-feel");
  currentTempFeel.innerHTML = `${tempFeel}`;
  let tempMin = Math.round(response.data.main.temp_min);
  let currentTempMin = document.querySelector("#temp-current-min");
  currentTempMin.innerHTML = `${tempMin}`;
  let tempMax = Math.round(response.data.main.temp_max);
  let currentTempMax = document.querySelector("#temp-current-max");
  currentTempMax.innerHTML = `${tempMax}`;
  let description = response.data.weather[0].description;
  let currentDescriptionGeo = document.querySelector("#description-current");
  currentDescriptionGeo.innerHTML = `${description}`;
  let precipitation = Math.round(response.data.main.humidity);
  let currentPrecipitation = document.querySelector("#precipitation-current");
  currentPrecipitation.innerHTML = `${precipitation}%`;
  let windspeed = Math.round(response.data.wind.speed);
  let currentWindSpeed = document.querySelector("#windspeed-current");
  currentWindSpeed.innerHTML = `${windspeed}KM/H`;
  let cloudiness = Math.round(response.data.clouds.all);
  let currentCloudiness = document.querySelector("#cloudiness-current");
  currentCloudiness.innerHTML = `${cloudiness}%`;
  let emoji = response.data.weather[0].icon;
  let currentEmoji = document.querySelector("#emoji-current");
  currentEmoji.innerHTML = `
    <img
      src="http://openweathermap.org/img/wn/${emoji}@2x.png"
    id="icon"/>
  `;
  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML = formatDateSearch(response.data.dt * 1000);
  let timeElement = document.querySelector("#current-time");
  timeElement.innerHTML = formatTimeSearch(response.data.dt * 1000);

  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let apiKey = "5105e9ba47cefb06b8ba8c75ae83f74e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&exclude=hourly,minutely`;
  axios.get(`${apiUrl}`).then(showForecastSearch);

  function showForecastSearch(response) {
    console.log(response);
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 1; index < 6; index++) {
      forecast = response.data.daily[index];
      forecastElement.innerHTML += `
        <div class="d-flex flex-column">
          <div class="card>  
            <div class="card-body" id="card-next">
                <div class="card-row">
                  ${formatDaySearch(forecast.dt * 1000)}
                </div>
                <div class="card-row">
                  <img id="icon-next" src="http://openweathermap.org/img/wn/${
                    forecast.weather[0].icon
                  }@2x.png" /> 
                </div>
                <div class="card-row">
                  <i class="fas fa-long-arrow-alt-down"></i> <span class="temp">${Math.round(
                    forecast.temp.min
                  )}</span>°
                </div>
                <div class="card-row">
                  <i class="fas fa-long-arrow-alt-up"></i> <span class="temp">${Math.round(
                    forecast.temp.max
                  )}</span>°
                </div>
                <div class="card-row">
                  <i class="fas fa-tint"></i> ${Math.round(forecast.humidity)}%
                </div>
              </div>
            </div>
          </div>`;
    }
  }
}

// FUNCTION CURRENT LOCATION
function showCity() {
  buttonTempCels.removeEventListener("click", convertCelsToFahr);
  buttonTempFahr.addEventListener("click", convertFahrToCels);
  buttonTempCels.style.color = "rgb(255, 192, 203)";
  buttonTempCels.style.background = "rgb(130, 63, 146, 0.4)";
  buttonTempFahr.style.color = "rgb(128 128 128)";
  buttonTempFahr.style.background = "rgb(130, 63, 146, 0)";
  function showGeolocation(position) {
    console.log(position.coords.latitude);
    let lat = position.coords.latitude;
    console.log(position.coords.longitude);
    let lon = position.coords.longitude;
    let apiKey = "5105e9ba47cefb06b8ba8c75ae83f74e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(showTemperatureSearch);
  }

  navigator.geolocation.getCurrentPosition(showGeolocation);
}

// CONVERT TEMPERATURE FUNCTIONS
function convertFahrToCels() {
  let tempToday = document.querySelectorAll(".temp");
  tempToday.forEach(function (item) {
    buttonTempFahr.removeEventListener("click", convertFahrToCels);
    buttonTempCels.addEventListener("click", convertCelsToFahr);
    let tempCels = item.innerHTML;
    item.innerHTML = parseInt(Math.round(tempCels * 1.8 + 32), 0);
    buttonTempFahr.style.color = "rgb(255, 192, 203)";
    buttonTempFahr.style.background = "rgb(130, 63, 146, 0.4)";
    buttonTempCels.style.color = "rgb(128 128 128)";
    buttonTempCels.style.background = "rgb(130, 63, 146, 0)";
    buttonTempFahr.style.cursor = "text";
    buttonTempCels.style.cursor = "pointer";
  });
}

function convertCelsToFahr() {
  let tempToday = document.querySelectorAll(".temp");
  tempToday.forEach(function (item) {
    buttonTempCels.removeEventListener("click", convertCelsToFahr);
    buttonTempFahr.addEventListener("click", convertFahrToCels);
    let tempFahr = item.innerText;
    item.innerHTML = parseInt(Math.round((tempFahr - 32) / 1.8), 0);
    buttonTempCels.style.color = "rgb(255, 192, 203)";
    buttonTempCels.style.background = "rgb(130, 63, 146, 0.4)";
    buttonTempFahr.style.color = "rgb(128 128 128)";
    buttonTempFahr.style.background = "rgb(130, 63, 146, 0)";
    buttonTempCels.style.cursor = "text";
    buttonTempFahr.style.cursor = "pointer";
  });
}

// STARTPOSITION WEATHER APP
search("Brussels");
let buttonSearchCity = document.querySelector("#search-form");
buttonSearchCity.addEventListener("submit", searchCity);

let buttonShowCity = document.querySelector("#button-show-city");
buttonShowCity.addEventListener("click", showCity);

let buttonTempFahr = document.querySelector(
  "#button-temperature-today-fahrenheit"
);
buttonTempFahr.addEventListener("click", convertFahrToCels);

let buttonTempCels = document.querySelector(
  "#button-temperature-today-celcius"
);
buttonTempCels.removeEventListener("click", convertCelsToFahr);
buttonTempCels.style.color = "rgb(255, 192, 203)";
buttonTempCels.style.background = "rgb(130, 63, 146, 0.4)";
buttonTempFahr.style.color = "rgb(128 128 128)";
buttonTempFahr.style.background = "rgb(130, 63, 146, 0)";
buttonTempCels.style.cursor = "text";
buttonTempFahr.style.cursor = "pointer";
