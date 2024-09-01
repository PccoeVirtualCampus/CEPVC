import React, { useState } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import './App.css';  // Import a CSS file for styling
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from "./components/Admin/Admin"
import Footer from './components/Footer/Footer';
import Floor from './components/Floor/Floor';

function Home(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Footer/>}></Route>  
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/floor' element={<Floor/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Home