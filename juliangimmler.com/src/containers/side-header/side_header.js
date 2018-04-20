import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HashLink as Link } from 'react-router-hash-link';
import {
    togglePaperResume,
    toggleContactForm,
    toggleSideHeader
} from '../../actions/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './side_header.css';

class SideHeader extends Component {
    handleClick(show){
        this.props.toggleSideHeader(show);
    }

    render(){
        let show = this.props.sideHeader.show;
        let touch = this.props.sideHeader.touch;
        let minimizedClass = touch ? " minimize" : "";
        let expandedClass = show ? " expand" : minimizedClass;
        let showRightClass = show ? " hidden" : "";
        let showLeftClass = show ? "" : " hidden";

        return (
            <div className={ "side-header" + expandedClass} onTouchStart={ () => this.handleClick(show) } >
                <div className="header-menu">
                    <ul className="scroll-menu">
                        <li>
                            <Link to="#main">
                                <span>home</span>
                                <span className="arrow-left"></span>
                            </Link>
                        </li>

                        <li>
                            <Link to="#about-me">
                                <span>about me</span>
                                <span className="arrow-left"></span>
                            </Link>
                        </li>

                        <li>
                            <Link to="#resume">
                                <span>resume</span>
                                <span className="arrow-left"></span>
                            </Link>
                        </li>

                        <li>
                            <Link to="#news">
                                <span>news</span>
                                <span className="arrow-left"></span>
                            </Link>
                        </li>

                        <li>
                            <Link to="#gallery">
                                <span>gallery</span>
                                <span className="arrow-left"></span>
                            </Link>
                        </li>
                    </ul>

                    <ul className="page-menu">
                        <li onClick={ () => this.props.togglePaperResume(
                            this.props.showPaperResume
                        )} >
                            <div className="pop-up-btn">
                                <span className="btn">paper resume</span>
                            </div>
                        </li>

                        <li onClick={ () => this.props.toggleContactForm(false) } >
                            <div className="pop-up-btn">
                                <span className="btn">get in touch</span>
                            </div>
                        </li>
                    </ul>
                </div>

                <span>
                    <i className={ "fa fa-chevron-right" + showRightClass }></i>
                </span>

                <span>
                    <i className={ "fa fa-chevron-left" + showLeftClass }></i>
                </span>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        showPaperResume: state.showPaperResume.show,
        contactForm: state.contactForm,
        sideHeader: state.sideHeader
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            togglePaperResume: togglePaperResume,
            toggleContactForm: toggleContactForm,
            toggleSideHeader: toggleSideHeader
        },
        dispatch
    );
}

export default connect(mapStateToProps,matchDispatchToProps)(SideHeader);
