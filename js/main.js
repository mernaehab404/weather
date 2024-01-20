//search
let searchInput = document.getElementById("search-input");
let date = new Date();

// TODAY
let todayName = document.getElementById("today-name");
let todayNumber = document.getElementById("today-number");
let todayMonth = document.getElementById("today-month");
let todayLocation = document.getElementById("today-location");
let todayTemp = document.getElementById("today-temp");
let todayImg = document.getElementById("today-img");
let todayText = document.getElementById("today-text");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("wind-direction");

//tomorrow, after tomorrw
let tomorrowName = document.getElementsByClassName("tomorrow-name");
let nextMaxTemp = document.getElementsByClassName("next-max-temp");
let nextMinTemp = document.getElementsByClassName("next-min-temp");
let tomorrowImg = document.getElementsByClassName("tomorrow-img");
let tomorrowText = document.getElementsByClassName("tomorrow-text");

async function getWeatherData(city) {
  let weather = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=548cf7e950c74e7b96d31723241901&q=${city}&days=3`
  );
  let weatherApi = await weather.json();
  return weatherApi;
}

// display today
function todayData(data) {
  let todayDate = new Date();

  todayName.innerHTML = todayDate.toLocaleDateString("en-US", { weekday: "long",});
  todayNumber.innerHTML= todayDate.getDate()
  todayMonth.innerHTML = todayDate.toLocaleDateString("en-US", { month: "long",});

  todayLocation.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c;
  todayImg.setAttribute("src", "https://" + data.current.condition.icon);
  todayText.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_kph + "Km/h";
  windDirection.innerHTML = data.current.wind_dir;
}
//display next
function nextDayData(data) {
  let forecastData = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    // Check if nextMaxTemp[i] is defined
    if (nextMaxTemp[i] && nextMinTemp[i] && tomorrowImg[i] && tomorrowText[i]&&tomorrowName[i]) {
      // console.log("Setting innerHTML for element:", nextMaxTemp[i]);
      nextMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
      nextMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c;
      tomorrowImg[i].setAttribute(
        "src",
        "https://" + forecastData[i + 1].day.condition.icon
      );
      tomorrowText[i].innerHTML = forecastData[i + 1].day.condition.text;
      let nextDate= new Date(forecastData[i+1].date)
      tomorrowName[i].innerHTML =nextDate.toLocaleDateString("en-US",{weekday:"long"})
    
      }

  }
}

async function Allfunctions(cityName="cairo") {
  try {
    let data = await getWeatherData(cityName);
    todayData(data);
    nextDayData(data);
  } catch (error) {
    // console.error("Error fetching weather data:", error);
  }
}
Allfunctions();
searchInput.addEventListener("input",function(){
    Allfunctions(searchInput.value)
})