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

// DAYS OF THE WEEK - SECTION WEATHER NEXT (WERKT NIET!!)
let next = new Date();
let daysNext = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

let todayPlusOne = document.querySelector("#date-next-one");
todayPlusOne.innerHTML = daysNext[next.getDay() + 1];
let todayPlusTwo = document.querySelector("#date-next-two");
todayPlusTwo.innerHTML = daysNext[next.getDay() + 2];
let todayPlusThree = document.querySelector("#date-next-three");
todayPlusThree.innerHTML = daysNext[next.getDay() + 3];
let todayPlusFour = document.querySelector("#date-next-four");
todayPlusFour.innerHTML = daysNext[next.getDay() + 4];
let todayPlusFive = document.querySelector("#date-next-five");
todayPlusFive.innerHTML = daysNext[next.getDay() + 5];

// CELCIUS VS FAHRENHEIT TEMP-CURRENT (REST TO BE DONE, HOW ??)
function convertFahrToCels() {
  buttonTempFahr.removeEventListener("click", convertFahrToCels);
  buttonTempCels.addEventListener("click", convertCelsToFahr);
  let tempToday = document.querySelector("#temp-current");
  let tempCels = tempToday.innerText;
  if (tempToday !== undefined) {
    tempToday.innerHTML = parseInt(Math.round(tempCels * 1.8 + 32), 0);
    buttonTempFahr.style.color = "rgb(255, 255, 255)";
    buttonTempFahr.style.background = "rgb(0, 128, 0)";
    buttonTempCels.style.color = "rgb(0, 128, 0)";
    buttonTempCels.style.background = "rgb(255, 255, 255)";
  }
}

function convertCelsToFahr() {
  buttonTempCels.removeEventListener("click", convertCelsToFahr);
  buttonTempFahr.addEventListener("click", convertFahrToCels);
  let tempToday = document.querySelector("#temp-current");
  let tempFahr = tempToday.innerText;
  if (tempToday !== undefined) {
    tempToday.innerHTML = parseInt(Math.round((tempFahr - 32) / 1.8), 0);
    buttonTempCels.style.color = "rgb(255, 255, 255)";
    buttonTempCels.style.background = "rgb(0, 128, 0)";
    buttonTempFahr.style.color = "rgb(0, 128, 0)";
    buttonTempFahr.style.background = "rgb(255, 255, 255)";
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
buttonTempCels.style.color = "rgb(69, 147, 173)";

// FUNCTION SEARCH CITY --- WHAT WITH START POSITION (GEO ?)

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
}

let buttonSearchCity = document.querySelector("#search-form");
buttonSearchCity.addEventListener("submit", searchCity);

// FUNCTION CURRENT LOCATION (to be updated : forecast!)
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

// FUNCTION 5-DAY FORECAST
