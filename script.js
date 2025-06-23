const API_KEY = "00b9c36bc4d1421abb5151910240710";
let CITY = "Ohio";
let API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=7&aqi=yes&alerts=no`;

$("#search-form").on("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        const input = $(this).val().trim();
        CITY = input;
        API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=7&aqi=yes&alerts=no`;
        fetchWeatherData();
        console.log(CITY);
    }
});

function fetchWeatherData() {
    fetch(API_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network error: " + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);

            const currentData = data.current;
            const currentTime = new Date(currentData.last_updated);
            const currentTemp = currentData.temp_c;
            const currentCondition = currentData.condition.text;
            const currentIconCode = currentData.condition.code;

            let currentWeatherIconClass = "fas fa-cloud animated-icon";
            let tomorrowWeatherIconClass = "fas fa-cloud animated-icon";
            let dayAfterTomorrowWeatherIconClass = "fas fa-cloud animated-icon";

            if (currentCondition.toLowerCase().includes("rain") || currentCondition.toLowerCase().includes("drizzle")) {
                currentWeatherIconClass = "fas fa-cloud-rain animated-icon";
            } else if (currentCondition.toLowerCase().includes("sunny") || currentCondition.toLowerCase().includes("clear")) {
                currentWeatherIconClass = "fas fa-sun animated-icon";
            } else if (currentCondition.toLowerCase().includes("cloudy") || currentCondition.toLowerCase().includes("overcast")) {
                currentWeatherIconClass = "fas fa-cloud animated-icon";
            } else if (currentCondition.toLowerCase().includes("snow") || currentCondition.toLowerCase().includes("sleet") || currentCondition.toLowerCase().includes("ice")) {
                currentWeatherIconClass = "fas fa-snowflake animated-icon";
            } else if (currentCondition.toLowerCase().includes("mist") || currentCondition.toLowerCase().includes("fog")) {
                currentWeatherIconClass = "fas fa-smog animated-icon";
            } else if (currentCondition.toLowerCase().includes("thunder")) {
                currentWeatherIconClass = "fas fa-bolt animated-icon";
            } else {
                currentWeatherIconClass = "fas fa-cloud animated-icon";
            }

            $("#weather-card__i").removeClass().addClass(currentWeatherIconClass);
            $(".weather-card__temp").text(`${currentTemp}°C`);
            $(".weather-card__location").text(data.location.name);
            $(".weather-card__time").text(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            $(".weather-card__condition").text(currentCondition);

            const forecast = data.forecast.forecastday;
            const tomorrowCondition = forecast[1].day.condition.text;
            const DayAfterTomorrowCondition = forecast[2].day.condition.text;
            const tomorrowTemp = forecast[1].day.avgtemp_c;
            const DayAfterTomorrowTemp = forecast[2].day.avgtemp_c;

            if (tomorrowCondition.toLowerCase().includes("rain") || tomorrowCondition.toLowerCase().includes("drizzle")) {
                tomorrowWeatherIconClass = "fas fa-cloud-rain animated-icon";
            } else if (tomorrowCondition.toLowerCase().includes("sunny") || tomorrowCondition.toLowerCase().includes("clear")) {
                tomorrowWeatherIconClass = "fas fa-sun animated-icon";
            } else if (tomorrowCondition.toLowerCase().includes("cloudy") || tomorrowCondition.toLowerCase().includes("overcast")) {
                tomorrowWeatherIconClass = "fas fa-cloud animated-icon";
            } else if (tomorrowCondition.toLowerCase().includes("snow") || tomorrowCondition.toLowerCase().includes("sleet") || tomorrowCondition.toLowerCase().includes("ice")) {
                tomorrowWeatherIconClass = "fas fa-snowflake animated-icon";
            } else if (tomorrowCondition.toLowerCase().includes("mist") || tomorrowCondition.toLowerCase().includes("fog")) {
                tomorrowWeatherIconClass = "fas fa-smog animated-icon";
            } else if (tomorrowCondition.toLowerCase().includes("thunder")) {
                tomorrowWeatherIconClass = "fas fa-bolt animated-icon";
            } else {
                tomorrowWeatherIconClass = "fas fa-cloud animated-icon";
            }

            if (DayAfterTomorrowCondition.toLowerCase().includes("rain") || DayAfterTomorrowCondition.toLowerCase().includes("drizzle")) {
                dayAfterTomorrowWeatherIconClass = "fas fa-cloud-rain animated-icon";
            } else if (DayAfterTomorrowCondition.toLowerCase().includes("sunny") || DayAfterTomorrowCondition.toLowerCase().includes("clear")) {
                dayAfterTomorrowWeatherIconClass = "fas fa-sun animated-icon";
            } else if (DayAfterTomorrowCondition.toLowerCase().includes("cloudy") || DayAfterTomorrowCondition.toLowerCase().includes("overcast")) {
                dayAfterTomorrowWeatherIconClass = "fas fa-cloud animated-icon";
            } else if (DayAfterTomorrowCondition.toLowerCase().includes("snow") || DayAfterTomorrowCondition.toLowerCase().includes("sleet") || DayAfterTomorrowCondition.toLowerCase().includes("ice")) {
                dayAfterTomorrowWeatherIconClass = "fas fa-snowflake animated-icon";
            } else if (DayAfterTomorrowCondition.toLowerCase().includes("mist") || DayAfterTomorrowCondition.toLowerCase().includes("fog")) {
                dayAfterTomorrowWeatherIconClass = "fas fa-smog animated-icon";
            } else if (DayAfterTomorrowCondition.toLowerCase().includes("thunder")) {
                dayAfterTomorrowWeatherIconClass = "fas fa-bolt animated-icon";
            } else {
                dayAfterTomorrowWeatherIconClass = "fas fa-cloud animated-icon";
            }

            $("#forecast-card__today__i").removeClass().addClass(currentWeatherIconClass + ' forecast-card__icon');
            $("#forecast-card__tomorrow__i").removeClass().addClass(tomorrowWeatherIconClass + ' forecast-card__icon');
            $("#forecast-card__day-after-tomorrow__i").removeClass().addClass(dayAfterTomorrowWeatherIconClass + ' forecast-card__icon');
            $("#forecast-card__today-temp").text(`${currentTemp}°C`);
            $("#forecast-card__tomorrow-temp").text(`${tomorrowTemp}°C`);
            $("#forecast-card__day-after-tomorrow-temp").text(`${DayAfterTomorrowTemp}°C`);

            const uvIndex = currentData.uv;
            const windStatus = currentData.wind_kph;
            const sunriseAndSunset = {
                sunrise: data.forecast.forecastday[0].astro.sunrise,
                sunset: data.forecast.forecastday[0].astro.sunset
            };
            const humidity = currentData.humidity;
            const visibility = currentData.vis_km;
            const airQuality = currentData.air_quality;

            $("#highlight__value--uv").text(uvIndex);
            $("#highlight__value--wind").text(`${windStatus} km/h`);
            $("#highlight__value__Sunrise--sun").text(sunriseAndSunset.sunrise);
            $("#highlight__value__Sunset--sun").text(sunriseAndSunset.sunset);
            $("#highlight__value--humidity").text(`${humidity}%`);
            $("#highlight__value--visibility").text(`${visibility} km`);
            $("#highlight__value--aqi").text(airQuality.pm10 ? airQuality.pm10.toFixed(2) : "N/A");
        })
        .catch((error) => {
            console.error("Fetch error: ", error);
            $(".weather-card__temp").text("--°C");
            $(".weather-card__location").text("Error");
            $(".weather-card__time").text("--:--");
            $(".weather-card__condition").text("Could not fetch data");
            $("#weather-card__i").removeClass().addClass("fas fa-exclamation-circle animated-icon");
        });
}

$(document).ready(function () {
    console.log("Document is ready! Fetching initial weather data.");
    fetchWeatherData();
});
