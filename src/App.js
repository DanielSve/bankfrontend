import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const api = axios.create({
    baseURL: 'http://localhost:8080/',
  });


  const getAllClients = () => api.get('/clients');

  const post = async (user) => {
    const response = await axios.post(
      'http://localhost:8080/clients/add',
      user,
      {
        headers: {
          Authorization: '',
        },
      }
    );
    return response;
  };

  const remove = async (id) => {
    const response = await api.delete(`/clients/delete/${id}`, {
      headers: {
        Authorization: '',
      },
    });
    return response;
  }

  const addClientToDatabase = async (user) =>
    await api.post('clients/add', user, {
      headers: {
        Authorization: '',
      },
    });

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const getClients = async () => {
    const usersFromDB = await getAllClients();
    setUsers(usersFromDB.data);
  };

  useEffect(() => {
    getClients();
  }, []);

  const addClient = async (e) => {
    e.preventDefault();
    if (
      newUser.firstName &&
      newUser.lastName &&
      newUser.email &&
      newUser.email.includes('@')
    ) {
      try {
        const response = await post(newUser);
        setMessage('Registration successful!');
        setNewUser({
          firstName: '',
          lastName: '',
          email: '',
        });
      } catch (error) {
        setMessage('Incorrect information, please try again');
        console.log(error);
      }
    } else {
      setMessage('Incorrect information, please try again');
    }
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const deleteClient = async (id) => {
    console.log(id);
    const response = await remove(id);
    console.log(response);
  };

  const updateClient = async (id) => {

  };

  console.log(newUser);

  return (
    <div className='App'>
      <h1>Bank App</h1>

      <h3>Add client</h3>
      <form>
        <label>First name </label>
        <input
          name='firstName'
          value={newUser.firstName}
          onChange={handleChange}
        ></input>
        <br></br>
        <label>Last name </label>
        <input
          name='lastName'
          value={newUser.lastName}
          onChange={handleChange}
        ></input>
        <br></br>
        <label>Email </label>
        <input
          name='email'
          value={newUser.email}
          onChange={handleChange}
        ></input>
        <br></br>
        <input type='submit' value='Submit' onClick={addClient}></input>
      </form>
      {message && (
        <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>
          {message}
        </p>
      )}

      <h3>Clients</h3>
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => deleteClient(user.id)}>Remove</button>
                </td>
                <td>
                  <button onClick={() => updateClient(user.id)}>Update</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
