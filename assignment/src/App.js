import './App.css';
import Routers from './Routes/Route';
import Home from './components/Home';
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <Routers>
      <Login/>
      <Home/>
      </Routers>
      
   
 
    </div>
  );
}

export default App;
