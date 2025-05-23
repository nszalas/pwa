function getWeather() {

  const city = document.getElementById("city").value;
  const apiKey = "57b995df8732750094bae2f8a884c6cd"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.getElementById("weather").innerHTML = `
        <p><strong>${data.name}</strong></p>
        <p>Temperatura: ${data.main.temp}°C</p>
        <p>${data.weather[0].description}</p>
      `;
    })
    .catch(() => {
      document.getElementById("weather").innerText = "Error: no data.";
    });
}