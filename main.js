const input = document.querySelector("#cep");
const city = document.querySelector("#city");
const degrees = document.querySelector("#degrees");
const weatherIcon = document.querySelector("#weather-icon");
const weatherDescription = document.querySelector("#weather-description");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");
const buttonSearch = document.querySelector(".search");
const alertError = document.querySelector(".error");
const lang = "pt_br";
const key = config.SECRET_API_KEY;

input.addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        searchCEP();
    }
});

buttonSearch.addEventListener("click", () => {
    searchCEP();
});

input.addEventListener("keyup", () => {
    alertError.innerHTML = "";
})

async function searchCEP() {
    const cep = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key}&lang=${lang}`;

    try {   
        await fetch(cep)
            .then((res) => res.json())
            .then((data) => {
                if(data?.cod && data.cod === "404") {
                    return alertError.innerHTML = "Local não encontrado!";
                }

                loadData(data);
            })
    } catch(error) {
        if(!input.value) {
            alertError.innerHTML = "Por favor, informe uma cidade!";
        } else {
            alertError.innerHTML = "Ocorreu um erro na requisão, tente novamente!"
        }
        
    }
}

function loadData(data) {
    const celsius = data.main.temp - 273;

    city.innerHTML = `${data.name}, ${data.sys.country}`;
    degrees.innerHTML = `${Math.floor(celsius.toFixed(2))}°`;
    weatherIcon.innerHTML = `<img src="img/${data.weather[0].icon}.png"/>`
    weatherDescription.innerHTML = `${(data.weather[0].description).toUpperCase()}`
    wind.innerHTML = `<div class="bar"></div><p>Vento: ${(data.wind.speed * 1.6).toFixed()}km/h</p>`;
    humidity.innerHTML = `<div class="bar"></div><p>Umidade: ${data.main.humidity}%</p>`;
}

