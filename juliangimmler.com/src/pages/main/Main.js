import React, { Component } from 'react';
import Carousel from '../../containers/carousel/carousel';
import AboutMe from '../about-me/AboutMe';
import Resume from '../resume/Resume';
import Blog from '../blog/Blog';
import Media from '../media/Media';
import './Main.css';

class Main extends Component {
    render(){
        return (
            <div className="home" onClick="">
                <div className="section main col-sm-12" id="main">
                    <Carousel />
                </div>
                <AboutMe />
                <Resume />
                <Blog />
                <Media />
            </div>
        );
    }
}

export default Main;
