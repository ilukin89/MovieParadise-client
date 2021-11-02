import React from 'react';
import { Container, Row, Col, Button, Navbar } from 'react-bootstrap';

export class MovieView extends React.Component {

  

  render() {
    const { movie, onBackClick } = this.props;

    return (
    
      <Container fluid className="moviesContainer">
        <Row>
          <Col>
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} crossOrigin="true" />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
       </div>
       </Col>
        </Row>
        
       </Container>
    );
  }
}