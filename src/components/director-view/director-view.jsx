import React from 'react';
import PropTypes from 'prop-types';

import './director-view.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';

export class DirectorView extends React.Component {
  render() {

    const { director, onBackClick } = this.props;

    return (
      <Container className="directorContainer">
        <Row>
          <Col>
            <div className="director-view">
              <div className="director-name">
                <span className="title">Name: </span>
                <span className="value">{director.Name}</span>
              </div>

              <div className="director-bio">
                <span className="title">Bio: </span>
                <span className="value">{director.Bio}</span>
              </div>

              <div className="director-birth">
                <span className="title">Birth Year: </span>
                <span className="value">{director.Birth}</span>
              </div>

              <div className="director-button-div">
                <Button className="director-button mt-3" variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
              </div>
              
            </div>
          </Col>
        </Row>
      </Container >
    );
  }
}

DirectorView.propTypes = {
  movie: PropTypes.shape({
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.number.isRequired
    }).isRequired,
  })
};