function createDom() {
  const root = document.getElementById("root");

  const appContainer = document.createElement("div");
  appContainer.id = "app-container";

  const input = document.createElement("input");
  input.id = "input";
  input.className = "input-class";
  input.type = "text";
  input.placeholder = "Type your city";
  input.autocomplete = "on";

  const city = document.createElement("h2");
  city.id = "town";

  const temp = document.createElement("h2");
  temp.id = "temporary";

  const humidity = document.createElement("h2");
  humidity.id = "humidity";

  const clouds = document.createElement("h2");
  clouds.id = "clouds";

  const time = document.createElement("h2");
  time.id = "localtime";

  root.append(appContainer);
  appContainer.append(input, time, city, temp, humidity, clouds);
}

const fetchApi = () => {
  const input = document.querySelector("#input");
  const cityName = document.querySelector("#town");
  const temporary = document.querySelector("#temporary");
  const skyCondition = document.querySelector("#clouds");
  const humidity = document.querySelector("#humidity");
  const localTime = document.querySelector("#localtime");

  input.addEventListener("change", function (name) {
    const search = new URLSearchParams();
    search.append("key", "6664ed8bd58945d3b8a194201211412");
    search.append("q", input.value);
    const fetchURL = `https://api.weatherapi.com/v1/current.json?${search.toString()}`;

    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        const nameValue = data.location.name;
        const countryValue = data.location.country;
        const temporaryValue = data.current.temp_c;
        const skyConditionValue = data.current.condition.text;
        const humidityValue = data.current.humidity;
        const localtimeValue = data.location.localtime;

        localTime.innerHTML = "Date: " + localtimeValue;
        cityName.innerHTML = nameValue + " , " + countryValue;
        temporary.innerHTML = "Temporary: " + temporaryValue + " " + "℃";
        skyCondition.innerHTML = "Sky condition: " + skyConditionValue;
        humidity.innerHTML = "Humidity: " + humidityValue + " " + "%";

        input.value = "";

        if (
          skyConditionValue === "sunny" ||
          ("partly cloudly" && temporaryValue > 20)
        ) {
          $("body").css(
            "background-image",
            "url(/pexels-brett-sayles-912364.jpg)"
          );
        } else if (temporaryValue < 5 && temporaryValue > 0) {
          $("body").css(
            "background-image",
            "url(/pexels-anton-belitskiy-10556555.jpg)"
          );
        } else if (5 < temporaryValue && temporaryValue <= 10) {
          $("body").css("background-image", "url(/pexels-pixabay-33109.jpg)");
        } else if (10 < temporaryValue && temporaryValue <= 20) {
          $("body").css("background-image", "url(/pexels-pixabay-35857.jpg)");
        } else if (temporaryValue < -1) {
          $("body").css(
            "background-image",
            "url(/pexels-james-wheeler-1571442.jpg)"
          );
        }
      })

      .catch((err) => alert("Wrong city name!"));
  });
};

function autocomplete() {
  let input = document.getElementById("input");
  const autocomplete = new google.maps.places.Autocomplete(input);
}

function main() {
  createDom();
  fetchApi();
  autocomplete();
}

window.addEventListener("load", main);
