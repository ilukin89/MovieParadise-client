import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardGroup, Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './movie-card.scss';


export class MovieCard extends React.Component {

  render() {
    const { movie, isFavorite } = this.props;

    const buttonAddToFavorites = this.props.buttonAddToFavorites || false;

    return (
      <Container className="movieContainer">
        <Row>
          <Col>
            <CardGroup>
              <Card className="movieCard" >
                <Card.Img className="cardImage" variant="top" src={movie.ImagePath} crossOrigin="true" />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Genre.Name}</Card.Text>
                  <Card.Text>{movie.Description}</Card.Text>
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">Open</Button>
                  </Link>
                  {!isFavorite && <Button variant="link" onClick={()=>{this.props.handleAddToFavorites(movie._id)}}>Add to Favorites</Button>}
                  {isFavorite && <Button variant="link" onClick={()=>{this.props.handleRemoveFavorite(movie._id)}}>Remove from Favorites</Button>}
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    })
  }).isRequired,
};

