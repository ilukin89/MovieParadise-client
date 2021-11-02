import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col, Image } from 'react-bootstrap';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const { handleRegister } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
    
  };

  

  return (
    <Container fluid className="loginContainer" >

      <Navbar bg="navColor" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">Movie Paradise</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#logout">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    
      <Card className="loginCard">
        <Card.Body>
          <Card.Title className="text-center"><Image className="logo" src="https://i.ibb.co/wzs1GVV/Slika-zaslona-2021-11-01-u-16-03-09.png" fluid /> </Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-center">Don't have account? Register</Card.Subtitle>

    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button className="loginButton" variant="secondary" size="lg" type="submit" onClick={handleSubmit}>
        Log In
      </Button>

    
     
    </Form>
    </Card.Body>
    </Card></Container>
  );
}