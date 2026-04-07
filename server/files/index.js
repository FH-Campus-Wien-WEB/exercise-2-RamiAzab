window.onload = function () {
  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const bodyElement = document.querySelector("body");

    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);

      movies.forEach(movie => {
        const article = document.createElement("article");

        const title = document.createElement("h2");
        title.textContent = movie.Title;

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("movie-content");

        const img = document.createElement("img");
        img.src = movie.Poster;

        const textDiv = document.createElement("div");

        const plot = document.createElement("p");
        plot.textContent = movie.Plot;

        const info = document.createElement("p");
        info.textContent = "Released: " + movie.Released + " | Runtime: " + movie.Runtime + " min | Rating: " + movie.imdbRating;

        const genres = document.createElement("div");
        movie.Genres.forEach(g => {
          const span = document.createElement("span");
          span.textContent = g;
          span.classList.add("genre");
          genres.appendChild(span);
        });

        const actors = document.createElement("p");
        actors.textContent = "Actors: " + movie.Actors.join(", ");

        const directors = document.createElement("p");
        directors.textContent = "Directors: " + movie.Directors.join(", ");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => {
          location.href = "edit.html?imdbID=" + movie.imdbID;
        };

        textDiv.appendChild(plot);
        textDiv.appendChild(info);
        textDiv.appendChild(genres);
        textDiv.appendChild(actors);
        textDiv.appendChild(directors);
        textDiv.appendChild(editBtn);

        contentDiv.appendChild(img);
        contentDiv.appendChild(textDiv);

        article.appendChild(title);
        article.appendChild(contentDiv);

        bodyElement.appendChild(article);
      });

    } else {
      bodyElement.append("Error " + xhr.status);
    }
  };

  xhr.open("GET", "/movies");
  xhr.send();
};