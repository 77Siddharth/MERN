import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dicxraw4p/image/upload/v1641636065/avatars/pbwjtds9aw2nzksrxfbu.jpg"
              alt="Founder"
            />
            <Typography>Siddharth Agrawal</Typography>
            <Button onClick={() => {}} color="primary">
              Visit Instagram
            </Button>
            <span>This wesbite is made by Siddharth Agrawal</span>
            <span>Credits: Abhishek Singh</span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a href="www.youtube.com">
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="www.instagram.com">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
