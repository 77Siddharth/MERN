import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download Our App</h4>
        <p>Find Our app for Android and IOS </p>
        <img alt="Andoid App" />
        <img alt="IOS App" />
      </div>
      <div className="midFooter">
        <h4>Round the clock store</h4>
        <p>We are ready to serve you anytime</p>
        <p>Copyright 2021 &copy; Siddharth</p>
      </div>
      <br />
      <div className="rightFooter">
        <h4>Find us on</h4>
        <a href="www.facebook.com">Facebook</a>
        <a href="www.instagram.com">Instagram</a>
        <a href="www.youtube.com">Youtube</a>
      </div>
    </footer>
  );
}

export default Footer;
