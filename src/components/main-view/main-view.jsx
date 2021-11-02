import React from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import {RegistrationView} from '../registration-view/registration-view';
import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';


export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
        // { _id: 1, Title: 'Inception', Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg'},
        // { _id: 2, Title: 'Joker', Description: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society.', ImagePath: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg'},
        // { _id: 3, Title: 'Django Unchained', Description: 'In 1868 Texas, brothers Ace and Dicky Speck drive a group of shackled black slaves on foot. Among them is Django, sold off and separated from his wife, a house slave who speaks German and English. They are stopped by Dr. King Schultz, a German dentist, now bounty hunter, seeking to buy Django for his knowledge of the three outlaw Brittle brothers.', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_FMjpg_UX1000_.jpg'}
      ],
      selectedMovie: null,
      user: null,
      showRegistration: false
    };
  }


  

  componentDidMount(){
    axios.get('https://glacial-ocean-39750.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    console.log(user)
    this.setState({
      user, 
      showRegistration: false
    }, ()=>{console.log(user)});
  }

  onRegistered(user) {
    this.setState({showRegistration: false})
  }

   // Handler to navigate from LoginView to RegistrationView
   handleRegister = () => {
    this.setState({
      showRegistration: true
    });
  };



  render() {
    
    const { movies, selectedMovie, user, showRegistration } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (showRegistration) {return <div><RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />
    <Button className="loginButton" variant="primary" size="lg" type="submit" onClick={()=>this.setState({showRegistration: !this.state.showRegistration})}>Log In</Button></div>}
    if (!user && !showRegistration) return <div><LoginView onLoggedIn={user => this.onLoggedIn(user)} />
<Button className="loginButton" variant="primary" size="lg" type="submit" onClick={()=>this.setState({showRegistration: !this.state.showRegistration})}>Register</Button></div>
    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Navbar bg="navColor" variant="dark" expand="lg">
                <Container fluid>
                  <Navbar.Brand href="#home">Movie Paradise</Navbar.Brand>
                  <Nav className="me-auto">
                    <Nav.Link href="#home">Movies</Nav.Link>
                    <Nav.Link href="#user">Profile</Nav.Link>
                    <Nav.Link href="#logout">Logout</Nav.Link>
                  </Nav>
                </Container>
              </Navbar> 
              <div>
                <Container>
        
        {selectedMovie
          ? (
            <Row className="justify-content-lg-center">
              <Col lg={9}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            </Row>
          )
          : (
            <Row className="justify-content-lg-center">
              {movies.map(movie => (
                <Col lg={3} md={4} sm={6}>
                  <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                </Col>
              ))}
            </Row>
          )
        }
        </Container>
      </div></div>
    );
  }
}
export default MainView;