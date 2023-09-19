import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Header from "../src/components/layout/Header/Header"
import Footer from './components/layout/Footer/Footer';
import React from 'react';
import WebFont from 'webfontloader';
// import { useEffect } from 'react';
import Home from "./components/Home/Home.jsx";
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products.jsx';
import Search from './components/Product/Search.jsx';


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
        <Route exact path="/product/:id" Component={ProductDetails}/>
        <Route exact path="/products" Component={Products}/>
        <Route exact path="/products/:keyword" Component={Products}/>
        <Route exact path="/search" Component={Search}/>
      </Routes>

      <Footer/>
    </Router>

  );
}

export default App;
