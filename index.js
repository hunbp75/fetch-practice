function createDom() {
  const appContainer = document.createElement("div");
  appContainer.id = "app-container";

  const input = document.createElement("input");
  input.id = "input";
  input.type = "text";
  input.placeholder = "Type your city";

  const city = document.createElement("h1");
  city.id = "town";

  const temp = document.createElement("h1");
  temp.id = "temporary";

  const humidity = document.createElement("h1");
  humidity.id = "humidity";

  const clouds = document.createElement("h1");
  clouds.id = "clouds";

  const time = document.createElement("h1");
  time.id = "localtime";

  $("#root").append(appContainer);
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
        } else if (temporaryValue < 5) {
          $("body").css(
            "background-image",
            "url(/pexels-james-wheeler-1571442.jpg)"
          );
        } else if (5 < temporaryValue || temporaryValue >= 20) {
          $("body").css(
            "background-image",
            "url(/pexels-stijn-dijkstra-2499793.jpg)"
          );
        }
      })

      .catch((err) => alert("Wrong city name!"));
  });
};

function main() {
  createDom();
  fetchApi();
}

window.addEventListener("load", main);
