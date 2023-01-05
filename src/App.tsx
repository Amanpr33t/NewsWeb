import React from 'react';
import './App.css';
import Navbar from './Components/Navbar'
import Alert from './Components/Alert';
import Loading from './Components/Loading';
import Body from './Components/Body';
import Footer from './Components/Footer';
import LoginForm from './Components/LoginForm';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { HideDropdownActions } from './store/slices/Dropdown-hide-slice';
import { useDispatch } from 'react-redux';



function App() {
  
  return (
    <div className='App'>
     <Navbar/>
      <Alert/>
      <Loading/>
      <Body/>
      <Footer/>
    </div>
  );
}

export default App;
