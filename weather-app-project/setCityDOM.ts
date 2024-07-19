import { updateRecentPlaces } from "./recentPlaces";

export const setCityName = (timezone: string) => {
  const cityNameElement = document.getElementById("chosen-location");

  if (cityNameElement) {
    const parts = timezone.split("/");
    if (parts.length > 1) {
      const cityWithUnderscores = parts[1];
      const city = cityWithUnderscores.replace(/_/g, " ");
      cityNameElement.textContent = city;
      sessionStorage.setItem("lastCity", city);
      sessionStorage.setItem(
        "lastMaxTemp",
        sessionStorage.getItem("lastMaxTemp") || ""
      );
      sessionStorage.setItem(
        "lastMinTemp",
        sessionStorage.getItem("lastMinTemp") || ""
      );
      updateRecentPlaces(city);
    } else {
      console.error("Invalid timezone format");
    }
  } else {
    console.error("Element with ID 'chosen-location' not found.");
  }
};
