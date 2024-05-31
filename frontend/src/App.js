// import logo from './logo.svg';
import './App.css';
import Create from './components/Create';
import Navbars from './components/Navbars';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import View from './components/View';
import Edit from './components/Edit';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbars /> 
      <Routes>
        <Route exact path='/' element={<Create />}/>
        <Route exact path='/all' element={<View />}/>
        <Route exact path='/:id' element={<Edit /> }/>
      </Routes>
     </BrowserRouter> 
    </div>
  );
}

export default App;
