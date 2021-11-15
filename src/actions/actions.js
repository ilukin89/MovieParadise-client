export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const ADD_MOVIE = 'ADD_MOVIE';
export const UPDATE_FAVORITES = 'UPDATE_FAVORITES';

export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  };
}

export function addMovie(value) {
  return {
    type: ADD_MOVIE,
    value
  }
}

export function updateFavorites(favoriteMovies) {
  return {
    type: UPDATE_FAVORITES,
    favoriteMovies
  }
}