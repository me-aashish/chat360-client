import logo from './logo.svg';
import './App.css';
import FilterLogComponent from './components/FilterLogComponent';
import MultiFilterLogComponent from './components/MultipleFilterLogComponent';



function App() {
  return (
    <div className="App">
      <FilterLogComponent />
      <MultiFilterLogComponent />
    </div>
  );
}

export default App;
