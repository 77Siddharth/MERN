import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/myStore.png";

function Header() {
  return (
    <div>
      <ReactNavbar
        burgerColorHover="Grey"
        logo={logo}
        navColor1="white"
        navColor2="white"
        navColor3="rgb(35, 35, 35)"
        navColor4="rgb(35, 35, 35)"
        link1Text="Home"
        link1Url="/"
        link2Text="Product"
        link2Url="/product"
        link3Text="Contact"
        link3Url="/contact"
        link4Text="About"
        link4Url="/about"
        link1Size="1.5vmax"
        link1Margin="0 auto"
        link3Color="white"
        link1AnimationTime="0.4"
        searchIconMargin="1vmax"
        cartIconMargin="2vmax"
        profileIconMargin="1vmax"
      />
    </div>
  );
}

export default Header;
