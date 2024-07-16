import { fetchWeatherData } from "./open-meteo.ts";

export function initializeCityDivs() {
  const cityDivs = [
    "johannesburg",
    "tokyo",
    "new-york",
    "london",
    "amsterdam",
    "sydney",
  ];

  cityDivs.forEach((city) => {
    const cityDiv = document.getElementById(city);
    cityDiv?.addEventListener("click", function () {
      let latitude = -26.2023;
      let longitude = 28.0436;

      switch (city) {
        case "johannesburg":
          latitude = -26.2023;
          longitude = 28.0436;
          break;
        case "tokyo":
          latitude = 35.6895;
          longitude = 139.6917;
          break;
        case "new-york":
          latitude = 40.7128;
          longitude = -74.006;
          break;
        case "london":
          latitude = 51.5074;
          longitude = -0.1278;
          break;
        case "amsterdam":
          latitude = 52.3676;
          longitude = 4.9041;
          break;
        case "sydney":
          latitude = -33.8678;
          longitude = 151.2073;
          break;
        default:
          break;
      }

      const chosenLocationH1 = document.getElementById(
        "chosen-location"
      ) as HTMLHeadingElement;
      chosenLocationH1.textContent = cityDiv?.textContent?.trim() || "";

      fetchWeatherData(latitude, longitude);
    });
  });
}
