import { updateTodaysWeather } from "./todayWeatherDOM";
import { setWeatherIcon } from "./setWeatherIcons";
import { updateForecastDay } from "./forecastWeatherDOM";
import { setCityName } from "./setCityDOM";
import { weatherDescriptions } from "./weatherDescriptions";

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
      const currentWeatherCode = currentWeather.current.weather_code;
      const currentWeatherDescription = weatherDescriptions[currentWeatherCode];
      const maxTempToday = Math.round(dailyWeather.daily.temperature_2m_max[0]);
      const minTempToday = Math.round(dailyWeather.daily.temperature_2m_min[0]);
      const windSpeedToday = Math.round(
        dailyWeather.daily.wind_speed_10m_max[0]
      );
      const rainProbabilityToday =
        dailyWeather.daily.precipitation_probability_max[0];
      const sunriseToday = dailyWeather.daily.sunrise[0];
      const sunsetToday = dailyWeather.daily.sunset[0];
      const timezone = currentWeather.timezone;

      updateTodaysWeather(
        currentTemp,
        currentWeatherDescription,
        maxTempToday,
        minTempToday,
        windSpeedToday,
        rainProbabilityToday,
        sunriseToday,
        sunsetToday
      );

      for (let i = 1; i <= 7; i++) {
        const dateForecast = dailyWeather.daily.time[i - 1];
        const maxTempForecast = Math.round(
          dailyWeather.daily.temperature_2m_max[i - 1]
        );
        const minTempForecast = Math.round(
          dailyWeather.daily.temperature_2m_min[i - 1]
        );
        const generalWeather = dailyWeather.daily.weather_code[i - 1];
        const generalWeatherDescription = weatherDescriptions[generalWeather];

        updateForecastDay(
          i,
          dateForecast,
          maxTempForecast,
          minTempForecast,
          generalWeatherDescription
        );
        setWeatherIcon(generalWeather, `forecast-${i}-icon`);
      }

      setCityName(timezone);
      setWeatherIcon(currentWeatherCode, "weather-icon-today");
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
