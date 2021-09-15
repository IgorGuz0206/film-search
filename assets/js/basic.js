let movieList = null;

const createStyle = () => {
  const style = document.createElement("style");
  style.innerHTML = `
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.container {
  padding: 20px;
  max-width: 1280px;
  margin: 0 auto;
}
.movies {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
.movie {
  display: flex;
  align-content: center;
  justify-content: center;
}
.movie__image {
  width: 100%;
  object-fit: cover;
}

.search {
  margin-bottom: 30px;
}
.search__label-input {
  display: block;
  margin-bottom: 7px;
}
.search__input {
  display: block;
  padding: 10px 15px;
  width: 400px;
  border: 1px solid gray;
  border-radius: 4px;
  margin-bottom: 10px;
}
.search__label-checkbox {
  display: block;
  font-size: 12px;
  margin-top: -17px;
  margin-left: 25px;
}`;

  document.head.append(style);
};

const createSearchBox = (container) => {
  const h1 = document.createElement("h1");
  h1.innerHTML = "Приложение для поиска фильмов";
  container.append(h1);

  const searchBox = document.createElement("div");
  searchBox.setAttribute("class", "search");
  container.append(searchBox);

  const labelForSearch = document.createElement("label");
  labelForSearch.setAttribute("class", "search__label-input");
  labelForSearch.setAttribute("for", "search");
  labelForSearch.innerHTML = "Поиск фильмов";
  searchBox.append(labelForSearch);

  const inputSearch = document.createElement("input");
  inputSearch.setAttribute("class", "search__input");
  inputSearch.setAttribute("type", "text");
  inputSearch.setAttribute("placeholder", "Введите текст");
  inputSearch.setAttribute("id", "search");
  searchBox.append(inputSearch);

  const inputCheckbox = document.createElement("input");
  inputCheckbox.setAttribute("class", "search__checkbox");
  inputCheckbox.setAttribute("id", "checkbox");
  inputCheckbox.setAttribute("type", "checkbox");
  searchBox.append(inputCheckbox);

  const labelForCheckbox = document.createElement("label");
  labelForCheckbox.setAttribute("class", "search__label-checkbox");
  labelForCheckbox.setAttribute("for", "checkbox");
  labelForCheckbox.innerHTML = "Добавить фильмы к существующему списку";
  searchBox.append(labelForCheckbox);
};

const createMarkup = () => {
  const container = document.createElement("div");

  const movies = document.createElement("div");

  createSearchBox(container);

  container.setAttribute("class", "container");
  movies.setAttribute("class", "movies");

  container.append(movies);

  document.body.prepend(container);

  movieList = document.querySelector(".movies");
};

const addMovieToList = (movie) => {
  const item = document.createElement("div");
  const img = document.createElement("img");

  item.classList.add("movie");
  img.classList.add("movie__image");
  img.src = movie.Poster;
  img.alt = movie.Title;
  img.title = movie.Title;

  item.append(img);
  movieList.append(item);
};

createStyle();
createMarkup();

const getData = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.Search);

const search = "Iron Man";

getData(`http://www.omdbapi.com/?s=${search}&apikey=22fb101b`)
  .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
  .catch((err) => console.log(err));
