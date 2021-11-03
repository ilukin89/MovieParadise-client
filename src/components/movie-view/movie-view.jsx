import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import './movie-view.scss';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

  

  render() {
    const { movie, onBackClick } = this.props;

    return (

      
    
      <Container fluid className="moviesContainer">

        
        <Row>
          <Col className="d-flex flex-column">
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
        <Button variant="secondary" size="lg" onClick={() => {onBackClick(null); 
          }}>Back</Button>
       </div>
       </Col>
        </Row>
        
       </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    
  }).isRequired, 
  onBackClick: PropTypes.func.isRequired
}