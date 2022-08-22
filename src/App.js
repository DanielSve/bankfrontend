import axios from 'axios';
import React from 'react';
import './App.css';

function App() {
  const api = axios.create({
    baseURL: 'http://localhost:8080/',
  });

  const getAllClients = () => api.get('/clients');

  const [users, setUsers] = React.useState([]);

  const getClients = async () => {
    const users2 = await getAllClients();

    setUsers(users2.data);
  };

  React.useEffect(() => {
    getClients();
  }, []);

  return (
    <div className='App'>
      
      {users &&
        users.map((u) => (
          <div key={u.id}>
            <p>{u.firstName}</p>
            <p>{u.email}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
