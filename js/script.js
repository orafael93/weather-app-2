const api = {
  apiKey: "24f9110197fdab8c45b63610de1ccb46",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

// ELEMENTS BOX RESULTS --
const nameCity = document.querySelector(".name-city");
const nameState = document.querySelector(".name-state");
const nameCountry = document.querySelector(".name-country");
const degrees = document.querySelector(".degree");
const tempType = document.querySelector(".temp-type");
const boxImgForecast = document.querySelector(".img-forecast");

// TRIGGERS SEARCH --
const searchBox = document.querySelector(".searchBox");
searchBox.addEventListener("keypress", search);

function search(e) {
  if (e.keyCode === 13) {
    getQuery(e.target.value);
  }
}

function getQuery(query) {
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.apiKey}`)
    .then((r) => r.json())
    .then((response) => {
      boxImgForecast.innerHTML = "";
      const weatherIcon = response.weather[0].icon;
      const newCreateImage = new CreateImage();

      boxImgForecast.appendChild(newCreateImage.imageIcon(weatherIcon));

      degrees.innerText = `${Math.round(response.main.temp)}°`;
      nameCity.innerText = `${response.name} - `;
      nameCountry.innerText = `${response.sys.country}`;
      tempType.innerText = `${response.weather[0].main}`;
    });
}

// GENERATE IMG --
class CreateImage {
  constructor() {
    this.iconUrl = `http://openweathermap.org/img/w/`;
  }

  imageIcon(imgSrc) {
    const img = document.createElement("img");
    img.setAttribute("src", `${this.iconUrl}${imgSrc}.png`);
    return img;
  }
}
