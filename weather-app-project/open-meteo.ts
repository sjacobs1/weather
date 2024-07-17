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
      const dailyWeatherCode = dailyWeather.daily.weather_code;

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

      const timezone = currentWeather.timezone;
      const cityNameElement = document.getElementById("chosen-location");

      if (cityNameElement) {
        const parts = timezone.split("/");
        if (parts.length > 1) {
          const cityWithUnderscores = parts[1];
          const city = cityWithUnderscores.replace(/_/g, " ");
          cityNameElement.textContent = city;
        } else {
          console.error("Invalid timezone format");
        }
      } else {
        console.error("Element with ID 'chosen-location' not found.");
      }

      function setWeatherIcon(weatherCode, targetElementId) {
        const weatherIconElement = document.getElementById(targetElementId);
        if (!weatherIconElement) return;
    
        let weatherIcon;
        switch (weatherCode) {
          case 0:
          case 1:
            weatherIcon = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="3rem" width="3rem" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 48v48m0 320v48m147.08-355.08-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48m-320 0H48m355.08 147.08-33.94-33.94M142.86 142.86l-33.94-33.94"></path><circle cx="256" cy="256" r="80" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></circle></svg>`;
            break;
          case 2:
            weatherIcon = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 30 30" height="3rem" width="3rem" xmlns="http://www.w3.org/2000/svg"><path d="M1.56,16.9c0,0.9,0.22,1.73,0.66,2.49s1.04,1.36,1.8,1.8c0.76,0.44,1.58,0.66,2.47,0.66h10.83c0.89,0,1.72-0.22,2.48-0.66
	c0.76-0.44,1.37-1.04,1.81-1.8c0.44-0.76,0.67-1.59,0.67-2.49c0-0.66-0.14-1.33-0.42-2C22.62,13.98,23,12.87,23,11.6
	c0-0.71-0.14-1.39-0.41-2.04c-0.27-0.65-0.65-1.2-1.12-1.67C21,7.42,20.45,7.04,19.8,6.77c-0.65-0.28-1.33-0.41-2.04-0.41
	c-1.48,0-2.77,0.58-3.88,1.74c-0.77-0.44-1.67-0.66-2.7-0.66c-1.41,0-2.65,0.44-3.73,1.31c-1.08,0.87-1.78,1.99-2.08,3.35
	c-1.12,0.26-2.03,0.83-2.74,1.73S1.56,15.75,1.56,16.9z M3.27,16.9c0-0.84,0.28-1.56,0.84-2.17c0.56-0.61,1.26-0.96,2.1-1.06
	l0.5-0.03c0.12,0,0.19-0.06,0.19-0.18l0.07-0.54c0.14-1.08,0.61-1.99,1.41-2.71c0.8-0.73,1.74-1.09,2.81-1.09
	c1.1,0,2.06,0.37,2.87,1.1c0.82,0.73,1.27,1.63,1.37,2.71l0.07,0.58c0.02,0.11,0.09,0.17,0.21,0.17h1.61c0.88,0,1.64,0.32,2.28,0.96
	c0.64,0.64,0.96,1.39,0.96,2.27c0,0.91-0.32,1.68-0.95,2.32c-0.63,0.64-1.4,0.96-2.28,0.96H6.49c-0.88,0-1.63-0.32-2.27-0.97
	C3.59,18.57,3.27,17.8,3.27,16.9z M9.97,4.63c0,0.24,0.08,0.45,0.24,0.63l0.66,0.64c0.25,0.19,0.46,0.27,0.64,0.25
	c0.21,0,0.39-0.09,0.55-0.26s0.24-0.38,0.24-0.62c0-0.24-0.09-0.44-0.26-0.59l-0.59-0.66c-0.18-0.16-0.38-0.24-0.61-0.24
	c-0.24,0-0.45,0.08-0.62,0.25C10.05,4.19,9.97,4.39,9.97,4.63z M15.31,9.06c0.69-0.67,1.51-1,2.45-1c0.99,0,1.83,0.34,2.52,1.03
	c0.69,0.69,1.04,1.52,1.04,2.51c0,0.62-0.17,1.24-0.51,1.84C19.84,12.48,18.68,12,17.32,12H17C16.75,10.91,16.19,9.93,15.31,9.06z
	 M16.94,3.78c0,0.26,0.08,0.46,0.23,0.62s0.35,0.23,0.59,0.23c0.26,0,0.46-0.08,0.62-0.23c0.16-0.16,0.23-0.36,0.23-0.62V1.73
	c0-0.24-0.08-0.43-0.24-0.59s-0.36-0.23-0.61-0.23c-0.24,0-0.43,0.08-0.59,0.23s-0.23,0.35-0.23,0.59V3.78z M22.46,6.07
	c0,0.26,0.07,0.46,0.22,0.62c0.21,0.16,0.42,0.24,0.62,0.24c0.18,0,0.38-0.08,0.59-0.24l1.43-1.43c0.16-0.18,0.24-0.39,0.24-0.64
	c0-0.24-0.08-0.44-0.24-0.6c-0.16-0.16-0.36-0.24-0.59-0.24c-0.24,0-0.43,0.08-0.58,0.24l-1.47,1.43
	C22.53,5.64,22.46,5.84,22.46,6.07z M23.25,17.91c0,0.24,0.08,0.45,0.25,0.63l0.65,0.63c0.15,0.16,0.34,0.24,0.58,0.24
	s0.44-0.08,0.6-0.25c0.16-0.17,0.24-0.37,0.24-0.62c0-0.22-0.08-0.42-0.24-0.58l-0.65-0.65c-0.16-0.16-0.35-0.24-0.57-0.24
	c-0.24,0-0.44,0.08-0.6,0.24C23.34,17.47,23.25,17.67,23.25,17.91z M24.72,11.6c0,0.23,0.09,0.42,0.26,0.58
	c0.16,0.16,0.37,0.24,0.61,0.24h2.04c0.23,0,0.42-0.08,0.58-0.23s0.23-0.35,0.23-0.59c0-0.24-0.08-0.44-0.23-0.6
	s-0.35-0.25-0.58-0.25h-2.04c-0.24,0-0.44,0.08-0.61,0.25C24.8,11.17,24.72,11.37,24.72,11.6z"></path></svg>`;
            break;
          case 3:
            weatherIcon = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 30 30" height="3rem" width="3rem" xmlns="http://www.w3.org/2000/svg"><path d="M3.89,17.6c0-0.99,0.31-1.88,0.93-2.65s1.41-1.27,2.38-1.49c0.26-1.17,0.85-2.14,1.78-2.88c0.93-0.75,2-1.12,3.22-1.12
	c1.18,0,2.24,0.36,3.16,1.09c0.93,0.73,1.53,1.66,1.8,2.8h0.27c1.18,0,2.18,0.41,3.01,1.24s1.25,1.83,1.25,3
	c0,1.18-0.42,2.18-1.25,3.01s-1.83,1.25-3.01,1.25H8.16c-0.58,0-1.13-0.11-1.65-0.34S5.52,21,5.14,20.62
	c-0.38-0.38-0.68-0.84-0.91-1.36S3.89,18.17,3.89,17.6z M5.34,17.6c0,0.76,0.28,1.42,0.82,1.96s1.21,0.82,1.99,0.82h9.28
	c0.77,0,1.44-0.27,1.99-0.82c0.55-0.55,0.83-1.2,0.83-1.96c0-0.76-0.27-1.42-0.83-1.96c-0.55-0.54-1.21-0.82-1.99-0.82h-1.39
	c-0.1,0-0.15-0.05-0.15-0.15l-0.07-0.49c-0.1-0.94-0.5-1.73-1.19-2.35s-1.51-0.93-2.45-0.93c-0.94,0-1.76,0.31-2.46,0.94
	c-0.7,0.62-1.09,1.41-1.18,2.34l-0.07,0.42c0,0.1-0.05,0.15-0.16,0.15l-0.45,0.07c-0.72,0.06-1.32,0.36-1.81,0.89
	C5.59,16.24,5.34,16.87,5.34,17.6z M14.19,8.88c-0.1,0.09-0.08,0.16,0.07,0.21c0.43,0.19,0.79,0.37,1.08,0.55
	c0.11,0.03,0.19,0.02,0.22-0.03c0.61-0.57,1.31-0.86,2.12-0.86c0.81,0,1.5,0.27,2.1,0.81c0.59,0.54,0.92,1.21,0.99,2l0.09,0.64h1.42
	c0.65,0,1.21,0.23,1.68,0.7c0.47,0.47,0.7,1.02,0.7,1.66c0,0.6-0.21,1.12-0.62,1.57s-0.92,0.7-1.53,0.77c-0.1,0-0.15,0.05-0.15,0.16
	v1.13c0,0.11,0.05,0.16,0.15,0.16c1.01-0.06,1.86-0.46,2.55-1.19s1.04-1.6,1.04-2.6c0-1.06-0.37-1.96-1.12-2.7
	c-0.75-0.75-1.65-1.12-2.7-1.12h-0.15c-0.26-1-0.81-1.82-1.65-2.47c-0.83-0.65-1.77-0.97-2.8-0.97C16.28,7.29,15.11,7.82,14.19,8.88
	z"></path></svg>`
            break;
          case 45:
          case 48:
            weatherIcon = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="3rem" width="3rem" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 4a4 4 0 0 0-3.8 2.745.5.5 0 1 1-.949-.313 5.002 5.002 0 0 1 9.654.595A3 3 0 0 1 13 13H.5a.5.5 0 0 1 0-1H13a2 2 0 0 0 .001-4h-.026a.5.5 0 0 1-.5-.445A4 4 0 0 0 8.5 4M0 8.5A.5.5 0 0 1 .5 8h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"></path></svg>`
            break;
          case 51:
          case 53: 
          case 55:
          case 56:
          case 57:  
            weatherIcon = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="3rem" width="3rem" xmlns="http://www.w3.org/2000/svg"><g id="Cloud_Drizzle"><g><path d="M17.605,16.787v1.018a.5.5,0,0,0,1,0V16.787a.516.516,0,0,0-.146-.354.5.5,0,0,0-.854.354Z"></path><path d="M11.5,16.787v1.018a.516.516,0,0,0,.146.353.5.5,0,0,0,.854-.353V16.787a.521.521,0,0,0-.146-.354.5.5,0,0,0-.854.354Z"></path><path d="M14.552,20.343v1.018a.5.5,0,0,0,1,0V20.343a.516.516,0,0,0-.146-.354.5.5,0,0,0-.854.354Z"></path><path d="M8.446,20.343v1.018a.5.5,0,0,0,1,0V20.343a.521.521,0,0,0-.146-.354.5.5,0,0,0-.854.354Z"></path><path d="M5.393,16.787v1.018a.5.5,0,0,0,1,0V16.787a.521.521,0,0,0-.146-.354.5.5,0,0,0-.854.354Z"></path><path d="M16.1,14.228h-5.99A6.116,6.116,0,0,1,3.916,8.474h0A6.044,6.044,0,0,1,9.953,2.139a6.07,6.07,0,0,1,5.8,4.366,3.919,3.919,0,0,1,3.288,1.2,3.85,3.85,0,0,1,1.038,2.908A3.946,3.946,0,0,1,16.1,14.228ZM4.915,8.427a5.117,5.117,0,0,0,5.194,4.8H16.1a2.944,2.944,0,0,0,2.986-2.682,2.873,2.873,0,0,0-3.494-3l-.2.046-.25-.124a.592.592,0,0,1-.262-.377A5.061,5.061,0,0,0,9.953,3.139,5.043,5.043,0,0,0,4.915,8.427Z"></path></g></g></svg>`
            break;
          case 61:
          case 63: 
          case 65:
          case 66:
          case 67:
              weatherIcon = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="3rem" width="3rem" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linejoin="round" stroke-width="32" d="M114.61 162.85A16.07 16.07 0 0 0 128 149.6C140.09 76.17 193.63 32 256 32c57.93 0 96.62 37.75 112.2 77.74a15.84 15.84 0 0 0 12.2 9.87c50 8.15 91.6 41.54 91.6 99.59 0 59.4-48.6 100.8-108 100.8H130c-49.5 0-90-24.7-90-79.2 0-48.47 38.67-72.22 74.61-77.95z"></path><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="m144 384-32 48m112-48-64 96m144-96-32 48m112-48-64 96"></path></svg>`
            break;
          case 71:
          case 73: 
          case 75:
          case 77:
              weatherIcon = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="3rem" width="3rem" xmlns="http://www.w3.org/2000/svg"><path d="M440.1 355.2l-39.2-23 34.1-9.3c8.4-2.3 13.4-11.1 11.1-19.6l-4.1-15.5c-2.2-8.5-10.9-13.6-19.3-11.3L343 298.2 271.2 256l71.9-42.2 79.7 21.7c8.4 2.3 17-2.8 19.3-11.3l4.1-15.5c2.2-8.5-2.7-17.3-11.1-19.6l-34.1-9.3 39.2-23c7.5-4.4 10.1-14.2 5.8-21.9l-7.9-13.9c-4.3-7.7-14-10.3-21.5-5.9l-39.2 23 9.1-34.7c2.2-8.5-2.7-17.3-11.1-19.6l-15.2-4.1c-8.4-2.3-17 2.8-19.3 11.3l-21.3 81-71.9 42.2v-84.5L306 70.4c6.1-6.2 6.1-16.4 0-22.6l-11.1-11.3c-6.1-6.2-16.1-6.2-22.2 0l-24.9 25.4V16c0-8.8-7-16-15.7-16h-15.7c-8.7 0-15.7 7.2-15.7 16v46.1l-24.9-25.4c-6.1-6.2-16.1-6.2-22.2 0L142.1 48c-6.1 6.2-6.1 16.4 0 22.6l58.3 59.3v84.5l-71.9-42.2-21.3-81c-2.2-8.5-10.9-13.6-19.3-11.3L72.7 84c-8.4 2.3-13.4 11.1-11.1 19.6l9.1 34.7-39.2-23c-7.5-4.4-17.1-1.8-21.5 5.9l-7.9 13.9c-4.3 7.7-1.8 17.4 5.8 21.9l39.2 23-34.1 9.1c-8.4 2.3-13.4 11.1-11.1 19.6L6 224.2c2.2 8.5 10.9 13.6 19.3 11.3l79.7-21.7 71.9 42.2-71.9 42.2-79.7-21.7c-8.4-2.3-17 2.8-19.3 11.3l-4.1 15.5c-2.2 8.5 2.7 17.3 11.1 19.6l34.1 9.3-39.2 23c-7.5 4.4-10.1 14.2-5.8 21.9L10 391c4.3 7.7 14 10.3 21.5 5.9l39.2-23-9.1 34.7c-2.2 8.5 2.7 17.3 11.1 19.6l15.2 4.1c8.4 2.3 17-2.8 19.3-11.3l21.3-81 71.9-42.2v84.5l-58.3 59.3c-6.1 6.2-6.1 16.4 0 22.6l11.1 11.3c6.1 6.2 16.1 6.2 22.2 0l24.9-25.4V496c0 8.8 7 16 15.7 16h15.7c8.7 0 15.7-7.2 15.7-16v-46.1l24.9 25.4c6.1 6.2 16.1 6.2 22.2 0l11.1-11.3c6.1-6.2 6.1-16.4 0-22.6l-58.3-59.3v-84.5l71.9 42.2 21.3 81c2.2 8.5 10.9 13.6 19.3 11.3L375 428c8.4-2.3 13.4-11.1 11.1-19.6l-9.1-34.7 39.2 23c7.5 4.4 17.1 1.8 21.5-5.9l7.9-13.9c4.6-7.5 2.1-17.3-5.5-21.7z"></path></svg>`
              break;
          case 80:
          case 81:
          case 82:
          case 85:
            weatherIcon = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 32 32" height="3rem" width="3rem" xmlns="http://www.w3.org/2000/svg"><path d="M 16 5 C 12.667969 5 9.949219 7.371094 9.25 10.5 C 8.03125 10.980469 7.125 11.871094 6.59375 13.0625 C 6.394531 13.039063 6.210938 13 6 13 C 2.699219 13 0 15.699219 0 19 C 0 19.066406 -0.00390625 19.121094 0 19.1875 C 0.09375 22.046875 2.140625 24.355469 4.84375 24.875 L 6.75 23 L 6 23 C 3.828125 23 2.070313 21.292969 2 19.125 C 2 19.082031 2 19.042969 2 19 C 2 16.78125 3.78125 15 6 15 C 6.292969 15 6.578125 15.027344 6.875 15.09375 L 7.875 15.3125 L 8.0625 14.34375 C 8.308594 13.230469 9.203125 12.359375 10.3125 12.09375 L 10.96875 11.9375 L 11.0625 11.25 C 11.417969 8.835938 13.476563 7 16 7 C 17.957031 7 19.644531 8.121094 20.46875 9.75 L 20.84375 10.53125 L 21.6875 10.25 C 22.125 10.097656 22.554688 10 23 10 C 25.21875 10 27 11.78125 27 14 C 27 13.992188 26.984375 14.078125 26.96875 14.3125 L 26.90625 15.03125 L 27.5625 15.3125 C 28.992188 15.921875 30 17.339844 30 19 C 30 21.21875 28.21875 23 26 23 L 25.3125 23 L 23.28125 25 L 26 25 C 29.300781 25 32 22.300781 32 19 C 32 16.835938 30.730469 15.054688 29 14 C 29 10.699219 26.300781 8 23 8 C 22.566406 8 22.203125 8.128906 21.8125 8.21875 C 20.5625 6.300781 18.453125 5 16 5 Z M 13.59375 19.09375 L 3.9375 28.59375 L 5.34375 30 L 15 20.5 Z M 18.59375 19.09375 L 8.9375 28.59375 L 10.34375 30 L 20 20.5 Z M 23.59375 19.09375 L 13.9375 28.59375 L 15.34375 30 L 25 20.5 Z"></path></svg>`
            break;
          case 86:
            weatherIcon = `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="3rem" width="3rem" xmlns="http://www.w3.org/2000/svg"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line></svg>`
            break;
            case 95:
            case 96:
            case 99:
              weatherIcon = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="3rem" width="3rem" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M96 416a16 16 0 0 1-14.3-23.16l24-48a16 16 0 0 1 28.62 14.32l-24 48A16 16 0 0 1 96 416zm24 64a16 16 0 0 1-14.3-23.16l16-32a16 16 0 0 1 28.62 14.32l-16 32A16 16 0 0 1 120 480zm256-64a16 16 0 0 1-14.3-23.16l24-48a16 16 0 0 1 28.62 14.32l-24 48A16 16 0 0 1 376 416zm24 64a16 16 0 0 1-14.3-23.16l16-32a16 16 0 0 1 28.62 14.32l-16 32A16 16 0 0 1 400 480z"></path><path d="M405.84 136.9a151.25 151.25 0 0 0-47.6-81.9 153 153 0 0 0-241.81 51.86C60.5 110.16 16 156.65 16 213.33 16 272.15 63.91 320 122.8 320h66.31l-12.89 77.37A16 16 0 0 0 192 416h32v64a16 16 0 0 0 29 9.3l80-112a16 16 0 0 0-13-25.3h-27.51l8-32h103.84a91.56 91.56 0 0 0 1.51-183.1z"></path></svg>`
              break;
          default:
            weatherIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="3rem" height="3rem"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"></circle></svg>`; // Default icon if weather code not found
        }
        weatherIconElement.innerHTML = weatherIcon;
      }

      setWeatherIcon(currentWeatherCode, "weather-icon-today");
      setWeatherIcon(dailyWeatherCode[1], "forecast-two-icon");
      setWeatherIcon(dailyWeatherCode[2], "forecast-three-icon");
      setWeatherIcon(dailyWeatherCode[3], "forecast-four-icon");
      setWeatherIcon(dailyWeatherCode[4], "forecast-five-icon");
      setWeatherIcon(dailyWeatherCode[5], "forecast-six-icon");
      setWeatherIcon(dailyWeatherCode[6], "forecast-seven-icon");



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
