import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Header from "../src/components/layout/Header/Header"
import Footer from './components/layout/Footer/Footer';
import React from 'react';
import WebFont from 'webfontloader';
// import { useEffect } from 'react';
import Home from "./components/Home/Home.jsx";



function App() {

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);



  return (
    <Router>
      
      <Header/>     {/*need to add icons*/}

      <Routes>
        
        <Route exact path='/' Component={Home}/>
      </Routes>

      <Footer/>
    </Router>

  );
}

export default App;
