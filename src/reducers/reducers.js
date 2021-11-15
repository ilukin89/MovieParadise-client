import {
  combineReducers
} from 'redux';


import {
  SET_FILTER,
  SET_MOVIES,
  ADD_MOVIE,
  UPDATE_FAVORITES
} from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

//trying out add movie to favorites
function addMovie(state = [], action) {
  switch (action.type) {
    case ADD_MOVIE:
      return action.value;
    default:
      return state
  }
}

function favoriteMovies(state = [], action) {
  switch (action.type) {
    case UPDATE_FAVORITES:
      return action.favoriteMovies
    default:
      return state
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  addMovie,
  favoriteMovies
});

export default moviesApp;