import React from "react";
import playStore from "../../../images/appImages/playStore.png";
import appStore from "../../../images/appImages/appStore.png";
import "./Footer.css";

const Footer = () => {
    return (
        <footer id= "footer">

            <div class= "leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and ios mobile phone</p>
               <img src={playStore} alt="playStore" />
                <img src={appStore} alt="appStore" />
            </div>

            <div class= "midFooter">
                <h1>ECOMMERCE</h1>
                <p>Shop With Ease!</p>
                <p> High quality is our first priority</p>
            </div>

            <div class= "rightFooter">
                <h4>Follow Us</h4>
                <a href="https://github.com/kanailalmanna">GitHub</a>
            </div>

        </footer>
    );
};




export default Footer;
