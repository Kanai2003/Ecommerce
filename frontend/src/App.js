import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Header from "../src/components/layout/Header/Header"
import Footer from './components/layout/Footer/Footer';
import React from 'react';
import WebFont from 'webfontloader';
import { useEffect } from 'react';
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

      <Route exact path='/' Component={Home}/>

      <Footer/>
    </Router>

  );
}

export default App;
