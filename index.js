function createDom() {
  const appContainer = document.createElement("div");
  appContainer.id = "app-container";

  const autoComplete = document.createElement("div");
  autoComplete.id = "auto";

  const input = document.createElement("input");
  input.id = "input";
  input.className = "input-class";
  input.type = "text";
  input.placeholder = "Type your city";
  input.autocomplete = "on";

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
  appContainer.append(autoComplete, time, city, temp, humidity, clouds);
  autoComplete.append(input);
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

function auto() {
  let countries = ["Budapest", "London", "Miami"];

  function autocomplete(inp, arr) {
    var currentFocus;

    inp.addEventListener("input", function (e) {
      var a,
        b,
        i,
        val = this.value;

      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;

      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");

      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");

          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);

          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

          b.addEventListener("click", function (e) {
            inp.value = this.getElementsByTagName("input")[0].value;

            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });

    inp.addEventListener("keydown", function (e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;

        addActive(x);
      } else if (e.keyCode == 38) {
        currentFocus--;

        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
    });
    function addActive(x) {
      if (!x) return false;

      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;

      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }

    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }
  const szoveg = document.getElementById("input");
  autocomplete(szoveg, countries);
}

function main() {
  createDom();
  fetchApi();
  auto();
}

window.addEventListener("load", main);
