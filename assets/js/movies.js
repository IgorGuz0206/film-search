import {
  addMovieToList,
  clearMovieMarkup,
  createMarkup,
  createStyle,
  inputSearch,
  movieList,
  triggerMode
} from './dom.js';

let siteUrl = null;
let searchLast = null;

const debounce = (() => {
  let timer = null;

  return (cb, ms) => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(cb, ms);
  };
})();

const getData = (url) => fetch(url)
  .then((res) => res.json())
  .then((json) => {
    if (!json || !json.Search) throw Error('Вернулся неправильный обьект');
    return json.Search;
  });

const inputSearchHandler = (e) => {

  debounce(() => {
    const searchString = e.target.value.trim();
    if (searchString && searchString.length > 3 && searchString !== searchLast) {
      if (!triggerMode) clearMovieMarkup();
      getData(`${siteUrl}?s=${searchString}&apikey=22fb101b`)
        .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
        .catch((err) => console.log(err));
    }
    searchLast = searchString
  }, 1000);
};

export const appInit = (url) => {
  createStyle();
  createMarkup();
  siteUrl = 'http://www.omdbapi.com/';
  inputSearch.addEventListener('keyup', inputSearchHandler);

};