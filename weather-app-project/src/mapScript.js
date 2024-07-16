import { fetchWeatherData } from "../open-meteo";

let map = L.map("map").setView([-26.2708, 28.1123], 3);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

map.on("click", function (e) {
  const latitude = e.latlng.lat;
  const longitude = e.latlng.lng;
  console.log(latitude, longitude);
  var c = L.circle([latitude, longitude], { radius: 100 }).addTo(map);

  fetchWeatherData(latitude, longitude);
});
