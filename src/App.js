
import './App.css';
import Home from './pages/home/Home'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route exact path='/admin/:category?' element={<Dashboard/>}/>
      <Route exact path='/' element={<Home/>}/>
      

     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
