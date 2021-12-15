function createDom() {
  let appContainer = document.createElement("div");
  appContainer.id = "app-container";

  let input = document.createElement("input");
  input.id = "input";
  input.type = "text";
  input.placeholder = "Type your city here";

  let city = document.createElement("h1");
  city.id = "town";

  let temp = document.createElement("h1");
  temp.id = "temporary";

  let humidity = document.createElement("h1");
  humidity.id = "humidity";

  let clouds = document.createElement("h1");
  clouds.id = "clouds";

  $("#root").append(appContainer);
  appContainer.append(input, city, temp, humidity, clouds);
}

function fetchApi() {
  let input = document.querySelector("#input");
  let cityName = document.querySelector("#town");
  let temporary = document.querySelector("#temporary");
  let skyCondition = document.querySelector("#clouds");
  let humidity = document.querySelector("#humidity");

  input.addEventListener("change", function (name) {
    let search = new URLSearchParams();
    search.append("key", "6664ed8bd58945d3b8a194201211412");
    search.append("q", input.value);
    let fetchURL = `https://api.weatherapi.com/v1/current.json?${search.toString()}`;

    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        let nameValue = data.location.name;
        let temporaryValue = data.current.temp_c;
        let skyConditionValue = data.current.condition.text;
        let humidityValue = data.current.humidity;

        cityName.innerHTML = nameValue;
        temporary.innerHTML = "Temporary: " + temporaryValue;
        skyCondition.innerHTML = "Sky condition: " + skyConditionValue;
        humidity.innerHTML = "Humidity: " + humidityValue;

        input.value = "";
      })

      .catch((err) => alert("Wrong city name!"));
  });
}

function main() {
  createDom();
  fetchApi();
}

window.addEventListener("load", main);
