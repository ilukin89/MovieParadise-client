import React, { useState } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';


import './registration-view.scss';

export function RegistrationView (props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ Birthday, setBirthday] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://glacial-ocean-39750.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: Birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // '_self' is necessary to open page in the current tab
    })
    .catch(e => {
      if (username === '' || username === null) {
        alert('Username is required');
      } else if (username.length < 5) {
        alert('Username needs to be longer then 5 letters');
      } else if (password === '' || password === null) {
        alert('Password is required');
      } else if (email.indexOf('@') === -1) {
        alert('You need a valid email adress');
      } else if (birthday === '') {
        alert('enter your birthday');
      }
    });
};

  return (
 

    <Container  className="registerContainer" >
  
     
      <Row>
        <Col>
          <CardGroup>
            <Card className="registerCard">
              <Card.Body>
                <Card.Title className="text-center">Welcome to Movie Paradise</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">Please Register</Card.Subtitle>
            
                <Form>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={username} 
                      onChange={e => setUsername(e.target.value)} 
                      placeholder="*required field"
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                      <Form.Control 
                      type="password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      placeholder="*required field"
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      placeholder="*required field"
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control 
                      className="mb-3" 
                      type="date" 
                      value={Birthday} 
                      onChange={e => setBirthday(e.target.value)} 
                    />
                  </Form.Group>
                  
                  <Button 
                    className="registerButton" 
                    variant="success" type="submit" 
                    onClick={handleSubmit}>Register
                  </Button>
                  
                </Form>
              </Card.Body>
            </Card>
        </CardGroup>
        </Col>
      </Row>
    </Container>

  );
}

RegistrationView.propTypes = {register: PropTypes.shape({
  Username: PropTypes.string.isRequired,
  Password: PropTypes.string.isRequired,
  Email: PropTypes.string.isRequired,
  Birthday: PropTypes.string.isRequired
}),
  RegistrationView: PropTypes.func
}

