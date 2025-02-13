var nameArr = [];
class getUserData {
  constructor(
    getName,
    getEmail,
    getMobile,
    numberOfSeats,
    day,
    showTime,
    price
  ) {
    this.name = getName;
    this.email = getEmail;
    this.mobile = getMobile;
    this.seats = numberOfSeats;
    this.day = day;
    this.showTime = showTime;
    this.price = price;
  }
}

var getData = () => {
  var getName = document.getElementById("inputName").value;
  var getEmail = document.getElementById("inputEmail").value;
  var getMobile = document.getElementById("inputMobile").value;
  var numberOfSeats = document.getElementById("inputSeats").value;
  var day = document.getElementById("day").value;
  var showTime = document.getElementById("showTime").value;
  if (day === "Today") {
    price = 450 * Number(numberOfSeats);
    var obj = new getUserData(
      getName,
      getEmail,
      getMobile,
      numberOfSeats,
      day,
      showTime,
      price
    );
    nameArr.push(obj);
  }

  if (day === "Day after tomorrow") {
    price = 350 * Number(numberOfSeats);
    var obj = new getUserData(
      getName,
      getEmail,
      getMobile,
      numberOfSeats,
      day,
      showTime,
      price
    );
  }

  if (day === "Tomorrow") {
    price = 550 * Number(numberOfSeats);
    var obj = new getUserData(
      getName,
      getEmail,
      getMobile,
      numberOfSeats,
      day,
      showTime,
      price
    );
  }

  var getName = document.getElementById("inputName").value;
  var dataString = JSON.stringify(obj);
  localStorage.setItem("obj", dataString);
  window.location.href = "paymentRedirect.html";

  console.log(obj);
};

var paymentRedirectPage = () => {
  var headingShow = document.createElement("h2");
  var headingShowParent = document.querySelector("#show");
  headingShow.innerHTML = "Payment Window";
  headingShowParent.appendChild(headingShow);
  headingShow.setAttribute("class", "text-info");
  var newObj = localStorage.getItem("obj");
  var getObj = JSON.parse(newObj);

  var nameShow = document.createElement("h4");
  var nameShowParent = document.querySelector("#show");
  nameShow.innerHTML = "Name" + ": " + getObj.name;
  nameShowParent.appendChild(nameShow);

  var priceShow = document.createElement("h4");
  var priceShowParent = document.querySelector("#show");
  priceShow.innerHTML = "Price" + ": " + getObj.price + " Pesos";
  priceShowParent.appendChild(priceShow);

  var dayShow = document.createElement("h4");
  var dayShowParent = document.querySelector("#show");
  dayShow.innerHTML = "Day" + ": " + getObj.day;
  dayShowParent.appendChild(dayShow);

  var showTimeShow = document.createElement("h4");
  var showTimeShowParent = document.querySelector("#show");
  showTimeShow.innerHTML = "Show" + ": " + getObj.showTime;
  showTimeShowParent.appendChild(showTimeShow);
};

function searchMovies() {
  const movieTitle = document.getElementById("movie-title").value;
  const url = `https://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Log the response for debugging
      const resultsDiv = document.getElementById("movie-results");
      resultsDiv.innerHTML = "";

      if (data.Response === "True") {
        data.Search.forEach((movie) => {
          const movieCard = document.createElement("div");
          movieCard.className = "movie-card";

          const moviePoster =
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/200x300?text=No+Image";
          movieCard.innerHTML = `
              <img src="${moviePoster}" alt="${movie.Title}" />
              <h3>${movie.Title}</h3>
              <p>${movie.Year}</p>
            `;
          resultsDiv.appendChild(movieCard);
        });
      } else {
        resultsDiv.innerHTML = "<p>No movies found.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching movie data:", error);
    });
}
