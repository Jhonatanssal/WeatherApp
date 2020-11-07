import './style.scss';

window.addEventListener('load', () => {
  let long;
  let tempDescription = document.querySelector('.temperature-description');
  let tempDegree = document.querySelector('.temperature-degree');
  let locationTimeZone = document.querySelector('.location-timezone');
  let icon = document.getElementById('icon');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = 'medellin';

      const proxy = 'http://cors-anywhere.herokuapp.com/'

      const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?q=${long}&units=metric&appid=96167910369f1228a67e094ac8e334b6`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const iconImg = data.weather[0].icon;
          const temperature = data.main.temp;
          const summary = data.weather[0].description;
          console.log(data);
          tempDescription.textContent = summary.charAt(0).toUpperCase() + summary.slice(1);
          tempDegree.textContent = temperature;
          locationTimeZone.textContent = data.name;
          icon.src = `http://openweathermap.org/img/wn/${iconImg}@2x.png`
        })
    });
  }
});