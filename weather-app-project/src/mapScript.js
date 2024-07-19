import { fetchWeatherData } from "../open-meteo";

let map = L.map("map").setView([-26.2708, 28.1123], 1);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

map.on("click", function (e) {
  const latitude = e.latlng.lat;
  const longitude = e.latlng.lng;

  map.eachLayer(function (layer) {
    if (layer instanceof L.Circle) {
      map.removeLayer(layer);
    }
  });

  L.circle([latitude, longitude], { radius: 100000, color: "red" }).addTo(map);

  fetchWeatherData(latitude, longitude);
});
