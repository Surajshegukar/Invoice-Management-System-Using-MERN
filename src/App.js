
import './App.css';
import About from './components/About';
import Customer from './components/Customer';
import Product from './components/Product';
import Home from './components/Home';
import Invoice from './components/Invoice';
import Navbar from './components/Navbar';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
  } from "react-router-dom"
import SystemState from './context/SystemState';


function App() {
  return (
    <>
    <SystemState>
      <Router> 
          <Navbar/> 
          <Routes>
              <Route path = "/" element = {<Home/>} />
              <Route path='/manage/invoice' element={<Invoice/>}/>
              <Route path='/manage/customer' element={<Customer/>}/>
              <Route path='/manage/product' element={<Product/>}/>
              
              <Route path = "/about" element = {<About/>} />
              
          </Routes>
        
      </Router>
    </SystemState>
</>
  );
}

export default App;
