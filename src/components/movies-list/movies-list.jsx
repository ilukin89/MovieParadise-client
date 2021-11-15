import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import useToken from '../../hooks/useToken';
import { useDispatch, useSelector } from 'react-redux';
import { updateFavorites } from '../../actions/actions';

const selectFavoriteMovies = state => state.favoriteMovies
const selectVisibilityFilter = state => state.visibilityFilter

function MoviesList(props) {
  const { movies } = props;
  let filteredMovies = movies;

  const { token, user } = useToken()
  const dispatch = useDispatch()
  const favoriteMovies = useSelector(selectFavoriteMovies)
  const visibilityFilter = useSelector(selectVisibilityFilter)

  const handleAddToFavorites = async (movieId) => {
    const url = `https://glacial-ocean-39750.herokuapp.com/users/${user}/movies/${movieId}`; 

    await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.FavoriteMovies)
      dispatch(updateFavorites(data.FavoriteMovies))
    })
    .catch(e => {
      console.log('ERROR:',e);
    });
  }

  const handleRemoveFromFavorites = async (movieId) => {
    const url = `https://glacial-ocean-39750.herokuapp.com/users/${user}/movies/${movieId}`; 

    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.FavoriteMovies)
      dispatch(updateFavorites(data.FavoriteMovies))
    })
    .catch(e => {
      console.log('ERROR:',e);
    });
  }
  

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view"/>;

  return <>
    <Col md={12} style={{ margin: '1em' }}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>
    {filteredMovies.map(m => (
      <Col md={3} key={m._id}>
        {/* <MovieCard movie={m} /> */}
        <MovieCard isFavorite={favoriteMovies.includes(m._id)} handleRemoveFavorite={handleRemoveFromFavorites} buttonAddToFavorites={true} handleAddToFavorites={handleAddToFavorites} movie={m} />
      </Col>

    ))}
  </>;
}
// optional chaining
// const favoriteMovies = null
// await fechMoviesFromServer()
// favoriteMovies = theMoviesWefetchedFromServer
// [1,3, 4, ..]

// if(favoriteMovies && favoriteMovies.data && favoriteMovies.data.length) favoriteMovies?.data?.map..


export default MoviesList;
