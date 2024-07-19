export const updateTodaysWeather = (
  currentTemp: number,
  currentWeatherDescription: string,
  maxTempToday: number,
  minTempToday: number,
  windSpeedToday: number,
  rainProbabilityToday: number,
  sunriseToday: string,
  sunsetToday: string
) => {
  const updateElementText = (id: string, text: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text;
    } else {
      console.error(`Element with ID '${id}' not found.`);
    }
  };

  updateElementText("current-temperature", `${currentTemp}°C`);
  updateElementText(
    "current-general-weather",
    currentWeatherDescription || "Unknown"
  );
  updateElementText("max-temperature-today", `${maxTempToday}°C`);
  updateElementText("min-temperature-today", `${minTempToday}°C`);
  updateElementText("wind-speed-today", `${windSpeedToday} km/h`);
  updateElementText("rain-probability-today", `${rainProbabilityToday}%`);
  updateElementText("sunrise-today", sunriseToday.slice(-5));
  updateElementText("sunset-today", sunsetToday.slice(-5));
};
