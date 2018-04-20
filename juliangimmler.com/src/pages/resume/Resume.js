import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import marked from 'marked';
import { fetchResumeItems, togglePaperResume } from '../../actions/index';
import Document from '../../containers/document/document.js';
import './Resume.css';

class Resume extends Component {
    componentWillMount() {
        this.props.fetchResumeItems();
        this.props.togglePaperResume(true);
    }

    renderResumeItems(){
        if(!this.props.resumeItems)
            return '';

        if(this.props.resumeItems.length > 0){
            return this.props.resumeItems.map((item) => {
                let fields = item.fields;
                let order = fields.order;
                let even = true;
                let image = fields.image;
                let classNameDyn = '';
                let imageUrl = '';

                if(fields.title)
                    classNameDyn = fields.title.split(' ')[0].toLowerCase();

                if(order < 0)
                    return ''

                if(order > 0){
                    if(order % 2 !== 0)
                        even = false;
                }

                if(image){
                    imageUrl = image.fields.file.url
                }

                if(even){
                    return (
                        <ExperienceItemRight
                            classNameDyn={ classNameDyn }
                            header={ fields.title }
                            content={ fields.body }
                            img={ imageUrl }
                            key={ fields.image.sys.id } />
                    )
                } else {
                    return (
                        <ExperienceItemLeft
                            classNameDyn={ classNameDyn }
                            header={ fields.title }
                            content={ fields.body }
                            img={ imageUrl }
                            key={ fields.image.sys.id } />
                    )
                }
            });
        }
    }

    renderPaperResume(){
        if(this.props.showPaperResume)
            return <Document />;

        return ''
    }

    render(){
        return(
            <div id="resume" className="section resume col-xs-12">
                <Link to="" className="traditional-resume" onClick={() => this.props.togglePaperResume(
                    this.props.showPaperResume)}>
                    <h4>{ '{ paper resume }' }</h4>
                </Link>

                <div className="resume-items">
                    { this.renderResumeItems() }
                </div>

                { this.renderPaperResume() }
            </div>
        );
    }
}

function ExperienceItemLeft(props){
    let content = props.content || '';
    let style = {
        backgroundImage: 'url(' + props.img + ')',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }

    return(
        <div>
            <div className={'experience-item resume-' + props.classNameDyn + ' col-xs-12 hidden-sm hidden-xs'}>
                <div className="resume-item-content left col-md-7 col-md-offset-1 col-xs-12">
                    <h3>{ props.header }</h3>
                    <p dangerouslySetInnerHTML = { getMarkdownText(content) }></p>
                </div>
                <div className="resume-img right col-md-4 col-xs-12" style={ style } />
            </div>

            <div className={'experience-item resume-' + props.classNameDyn + ' col-xs-12 visible-sm visible-xs'}>
                <div className="resume-img right col-xs-12" style={ style } />
                <div className="resume-item-content left col-xs-12">
                    <h3>{ props.header }</h3>
                    <p dangerouslySetInnerHTML = { getMarkdownText(content) }></p>
                </div>
            </div>
        </div>
    );
}

function ExperienceItemRight(props){
    let content = props.content || '';
    let style = {
        backgroundImage: 'url(' + props.img + ')',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }

    return(
        <div>
            <div className={'experience-item resume-' + props.classNameDyn + ' col-xs-12 hidden-sm hidden-xs'}>
                <div className="resume-img left col-md-4 col-xs-12" style={ style } />
                <div className="resume-item-content right col-md-7 col-md-offset-1 col-xs-12">
                    <h3>{ props.header }</h3>
                    <p dangerouslySetInnerHTML = { getMarkdownText(content) }></p>
                </div>
            </div>

            <div className={'experience-item resume-' + props.classNameDyn + ' col-xs-12 visible-sm visible-xs'}>
            <div className="resume-img left col-xs-12" style={ style } />
                <div className="resume-item-content right col-xs-12">
                    <h3>{ props.header }</h3>
                    <p dangerouslySetInnerHTML = { getMarkdownText(content) }></p>
                </div>
            </div>
        </div>
    );
}

function getMarkdownText(markup) {
    let rawMarkup = marked(markup, {sanitize: true});

    return { __html: rawMarkup };
}

function mapStateToProps(state) {
    return {
        resumeItems: state.resumeItems.items,
        showPaperResume: state.showPaperResume.show
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchResumeItems: fetchResumeItems,
            togglePaperResume: togglePaperResume
        },
        dispatch
    );
}

export default connect(mapStateToProps,matchDispatchToProps)(Resume);
