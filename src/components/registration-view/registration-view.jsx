import React, {useState} from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

export function RegistrationView(props){
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://glacial-ocean-39750.herokuapp.com/users', {
            Name: name,
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
        .then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self'); //'_self' is necessary to let the page open in current tab
        })
        .catch( e => {
            console.log('error registering the user')
        })
    };

    return(

      <form>
        <label>
        Name:
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Username:
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        E-mail:
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Birthday:
        <input type="date" placeholder="YYYY-mm-DD" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
        
    );
}