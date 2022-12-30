import React from 'react';
import './App.css';
import Navbar from './Components/Navbar'
import Alert from './Components/Alert';
import Loading from './Components/Loading';
import Body from './Components/Body';
import Footer from './Components/Footer';

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
