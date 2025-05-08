// import { useState } from 'react'
import './App.css'
import Home from "./pages/Home"
import Fav from "./pages/Fav"
import NavBar from "./components/NavBar"
import {Routes, Route} from "react-router-dom"

function App() {

  return (
    <div>
    <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />}/>      
          <Route path="/favorites" element={<Fav />}/>      
        </Routes>
      </main>
    </div>
  )
};

export default App;