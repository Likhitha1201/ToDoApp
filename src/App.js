import './App.css';
import AddList from './AddList';
import {useEffect} from "react";

function App() {
  useEffect(() => {
    document.title = "MyToDoApp";
  },[])

  return (
    <div className="App">
      <AddList />
    </div>
  );
}

export default App;
