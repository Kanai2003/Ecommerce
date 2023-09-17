import React, { Fragment } from "react";
import './Homs.css';
import { CgMouse } from "react-icons/cg";
import MetaData from "../layout/MetaData";
// import Product from './ProductCard.jsx';

const Home = () => {
    return (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          {/* <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div> */}
        </Fragment>
    );
};


export default Home;