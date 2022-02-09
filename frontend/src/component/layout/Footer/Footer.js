import React from "react";
import androidIcon from "../../../images/1.png";
import iosIcon from "../../../images/2.png";

import "./Footer.css";
function Footer() {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <p>Find Our app for Android and IOS </p>
        <img alt="Andoid App" src={androidIcon} />
        <img alt="IOS App" src={iosIcon} />
      </div>
      <div className="midFooter">
        <h4>Round the clock store</h4>
        <p>We are ready to serve you anytime</p>
        <p>Copyright 2021 &copy; Siddharth</p>
      </div>
      <br />
      <div className="rightFooter">
        <h4>Find us on</h4>
        <a href="#">Facebook</a>
        <a href="#">Instagram</a>
        <a href="#">Youtube</a>
      </div>
    </footer>
  );
}

export default Footer;
