export const updateForecastDay = (
  dayIndex: number,
  date: string,
  maxTemp: number,
  minTemp: number,
  generalWeatherDescription: string
) => {
  const dateElement = document.getElementById(`forecast-${dayIndex}-date`);
  const maxTempElement = document.getElementById(`forecast-${dayIndex}-high`);
  const minTempElement = document.getElementById(`forecast-${dayIndex}-low`);
  const weatherDescriptionElement = document.getElementById(
    `general-weather-${dayIndex}`
  );

  if (dateElement) dateElement.textContent = date.slice(-5);

  if (maxTempElement) maxTempElement.textContent = `${maxTemp}`;

  if (minTempElement) minTempElement.textContent = `${minTemp}`;

  if (weatherDescriptionElement)
    weatherDescriptionElement.textContent =
      generalWeatherDescription || "Unknown";
};
