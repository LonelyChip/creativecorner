import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Explore } from './pages/Explore';
import { Navbar } from './pages/navbar/Navbar';
import { Header } from './pages/header/Header';


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/explore" element={<Explore/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
