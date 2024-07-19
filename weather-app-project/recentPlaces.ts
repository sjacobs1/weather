export function updateRecentPlaces(city: string) {
  const recentPlacesElement = document.getElementById("recent-places");
  if (!recentPlacesElement) return;

  const maxTemp = sessionStorage.getItem("lastMaxTemp");
  const minTemp = sessionStorage.getItem("lastMinTemp");

  let recentCities: {
    city: string;
    maxTemp: string | null;
    minTemp: string | null;
  }[] = [];
  const recentCitiesJSON = sessionStorage.getItem("recentCities");

  if (recentCitiesJSON) {
    recentCities = JSON.parse(recentCitiesJSON);
  }

  const index = recentCities.findIndex((item) => item.city === city);

  if (index !== -1) {
    recentCities.splice(index, 1);
  }

  recentCities.unshift({ city, maxTemp, minTemp });

  sessionStorage.setItem("recentCities", JSON.stringify(recentCities));

  recentPlacesElement.innerHTML = "";

  recentCities.forEach((item) => {
    const divItem = document.createElement("div");
    divItem.style.minWidth = "120px";
    divItem.classList.add("bg-today", "rounded-lg");
    divItem.innerHTML = `
        <div>${item.city}</div>
        <div>High ${item.maxTemp ?? "N/A"}°C</div>
        <div>Low ${item.minTemp ?? "N/A"}°C</div>
      `;
    recentPlacesElement.appendChild(divItem);
  });
}
