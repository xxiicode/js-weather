const local_api_key = '72a389530b92820cffdc35f468d8463f'
let lang = 'en' // english by default
const searchbutton = document.getElementById('searchButton')
const divContent = document.getElementById('weatherData')
const cityInput = document.getElementById('cityName');
const buttonEng = document.getElementById('english')
const buttonSpa = document.getElementById('espanol')
const URL_base = 'https://api.openweathermap.org/data/2.5/weather'

const translation = {
    en: {
        title: 'Another Weather App ⛅',
        placeholder: 'Please, enter a city name',
        searchButton: 'Search',
        noCity: 'Unknown location',
        hum: 'Humidity'
    },
    es: {
        title: 'Otra Aplicación del Clima ⛅',
        placeholder: 'Por favor, ingrese el nombre de una ciudad',
        searchButton: 'Buscar',
        noCity: 'Ciudad no encontrada',
        hum: 'Humedad'
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const city =cityInput.value
    if(city) {
        fetchWeather(city)
    }
}

function fetchWeather(city){
    fetch(`${URL_base}?q=${city}&appid=${local_api_key}&&units=metric&lang=${lang}`)
    .then(data => data.json())
    .then(data => showData(data))
}

function showData(data) {
    divContent.innerHTML = ''
    console.log(data)
    const cityName = data.name || translation[lang].noCity
    const cityCountry = data.sys ? data.sys.country : ''
    const temperature = data.main ? data.main.temp : 'N/A';
    const humidity = data.main? data.main.humidity: 'N/A'
    const description = data.weather && data.weather.length > 0 ? data.weather[0].description : '';
    const icon = data.weather ? data.weather[0].icon : ''

    const cityTitle = document.createElement('h2')
    cityTitle.textContent = cityName !== translation[lang].noCity ?  `${cityName}, ${cityCountry}` : translation[lang].noCity
    const cityTemperature = document.createElement('p')
    cityTemperature.textContent = temperature !== 'N/A' ? `${temperature} °C` : temperature;
    const cityHumidity = document.createElement('p')
    cityHumidity.textContent = humidity !== 'N/A' ? ` ${translation[lang].hum} :  ${humidity} %` : humidity;
    const descriptionInfo = document.createElement('p')
    descriptionInfo.textContent = description
    if ( cityName !== translation[lang].noCity ) {
        const weatherIcon = document.createElement('img')
        weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
        divContent.appendChild(weatherIcon)
    }

    
    divContent.appendChild(cityTitle)
    divContent.appendChild(cityTemperature)
    divContent.appendChild(cityHumidity)
    divContent.appendChild(descriptionInfo)
}

const changeLang = (lang) => {
    document.getElementById('title').innerText = translation[lang].title
    document.getElementById('heading').innerText = translation[lang].title
    document.getElementById('cityName').placeholder = translation[lang].placeholder
    document.getElementById('searchButton').innerText = translation[lang].searchButton
}

buttonEng.addEventListener('click', () => {
    lang = 'en';
    changeLang(lang)
    if(cityInput.value !== '') {
        fetchWeather(cityInput.value)
    } else {divContent.innerHTML = ''}
    buttonEng.classList.add('active');
    buttonSpa.classList.remove('active');
});
buttonSpa.addEventListener('click', () => {
    lang = 'es';
    changeLang(lang)
    if(cityInput.value !== '') {
        fetchWeather(cityInput.value)
    } else {divContent.innerHTML = ''}
    buttonSpa.classList.add('active');
    buttonEng.classList.remove('active');
});