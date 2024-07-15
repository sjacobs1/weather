const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Light rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snowfall",
  73: "Moderate snowfall",
  75: "Heavy snowfall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm slight",
  96: "Thunderstorm slight with hail",
  99: "Thunderstorm heavy with hail",
};

export const fetchWeatherData = (latitude: number, longitude: number) => {
  const currentWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,&timezone=auto`;
  const dailyWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,wind_speed_10m_max&timezone=auto`;
  Promise.all([fetch(currentWeatherUrl), fetch(dailyWeatherUrl)])
    .then((responses) => {
      return Promise.all(
        responses.map((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
      );
    })
    .then((jsons) => {
      const currentWeather = jsons[0];
      const dailyWeather = jsons[1];

      const currentTemp = Math.round(currentWeather.current.temperature_2m);
      const tempElement = document.getElementById("current-temperature");
      if (tempElement) {
        tempElement.textContent = `${currentTemp}°C`;
      } else {
        console.error("Element with ID 'current-temp' not found.");
      }

      const currentWeatherCode = currentWeather.current.weather_code;
      const currentWeatherDescription = weatherDescriptions[currentWeatherCode];
      const weatherDescriptionElement = document.getElementById(
        "current-general-weather"
      );
      if (weatherDescriptionElement) {
        weatherDescriptionElement.textContent =
          currentWeatherDescription || "Unknown";
      } else {
        console.error("Element with ID 'current-general-weather' not found.");
      }

      const maxTempToday = Math.round(dailyWeather.daily.temperature_2m_max[0]);
      const maxTempElement = document.getElementById("max-temperature-today");
      if (maxTempElement) {
        maxTempElement.textContent = `${maxTempToday}°C`;
      } else {
        console.error("Element with ID 'max-temperature-today' not found.");
      }

      const minTempToday = Math.round(dailyWeather.daily.temperature_2m_min[0]);
      const minTempElement = document.getElementById("min-temperature-today");
      if (minTempElement) {
        minTempElement.textContent = `${minTempToday}°C`;
      } else {
        console.error("Element with ID 'min-temperature-today' not found.");
      }

      const windSpeedToday = Math.round(
        dailyWeather.daily.wind_speed_10m_max[0]
      );
      const windSpeedElement = document.getElementById("wind-speed-today");
      if (windSpeedElement) {
        windSpeedElement.textContent = `${windSpeedToday} km/h`;
      } else {
        console.error("Element with ID 'wind-speed-today' not found.");
      }

      const rainProbabilityToday =
        dailyWeather.daily.precipitation_probability_max[0];
      const rainProbabilityElement = document.getElementById(
        "rain-probability-today"
      );
      if (rainProbabilityElement) {
        rainProbabilityElement.textContent = `${rainProbabilityToday}%`;
      } else {
        console.error("Element with ID 'rain-probability-today' not found.");
      }

      const sunriseToday = dailyWeather.daily.sunrise[0];
      const sunriseElement = document.getElementById("sunrise-today");
      if (sunriseElement) {
        sunriseElement.textContent = `${sunriseToday}`.slice(-5);
      } else {
        console.error("Element with ID 'sunrise-today' not found.");
      }

      const sunsetToday = dailyWeather.daily.sunset[0];
      const sunsetElement = document.getElementById("sunset-today");
      if (sunsetElement) {
        sunsetElement.textContent = `${sunsetToday}`.slice(-5);
      } else {
        console.error("Element with ID 'sunset-today' not found.");
      }

      const dateForecastTwo = dailyWeather.daily.time[1];
      const dateElementTwo = document.getElementById("forecast-two-date");
      if (dateElementTwo) {
        dateElementTwo.textContent = `${dateForecastTwo}`.slice(-5);
      } else {
        console.error("Element with ID 'forecast-two-date' not found.");
      }

      const maxTempForecastTwo = Math.round(
        dailyWeather.daily.temperature_2m_max[1]
      );
      const maxTempElementTwo = document.getElementById("forecast-two-high");
      if (maxTempElementTwo) {
        maxTempElementTwo.textContent = `${maxTempForecastTwo}`;
      } else {
        console.error(
          "Element with ID 'max-temperature-forecast-two' not found."
        );
      }

      const minTempForecastTwo = Math.round(
        dailyWeather.daily.temperature_2m_min[1]
      );
      const minTempElementTwo = document.getElementById("forecast-two-low");
      if (minTempElementTwo) {
        minTempElementTwo.textContent = `${minTempForecastTwo}`;
      } else {
        console.error(
          "Element with ID 'min-temperature-forecast-two' not found."
        );
      }

      const generalWeatherTwo = dailyWeather.daily.weather_code[1];
      const generalWeatherDescriptionTwo =
        weatherDescriptions[generalWeatherTwo];
      const weatherDescriptionElementTwo = document.getElementById(
        "general-weather-two"
      );
      if (weatherDescriptionElementTwo) {
        weatherDescriptionElementTwo.textContent =
          generalWeatherDescriptionTwo || "Unknown";
      } else {
        console.error("Element with ID 'general-weather-two' not found.");
      }

      const dateForecastThree = dailyWeather.daily.time[2];
      const dateElementThree = document.getElementById("forecast-three-date");
      if (dateElementThree) {
        dateElementThree.textContent = `${dateForecastThree}`.slice(-5);
      } else {
        console.error("Element with ID 'forecast-two-date' not found.");
      }

      const maxTempForecastThree = Math.round(
        dailyWeather.daily.temperature_2m_max[2]
      );
      const maxTempElementThree = document.getElementById(
        "forecast-three-high"
      );
      if (maxTempElementThree) {
        maxTempElementThree.textContent = `${maxTempForecastThree}`;
      } else {
        console.error(
          "Element with ID 'max-temperature-forecast-two' not found."
        );
      }

      const minTempForecastThree = Math.round(
        dailyWeather.daily.temperature_2m_min[2]
      );
      const minTempElementThree = document.getElementById("forecast-three-low");
      if (minTempElementThree) {
        minTempElementThree.textContent = `${minTempForecastThree}`;
      } else {
        console.error(
          "Element with ID 'min-temperature-forecast-two' not found."
        );
      }

      const generalWeatherThree = dailyWeather.daily.weather_code[2];
      const generalWeatherDescriptionThree =
        weatherDescriptions[generalWeatherThree];
      const weatherDescriptionElementThree = document.getElementById(
        "general-weather-three"
      );
      if (weatherDescriptionElementThree) {
        weatherDescriptionElementThree.textContent =
          generalWeatherDescriptionThree || "Unknown";
      } else {
        console.error("Element with ID 'general-weather-two' not found.");
      }

      const dateForecastFour = dailyWeather.daily.time[3];
      const dateElementFour = document.getElementById("forecast-four-date");
      if (dateElementFour) {
        dateElementFour.textContent = `${dateForecastFour}`.slice(-5);
      } else {
        console.error("Element with ID 'forecast-two-date' not found.");
      }

      const maxTempForecastFour = Math.round(
        dailyWeather.daily.temperature_2m_max[3]
      );
      const maxTempElementFour = document.getElementById("forecast-four-high");
      if (maxTempElementFour) {
        maxTempElementFour.textContent = `${maxTempForecastFour}`;
      } else {
        console.error(
          "Element with ID 'max-temperature-forecast-two' not found."
        );
      }

      const minTempForecastFour = Math.round(
        dailyWeather.daily.temperature_2m_min[3]
      );
      const minTempElementFour = document.getElementById("forecast-four-low");
      if (minTempElementFour) {
        minTempElementFour.textContent = `${minTempForecastFour}`;
      } else {
        console.error(
          "Element with ID 'min-temperature-forecast-two' not found."
        );
      }

      const generalWeatherFour = dailyWeather.daily.weather_code[3];
      const generalWeatherDescriptionFour =
        weatherDescriptions[generalWeatherFour];
      const weatherDescriptionElementFour = document.getElementById(
        "general-weather-four"
      );
      if (weatherDescriptionElementFour) {
        weatherDescriptionElementFour.textContent =
          generalWeatherDescriptionFour || "Unknown";
      } else {
        console.error("Element with ID 'general-weather-two' not found.");
      }

      const dateForecastFive = dailyWeather.daily.time[4];
      const dateElementFive = document.getElementById("forecast-five-date");
      if (dateElementFive) {
        dateElementFive.textContent = `${dateForecastFive}`.slice(-5);
      } else {
        console.error("Element with ID 'forecast-two-date' not found.");
      }

      const maxTempForecastFive = Math.round(
        dailyWeather.daily.temperature_2m_max[4]
      );
      const maxTempElementFive = document.getElementById("forecast-five-high");
      if (maxTempElementFive) {
        maxTempElementFive.textContent = `${maxTempForecastFive}`;
      } else {
        console.error(
          "Element with ID 'max-temperature-forecast-two' not found."
        );
      }

      const minTempForecastFive = Math.round(
        dailyWeather.daily.temperature_2m_min[4]
      );
      const minTempElementFive = document.getElementById("forecast-five-low");
      if (minTempElementFive) {
        minTempElementFive.textContent = `${minTempForecastFive}`;
      } else {
        console.error(
          "Element with ID 'min-temperature-forecast-two' not found."
        );
      }

      const generalWeatherFive = dailyWeather.daily.weather_code[4];
      const generalWeatherDescriptionFive =
        weatherDescriptions[generalWeatherFive];
      const weatherDescriptionElementFive = document.getElementById(
        "general-weather-five"
      );
      if (weatherDescriptionElementFive) {
        weatherDescriptionElementFive.textContent =
          generalWeatherDescriptionFive || "Unknown";
      } else {
        console.error("Element with ID 'general-weather-two' not found.");
      }

      const dateForecastSix = dailyWeather.daily.time[5];
      const dateElementSix = document.getElementById("forecast-six-date");
      if (dateElementSix) {
        dateElementSix.textContent = `${dateForecastSix}`.slice(-5);
      } else {
        console.error("Element with ID 'forecast-two-date' not found.");
      }

      const maxTempForecastSix = Math.round(
        dailyWeather.daily.temperature_2m_max[5]
      );
      const maxTempElementSix = document.getElementById("forecast-six-high");
      if (maxTempElementSix) {
        maxTempElementSix.textContent = `${maxTempForecastSix}`;
      } else {
        console.error(
          "Element with ID 'max-temperature-forecast-two' not found."
        );
      }

      const minTempForecastSix = Math.round(
        dailyWeather.daily.temperature_2m_min[5]
      );
      const minTempElementSix = document.getElementById("forecast-six-low");
      if (minTempElementSix) {
        minTempElementSix.textContent = `${minTempForecastSix}`;
      } else {
        console.error(
          "Element with ID 'min-temperature-forecast-two' not found."
        );
      }

      const generalWeatherSix = dailyWeather.daily.weather_code[5];
      const generalWeatherDescriptionSix =
        weatherDescriptions[generalWeatherSix];
      const weatherDescriptionElementSix = document.getElementById(
        "general-weather-six"
      );
      if (weatherDescriptionElementSix) {
        weatherDescriptionElementSix.textContent =
          generalWeatherDescriptionSix || "Unknown";
      } else {
        console.error("Element with ID 'general-weather-two' not found.");
      }

      const dateForecastSeven = dailyWeather.daily.time[6];
      const dateElementSeven = document.getElementById("forecast-seven-date");
      if (dateElementSeven) {
        dateElementSeven.textContent = `${dateForecastSeven}`.slice(-5);
      } else {
        console.error("Element with ID 'forecast-two-date' not found.");
      }

      const maxTempForecastSeven = Math.round(
        dailyWeather.daily.temperature_2m_max[6]
      );
      const maxTempElementSeven = document.getElementById(
        "forecast-seven-high"
      );
      if (maxTempElementSeven) {
        maxTempElementSeven.textContent = `${maxTempForecastSeven}`;
      } else {
        console.error(
          "Element with ID 'max-temperature-forecast-two' not found."
        );
      }

      const minTempForecastSeven = Math.round(
        dailyWeather.daily.temperature_2m_min[6]
      );
      const minTempElementSeven = document.getElementById("forecast-seven-low");
      if (minTempElementSeven) {
        minTempElementSeven.textContent = `${minTempForecastSeven}`;
      } else {
        console.error(
          "Element with ID 'min-temperature-forecast-two' not found."
        );
      }

      const generalWeatherSeven = dailyWeather.daily.weather_code[6];
      const generalWeatherDescriptionSeven =
        weatherDescriptions[generalWeatherSeven];
      const weatherDescriptionElementSeven = document.getElementById(
        "general-weather-seven"
      );
      if (weatherDescriptionElementSeven) {
        weatherDescriptionElementSeven.textContent =
          generalWeatherDescriptionSeven || "Unknown";
      } else {
        console.error("Element with ID 'general-weather-two' not found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
