
let nextIcon = document.querySelectorAll(".forecast-icon .nextIcon");
let nextDegree = document.querySelectorAll(".nextDegree span");
let nextDegree2 = document.querySelectorAll(".nextDegree2 span");
let nextCustom = document.querySelectorAll(".custom");
let nextDay = document.querySelectorAll(".forecast-header .day");
let search = document.getElementById("search");

let allData = {};
async function getWeather(cityName){
    let data = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=f1bbf9d26e014b68869173840241101&q=${cityName}&days=3`);
    let res = await data.json();
    return res;
}


function displayCurrentWeather(data){
    let today = new Date();
    document.querySelector(".forecast-header .todayDay").innerHTML = today.toLocaleDateString("en-us" , {weekday:"long"});
    document.querySelector(".forecast-header .date .month").innerHTML = today.toLocaleDateString("en-us" , {month:"long"});
    document.querySelector(".forecast-header .date .number").innerHTML = today.getDate();
    document.getElementById("locationWeather").innerHTML = data.location.name;
    document.querySelector(".degree .num span").innerHTML = data.current.temp_c;
    document.querySelector(".forecast-icon .iconWeather").setAttribute("src" , `https:${data.current.condition.icon}`);
    document.querySelector(".forecast-icon .parWeather").innerHTML = data.current.condition.text;
}

function displayNextWeather(data){
let forecast = data.forecast.forecastday;

for (let i = 0; i < 2; i++) {
    let nextDate = new Date(forecast[i+1].date);
    nextDay[i].innerHTML = nextDate.toLocaleDateString("en-us" , {weekday:"long"}) 
    nextDegree[i].innerHTML = forecast[i+1].day.maxtemp_c;
    nextDegree2[i].innerHTML = forecast[i+1].day.mintemp_c;
    nextCustom[i].innerHTML = forecast[i+1].day.condition.text;
    nextIcon[i].setAttribute("src" , `https:${forecast[i+1].day.condition.icon}`);
}
}

async function startAppWeather (city="london"){
    let getWeatherData = await getWeather(city);
    if(!getWeatherData.error){
        displayCurrentWeather(getWeatherData);
        displayNextWeather(getWeatherData);
    }
}

startAppWeather()

search.addEventListener( "input" , function(){
    startAppWeather (search.value);
})