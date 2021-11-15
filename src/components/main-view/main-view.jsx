import React from 'react';
//importing axios library to fetch movies from database
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";


import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import {RegistrationView} from '../registration-view/registration-view';

import { Navbar, Nav, Container, Row, Col, Image } from 'react-bootstrap';

// #0
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      // movies: [],
      user: null,
    };

    console.log(this);
  }
  
  // ___________BEFORE REDUX________________

  // getMovies(token) {
  //   axios.get('https://glacial-ocean-39750.herokuapp.com/movies', {
  //     headers: { Authorization: `Bearer ${token}`}
  //   })
  //   .then(response => {
  //     // Assigns the result to the state
  //     this.setState({
  //       movies: response.data
  //     });
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

  getMovies(token) {
    axios.get('https://glacial-ocean-39750.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {

      // #4
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  componentDidMount(){
    let accessToken = localStorage.getItem('token');
  
    if (accessToken !== null) {
      this.setState({
        token: accessToken, 
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /* When a user successfully logs in, this function updates the `user`
  property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  

  render() {
    // const { movies, user, showRegistration } = this.state;
    let { movies } = this.props;
    let { user } = this.state;

    // console.log('----> ',user);

    return (


          <Router>
            
          <div className="main-view">
              {/* conditional statement */}
             { (!user) ? 
         <Navbar expand="lg">
                <Container fluid>
                  <Navbar.Brand href="/"><Image className="logo" href="/" src="https://i.ibb.co/N3Lqgzn/logo-transparent-background.png" fluid crossOrigin="true" /></Navbar.Brand>
                  <Nav className="me-auto">
                    <Nav.Link href="/">Movies</Nav.Link>
                    {/* <Nav.Link href="/users/:username">Profile</Nav.Link> */}
                    <Nav.Link href="/register"> Register</Nav.Link>
                    <Nav.Link href="/login"> Login</Nav.Link>
                    {/* <Nav.Link href="#login" onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link> */}
                  </Nav>
                </Container>
              </Navbar> :
              
              <Navbar expand="lg">
              <Container fluid>
                <Navbar.Brand href="/"><Image className="logo" href="/" src="https://i.ibb.co/N3Lqgzn/logo-transparent-background.png" fluid crossOrigin="true" /></Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="/">Movies</Nav.Link>
                  <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
                  {/* <Nav.Link href="/register"> Register</Nav.Link> */}
                  <Nav.Link href="/login" onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
              }
              
              </div>
          
            <div>
              <Container>


                <Row className="justify-content-md-center">

                  <Route exact path="/" render={() => {

                    if (!user) return <Col>
    
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>

                    // Before the movies have been loaded
                    if (movies.length === 0) return (<div className="main-view" />);
                    return  <MoviesList movies={movies} />;

    
                    
                    // movies.map(m => (
                    //   <Col sm={6} md={4} lg={3} key={m._id}>
                    //     <MovieCard buttonAddToFavorites={true} handleAddToFavorites={this.handleAddToFavorites.bind(this)} movie={m} />
                    //   </Col>
                    // ))
                  }} />

                    <Route path="/login" render={() => {
                    if (user) return <Redirect to="/" />
                    return <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
                  }} />

                  <Route path="/register" render={() => {
                    if (user) return <Redirect to="/" />
                    return <Col>
                      <RegistrationView />
                    </Col>
                  }} />

                  <Route path="/users/:username" render={({ history }) => {
                    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

                    if (movies.length === 0) return <div className="main-view"></div>;

                    return <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                  }} />

                  <Route path="/movies/:movieId" render={({ match, history }) => {

                    if (!user) return <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>

                    if (movies.length === 0) return (<div className="main-view" />);
                    return <Col md={8}>
                      <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                    </Col>
                  }} />

                  <Route path="/directors/:name" render={({ match, history }) => {

                    if (!user) return <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>

                    if (movies.length === 0) return <div className="main-view" />;
                    return <Col md={8}>
                      <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                    </Col>
                  }
                  } />

                  <Route path="/genres/:name" render={({ match, history }) => {

                    if (!user) return <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>

                    if (movies.length === 0) return <div className="main-view" />;
                    return <Col md={8}>
                      <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                    </Col>
                  }
                  } />

                </Row>
              </Container>
            </div>
          </Router>  
           
    );

  }

}
// #7
const mapStateToProps = state => {
  return { movies: state.movies }
}

// #8
export default connect(mapStateToProps, { setMovies } )(MainView);