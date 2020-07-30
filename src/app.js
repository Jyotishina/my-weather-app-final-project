// CELCIUS VS FAHRENHEIT TEMP-CURRENT (WERKT NIET REST TO BE DONE, HOW ??)
function convertFahrToCels() {
  buttonTempFahr.removeEventListener("click", convertFahrToCels);
  buttonTempCels.addEventListener("click", convertCelsToFahr);
  let tempToday = document.querySelector(".temp");
  let tempCels = tempToday.innerText;
  if (tempToday !== undefined) {
    tempToday.innerHTML = parseInt(Math.round(tempCels * 1.8 + 32), 0);
    buttonTempFahr.style.color = "rgb(255, 192, 203)";
    buttonTempFahr.style.background = "rgb(130, 63, 146, 0.6)";
    buttonTempCels.style.color = "rgb(130, 63, 146, 0.6)";
    buttonTempCels.style.background = "rgb(130, 63, 146, 0)";
  }
}

function convertCelsToFahr() {
  buttonTempCels.removeEventListener("click", convertCelsToFahr);
  buttonTempFahr.addEventListener("click", convertFahrToCels);
  let tempToday = document.querySelector(".temp");
  let tempFahr = tempToday.innerText;
  if (tempToday !== undefined) {
    tempToday.innerHTML = parseInt(Math.round((tempFahr - 32) / 1.8), 0);
    buttonTempCels.style.color = "rgb(255, 192, 203)";
    buttonTempCels.style.background = "rgb(130, 63, 146, 0.6)";
    buttonTempFahr.style.color = "rgb(130, 63, 146, 0.6)";
    buttonTempFahr.style.background = "rgb(130, 63, 146, 0)";
  }
}
let buttonTempFahr = document.querySelector(
  "#button-temperature-today-fahrenheit"
);
buttonTempFahr.addEventListener("click", convertFahrToCels);

let buttonTempCels = document.querySelector(
  "#button-temperature-today-celcius"
);
buttonTempCels.removeEventListener("click", convertCelsToFahr);
buttonTempCels.style.color = "rgb(255, 192, 203)";
buttonTempCels.style.background = "rgb(130, 63, 146, 0.6)";

// FUNCTION SEARCH CITY
function formatDateSearch(timestamp) {
  let dateTodaySearch = new Date(timestamp);
  let date = dateTodaySearch.getDate();
  let year = dateTodaySearch.getFullYear();
  let days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
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

function search(city) {
  let apiKey = "5105e9ba47cefb06b8ba8c75ae83f74e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperatureSearch);
}

function searchCity(event) {
  event.preventDefault();
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
                  <img src="http://openweathermap.org/img/wn/${
                    forecast.weather[0].icon
                  }@2x.png" /> 
                </div>
                <div class="card-row">
                  <i class="fas fa-long-arrow-alt-down"></i> ${Math.round(
                    forecast.temp.min
                  )}°
                </div>
                <div class="card-row">
                  <i class="fas fa-long-arrow-alt-up"></i> ${Math.round(
                    forecast.temp.max
                  )}°
                </div>
                <div class="card-row">
                  <i class="fas fa-tint"></i> ${Math.round(forecast.humidity)}°
                </div>
              </div>
            </div>
          </div>`;
    }
  }
}
search("Brussels");
let buttonSearchCity = document.querySelector("#search-form");
buttonSearchCity.addEventListener("submit", searchCity);

// FUNCTION CURRENT LOCATION
function showCity(event) {
  function showGeolocation(position) {
    console.log(position.coords.latitude);
    let lat = position.coords.latitude;
    console.log(position.coords.longitude);
    let lon = position.coords.longitude;
    let apiKey = "5105e9ba47cefb06b8ba8c75ae83f74e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(showTemperatureGeo);
  }

  function showTemperatureGeo(response) {
    console.log(response);
    let city = response.data.name;
    let showSearchCity = document.querySelector("#current-location");
    showSearchCity.innerHTML = `${city}`;
    let temp = Math.round(response.data.main.temp);
    let currentTemp = document.querySelector("#temp-current");
    currentTemp.innerHTML = `${temp}°`;
    let tempMin = Math.round(response.data.main.temp_min);
    let currentTempMin = document.querySelector("#temp-current-min");
    currentTempMin.innerHTML = `${tempMin}°`;
    let tempMax = Math.round(response.data.main.temp_max);
    let currentTempMax = document.querySelector("#temp-current-max");
    currentTempMax.innerHTML = `${tempMax}°`;
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
    let dateElement = document.querySelector("#current-date");
    dateElement.innerHTML = formatDateSearch(response.data.dt * 1000);
    let timeElement = document.querySelector("#current-time");
    timeElement.innerHTML = formatTimeSearch(response.data.dt * 1000);

    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    let apiKey = "5105e9ba47cefb06b8ba8c75ae83f74e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&exclude=hourly,minutely`;
    axios.get(`${apiUrl}`).then(showForecastGeo);

    function showForecastGeo(response) {
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
                    <img src="http://openweathermap.org/img/wn/${
                      forecast.weather[0].icon
                    }@2x.png" /> 
                  </div>
                  <div class="card-row">
                    <i class="fas fa-long-arrow-alt-down"></i> ${Math.round(
                      forecast.temp.min
                    )}°
                  </div>
                  <div class="card-row">
                    <i class="fas fa-long-arrow-alt-up"></i> ${Math.round(
                      forecast.temp.max
                    )}°
                  </div>
                  <div class="card-row">
                    <i class="fas fa-tint"></i> ${Math.round(
                      forecast.humidity
                    )}°
                  </div>
                </div>
              </div>
            </div>`;
      }
    }
  }
  navigator.geolocation.getCurrentPosition(showGeolocation);
}

let buttonShowCity = document.querySelector("#button-show-city");
buttonShowCity.addEventListener("click", showCity);
