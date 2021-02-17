window.addEventListener("load", () => {
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationCityName = document.querySelector(".location-cityname");

  const api = `http://api.weatherapi.com/v1/current.json?q=berlin`;

  fetch(api, {
    headers: {
      key: "2cc4297c1dec4d0d950175203211602",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const { condition, temp_c } = data.current;
      temperatureDegree.textContent = temp_c;
      temperatureDescription.textContent = condition.text;
      setIcons(condition.code);
      const {country, name} = data.location;
      locationCityName.textContent = `City: ${name}, ${country}`;
    }); 
});

function setIcons(iconCode) {
  var skycons = new Skycons({ color: "white" });
  skycons.add(document.getElementById("icon2"), getMappedIcon(iconCode));
  skycons.play();
}

function getMappedIcon(iconCode) {
  switch (iconCode) {
    case 1135:
      return Skycons.FOG;
    case 1000:
    case 1030:
      return Skycons.CLEAR_DAY;
    case 1003:
      return Skycons.PARTLY_CLOUDY_DAY;
    case 1009:
    case 1183:
      return Skycons.RAIN;
    default:
      return undefined;
  }
}


