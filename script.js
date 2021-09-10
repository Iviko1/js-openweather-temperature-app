window.addEventListener("load", () => {
  const KEY = "65655e9ef17e8680ba1aabbfb041a2ed";

  const body = document.querySelector("body");

  body.style.margin = 0;
  body.style.background = "#112031";
  body.style.height = "100vh";
  body.style.display = "flex";
  body.style.justifyContent = "center";
  body.style.alignItems = "center";
  body.style.fontSize = "62.5%";
  body.style.fontFamily = "Poppins, sans-serif";

  const container = document.createElement("div");

  container.style.width = "80%";
  container.style.margin = "0 auto";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";

  const locationText = document.createElement("h1");

  locationText.style.color = "#345B63";
  locationText.style.fontSize = "3rem";

  const temperature = document.createElement("h2");

  temperature.style.color = "#D4ECDD";
  temperature.style.fontSize = "3rem";
  temperature.style.cursor = "pointer";
  temperature.style.transition = "all 250ms ease-in";

  temperature.addEventListener("mouseover", (e) => {
    e.target.style.transform = "scale(1.1)";
    e.target.style.opacity = "0.7";
  });
  temperature.addEventListener("mouseleave", (e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.opacity = "1";
  });

  const description = document.createElement("h2");

  description.style.color = "#345B63";
  description.style.fontSize = "3rem";
  description.style.textTransform = "uppercase";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      const API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`;

      fetch(API)
        .then((res) => res.json())
        .then((data) => {
          const temp = `${Math.floor(data.current.temp)}°C`;
          const city = data.timezone;
          const desc = data.current.weather[0].description;

          locationText.textContent = city;
          temperature.textContent = temp;
          description.textContent = desc;
          temperature.addEventListener("click", () => {
            if (temperature.textContent.includes("C")) {
              temperature.textContent = `${Math.round(
                data.current.temp * (9 / 5) + 32
              )}°F`;
            } else if (temperature.textContent.includes("F")) {
              temperature.textContent = `${Math.round(data.current.temp)}°C`;
            }
          });
        });
    });
    body.appendChild(container);
    container.appendChild(locationText);
    container.appendChild(temperature);
    container.appendChild(description);
  }
  if (temperature.textContent == "") {
    temperature.textContent = "Please Enable Location";
  }
});
