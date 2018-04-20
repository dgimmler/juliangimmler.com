import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import marked from 'marked';
import { fetchAboutMe } from '../../actions/index';
import './AboutMe.css';

class AboutMe extends Component {
    componentWillMount() {
        this.props.fetchAboutMe();
    }

    getMarkdownText(markup) {
        let rawMarkup = marked(markup, {sanitize: true});

        return { __html: rawMarkup };
    }

    render(){
        let body = this.props.aboutMe.body || '';
        return (
            <div id="about-me" className="section about-me col-xs-12">
                <div className="about-me-content col-sm-8 col-sm-offset-2 col-xs-12">
                    <div className="about-me-header col-sm-10 col-sm-offset-1 col-xs-12">
                        <h3>{ this.props.aboutMe.header }</h3>
                        <h3>{ this.props.aboutMe.subHeader }</h3>
                    </div>
                    <span className="divider-line col-xs-10 col-xs-offset-1" />
                    <div className="about-me-details">
                        <p dangerouslySetInnerHTML = { this.getMarkdownText(body) }></p>
                    </div>
                    <div className="about-me-social col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
                        <h4>{ this.props.aboutMe.socialMediaBox }</h4>
                        <Link to="https://instagram.com/jules.gimm/" target="_blank">
                            <span className="fa fa-instagram" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        aboutMe: state.aboutMe.aboutMe
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchAboutMe: fetchAboutMe
        },
        dispatch
    );
}

export default connect(mapStateToProps,matchDispatchToProps)(AboutMe);
