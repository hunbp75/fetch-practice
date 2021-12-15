let input = document.querySelector(".input_text");
let main = document.querySelector("#name");
let temporary = document.querySelector(".temporary");
let skyCondition = document.querySelector(".skyCondition");
let humidity = document.querySelector(".humidity");
let button = document.querySelector(".submit");

function createDom() {}

button.addEventListener("click", function (name) {
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

      main.innerHTML = nameValue;
      temporary.innerHTML = "Temporary: " + temporaryValue;
      skyCondition.innerHTML = "Sky condition: " + skyConditionValue;
      humidity.innerHTML = "Humidity: " + humidityValue;

      input.value = "";
    })

    .catch((err) => alert("Wrong city name!"));
});
