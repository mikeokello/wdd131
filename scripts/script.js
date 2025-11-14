// Display last modification with current date
const lastModified = new Date();
document.getElementById("lastModified").textContent = lastModified.toLocaleString();


// Static temperature and wind speed
const temp = 25; // °C
const wind = 15; // km/h

// Wind chill calculation
function calculateWindChill(T, V) {
    return 13.12 + 0.6215 * T - 11.37 * Math.pow(V, 0.16) + 0.3965 * T * Math.pow(V, 0.16);
}

// Display wind chill
const windChillElement = document.getElementById("windchill");
if (temp <= 10 && wind > 4.8) {
    windChillElement.textContent = calculateWindChill(temp, wind).toFixed(1) + " °C";
} else {
    windChillElement.textContent = "N/A";
}
