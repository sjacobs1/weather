import { fetchWeatherData } from "./open-meteo.ts";
import { initializeCityDivs } from "./locations.ts";

fetchWeatherData(-26.2023, 28.0436);
initializeCityDivs();
