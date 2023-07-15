import './App.css';
import Register from './Register';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Login';
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
       < Route path = "/register" element={<Register/>}/>
       < Route path = "/dashboard" element={<h1>dashboard</h1>}/>
        < Route path = "/login" element={<Login /> } />
        < Route path = "/" element={(<center><h1>home page</h1></center>)} />
      </Routes>
      </BrowserRouter>
        
    </div>
      
  );
}

export default App; 
