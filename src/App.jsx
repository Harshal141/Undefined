import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import TravelApp from './pages/Landing'

function App() {

  return (
    <Routes>
      <Route path="/" element={<TravelApp />} />
    </Routes>
  );
}

export default App
