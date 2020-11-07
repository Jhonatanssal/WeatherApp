import './style.scss';

window.addEventListener('load', () => {
  const button = document.getElementById('submit');
  const tempDescription = document.querySelector('.temperature-description');
  const tempDegree = document.querySelector('.temperature-degree');
  const locationTimeZone = document.querySelector('.location-timezone');
  const icon = document.getElementById('icon');
  const container = document.querySelector('.weather-cont');
  container.style.display = 'none';

  button.addEventListener('click', (e) => {
    e.preventDefault();

    const city = document.getElementById('city').value;

    const proxy = 'http://cors-anywhere.herokuapp.com/';

    const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=96167910369f1228a67e094ac8e334b6`;

    fetch(api)
      .then(response => response.json())
      .then(data => {
        const container = document.querySelector('.weather-cont');
        container.style.display = 'block';
        const iconImg = data.weather[0].icon;
        const temperature = data.main.temp;
        const summary = data.weather[0].description;
        tempDescription.textContent = summary.charAt(0).toUpperCase() + summary.slice(1);
        tempDegree.textContent = temperature;
        locationTimeZone.textContent = data.name;
        icon.src = `http://openweathermap.org/img/wn/${iconImg}@2x.png`;
      })
      .catch(data => {
        console.log(data);
        const container = document.querySelector('.weather-cont');
        const errorDiv = document.createElement('h1');
        errorDiv.textContent = 'Please enter a valid city';

        container.appendChild(errorDiv);
      })
  });
});