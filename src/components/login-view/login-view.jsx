import React, { useState } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';


import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://glacial-ocean-39750.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      if (username === '' || username === null) {
        alert('Username is required');
      } else if (username.length < 5) {
        alert('Username needs to be longer then 5 letters');
      } else if (password === '' || password === null) {
        alert('Password is required');
      } else if (username !== username.data) {
        alert('Wrong username or password');
      }
    });
};

  return (
    <Container className="loginContainer" >
    
      <Card className="loginCard">
        <Card.Body>
          <Card.Title className="text-center">Welcome to Movie Paradise</Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-center">Please Login</Card.Subtitle>
      
          <Form >
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="*required field"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                className="mb-3" 
                type="password" 
                value={password}
                placeholder="*required field"
                onChange={e => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="loginButton" variant="secondary" type="submit" onClick={handleSubmit}>
              Login
            </Button>
            
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
    
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
