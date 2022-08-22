import axios from 'axios';
import './App.css';

function App() {
  const api = axios.create({
    baseURL:"http://localhost:8080/"
  });

  const getAllClients = () => api.get("/clients")

  let users = []

  const printClients = async () => {
    users = await getAllClients();
    console.log(users.data);
  }

  printClients();


  return (
    <div className="App">
      <p>hej</p>
      {users && users.map((u) => (<div id={u.id}>hej{u.id}</div>))}
    </div>
  );
}

export default App;
