import './App.css';
import Navbar from './Navbar';
import Showcase from './Showcase';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <Showcase/>
      </header>
    </div>
  );
}

export default App;
