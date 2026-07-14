// select elements to edit
const year = document.querySelector("#currentyear");
let windchill =  document.querySelector("#windchill");
let tempID = document.querySelector("#temperature")
let windID = document.querySelector("#wind")

const temperatureC = 10;
const windSpeedKm = 5;
// Wind Chill = 13.12 + 0.6215T - 11.37V⁰·¹⁶ + 0.3965T × V⁰·¹⁶ T=temp v = windspeed

const calculateWindChill = (temp, windSpeed) => temp <= 10 && windSpeed > 4.8 ? (13.12 + 0.6215*temp-11.37*Math.pow(windSpeed,0.16)+0.3965 * temp *Math.pow(windSpeed,0.16)).toFixed(1): "N/A";

const calculatedWindchill = calculateWindChill(temperatureC, windSpeedKm);

tempID.innerHTML = `${temperatureC}<sup>o</sup>C`;
windID.innerHTML = `${windSpeedKm} km/h`
windchill.innerHTML = calculatedWindchill !== "N/A"? `${calculatedWindchill}<sup>o</sup>C`:"N/A";

year.textContent = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;
