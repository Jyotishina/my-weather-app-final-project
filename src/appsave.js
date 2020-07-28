// FUNCTION SEARCH CITY --- WHAT WITH START POSITION (GEO ?)
function searchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-search-city");
  let showSearchCity = document.querySelector("#current-location");
  showSearchCity.innerHTML = `${inputCity.value}`;
  let apiKey = "5105e9ba47cefb06b8ba8c75ae83f74e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperatureSearch);
}

function showTemperatureSearch(response) {
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
}

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
  }
  navigator.geolocation.getCurrentPosition(showGeolocation);
}
let buttonShowCity = document.querySelector("#button-show-city");
buttonShowCity.addEventListener("click", showCity);

let showSearchCity = document.querySelector("#current-location");
showSearchCity.innerHTML = `${inputCity.value}`;

// DATE AND TIME - SECTION WEATHER TODAY
function formatDateStart(dateToday) {
  let date = dateToday.getDate();
  let year = dateToday.getFullYear();
  let days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  let day = days[dateToday.getDay()];
  let month = dateToday.getMonth() + 1;
  if (month.toString().length == 1) month = "0" + month;

  return `${day}, ${date}/${month}/${year}`;
}

function formatTimeStart(timeToday) {
  let hours = timeToday.getHours();
  let minutes = timeToday.getMinutes();
  if (hours.toString().length == 1) hours = "0" + hours;
  if (minutes.toString().length == 1) minutes = "0" + minutes;

  return `${hours}:${minutes}`;
}

let today = new Date();
let dateToday = document.querySelector("#current-date");
dateToday.innerHTML = formatDateStart(today);
let timeToday = document.querySelector("#current-time");
timeToday.innerHTML = formatTimeStart(today);

function showForecastSearch(response) {
  console.log(response);
  let tempMin = Math.round(response.data.daily[1].temp.min);
  let oneTempMin = document.querySelector("#temp-min-one");
  oneTempMin.innerHTML = `${tempMin}°`;
  let tempMax = Math.round(response.data.daily[1].temp.max);
  let oneTempMax = document.querySelector("#temp-max-one");
  oneTempMax.innerHTML = `${tempMax}°`;
  let precipitation = Math.round(response.data.daily[1].humidity);
  let currentPrecipitation = document.querySelector("#precipitation-one");
  currentPrecipitation.innerHTML = `${precipitation}%`;
  let dayElement = document.querySelector("#date-next-one");
  dayElement.innerHTML = formatDaySearch(response.data.daily[1].dt * 1000);
}

<div class="d-flex flex-column">
  <div class="card" id="card-next-two">
    <div class="card-body" id="card-body-next-two">
      <div class="card-row" id="date-next-two">
        Day +1
      </div>
      <div class="card-row" id="emoji-next-two">
        <i class="fas fa-sun"></i>
      </div>
      <div class="card-row">
        <i class="fas fa-long-arrow-alt-down"></i> 10°
      </div>
      <div class="card-row">
        <i class="fas fa-long-arrow-alt-up"></i> 25°
      </div>
      <div class="card-row">
        <i class="fas fa-tint"></i> 10%
      </div>
    </div>
  </div>
</div>;
