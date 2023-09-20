import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
    const visitInstagram = () => {
        window.location = "https://www.instagram.com/life.hobbies.code/";
    };
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
                            src="https://avatars.githubusercontent.com/u/91842029?v=4"
                            alt="Founder"
                        />
                        <Typography>Kanailal Manna</Typography>
                        <Button onClick={visitInstagram} color="primary">
                            Visit Instagram
                        </Button>
                        <span>
                            This is a sample wesbite. Only with the
                            purpose to learn MERN Stack Development
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Social Account</Typography>
                        <a href="https://www.instagram.com/life.hobbies.code/" target="blank">
                            <InstagramIcon className="instagramSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;