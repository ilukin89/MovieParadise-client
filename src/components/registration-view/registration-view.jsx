import React, { useState } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';


import './registration-view.scss';

const Error = (props) => {
  return (<div style={{color:'red'}}>{props.msg}</div>);
};

export class RegistrationView extends React.Component {

  state = {
    username: '',
    usernameErrors:'',
    password: '',
    passwordErrors:'',
    email: '',
    emailErrors:'',
    birthday: ''
  };

  handleSubmit(e){
    e.preventDefault();
    axios.post('https://glacial-ocean-39750.herokuapp.com/users', {
      Username: this.state.username,
      Password: this.state.password,
      Email: this.state.email,
      Birthday: this.state.birthday
    })
    .then(response => {
      const data = response.data;
      console.log('----------->',data);
      window.open('/', '_self'); // '_self' is necessary to open page in the current tab
    })
    .catch((e) => {
      console.log(e.response.data.errors);

      e.response.data.errors.forEach((v)=>{
        const field = v.param.toLowerCase();
        if(field!==''){
          const fieldErrors = field+'Errors';
          let currentErrors = this.state[fieldErrors];
          if(currentErrors !== undefined && currentErrors !== '') {
            currentErrors += ' ; '; // adding a ; to seperate more than 1 error message on the same field.
          }
          let newSetState = {};
          newSetState[fieldErrors] = currentErrors + v.msg;
          this.setState(newSetState);
        }
      })

      // if (username === '' || username === null) {
      //   alert('Username is required');
      // } else if (username.length < 5) {
      //   alert('Username needs to be longer then 5 letters');
      // } else if (password === '' || password === null) {
      //   alert('Password is required');
      // } else if (email.indexOf('@') === -1) {
      //   alert('You need a valid email adress');
      // } else if (birthday === '') {
      //   alert('enter your birthday');
      // }
    });
  }

  render () {
  
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
                        value={this.state.username} 
                        onChange={e => {
                          this.setState({username:e.target.value});
                        }}
                        placeholder="*required field"
                        required
                      />
                      {this.state.usernameErrors && <Error msg={this.state.usernameErrors} />}
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        value={this.state.password} 
                        onChange={e => {
                          this.setState({password:e.target.value});
                        }} 
                        placeholder="*required field"
                        required
                      />
                      {this.state.passwordErrors && <Error msg={this.state.passwordErrors} />}
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                        type="email" 
                        value={this.state.email} 
                        onChange={e => {
                          this.setState({email:e.target.value});
                        }}
                        placeholder="*required field"
                        required
                      />
                      {this.state.emailErrors && <Error msg={this.state.emailErrors} />}
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Birthday</Form.Label>
                      <Form.Control 
                        className="mb-3" 
                        type="date" 
                        value={this.state.birthday} 
                        onChange={e => {
                          this.setState({birthday:e.target.value});
                        }} 
                      />
                    </Form.Group>
                    
                    <Button 
                      className="registerButton" 
                      variant="success" type="submit" 
                      onClick={(e)=>{this.handleSubmit(e)}}>Register
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
}

RegistrationView.propTypes = {register: PropTypes.shape({
  Username: PropTypes.string.isRequired,
  Password: PropTypes.string.isRequired,
  Email: PropTypes.string.isRequired,
  Birthday: PropTypes.string.isRequired
}),
  RegistrationView: PropTypes.func
}