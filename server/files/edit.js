function setMovie(movie) {
  for (const element of document.forms[0].elements) {
    const name = element.id;
    const value = movie[name];

    if (!name) continue;

    if (name === "Genres") {
      const options = element.options;
      for (let i = 0; i < options.length; i++) {
        const option = options[i];
        option.selected = value.includes(option.value);
      }
    } else if (
        name === "Actors" ||
        name === "Directors" ||
        name === "Writers"
    ) {
      element.value = value.join(", ");
    } else {
      element.value = value;
    }
  }
}

function getMovie() {
  const movie = {};

  const elements = Array.from(document.forms[0].elements).filter(
      (el) => el.id
  );

  for (const element of elements) {
    const name = element.id;
    let value;

    if (name === "Genres") {
      value = Array.from(element.selectedOptions).map(
          (option) => option.value
      );
    } else if (
        name === "Metascore" ||
        name === "Runtime" ||
        name === "imdbRating"
    ) {
      value = Number(element.value);
    } else if (
        name === "Actors" ||
        name === "Directors" ||
        name === "Writers"
    ) {
      value = element.value.split(",").map((item) => item.trim());
    } else {
      value = element.value;
    }

    movie[name] = value;
  }

  return movie;
}

function putMovie() {
  const movie = getMovie();

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", "/movies/" + movie.imdbID);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    if (xhr.status === 200 || xhr.status === 201) {
      location.href = "index.html";
    } else {
      alert("Saving failed: " + xhr.status);
    }
  };

  xhr.send(JSON.stringify(movie));
}

// LOAD MOVIE
const imdbID = new URLSearchParams(window.location.search).get("imdbID");

const xhr = new XMLHttpRequest();
xhr.open("GET", "/movies/" + imdbID);

xhr.onload = function () {
  if (xhr.status === 200) {
    const movie = JSON.parse(xhr.responseText);
    setMovie(movie);
  } else {
    alert("Loading failed: " + xhr.status);
  }
};

xhr.send();