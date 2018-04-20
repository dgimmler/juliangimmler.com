import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPaperResume, togglePaperResume } from '../../actions/index';
import './document.css';

class Document extends Component {
    componentWillMount() {
        this.props.fetchPaperResume();
    }

    render(){
        let touch = this.props.touch;
        let objectClass = touch ? " hidden" : '';
        let iframeClass = touch ? "" : " hidden";
        let resume = this.props.paperResume;
        let file;
        let type;
        let src;

        if(resume){
            file = resume.doc.fields.file;
            type = file.contentType;
            src = file.url;
        }

        return (
            <div className="document col-xs-12">
                <object className={ "col-xs-12" + objectClass } type={ type } data={ src } >
                    <embed className={ "col-xs-12" + objectClass } src={ src } type={ type } />
                </object>

                <iframe className={ "col-xs-12" + iframeClass } name="paper-resume" id="paper-resume" src={ src } title="paper-resume" />

                <span className="fa fa-close" onClick={() => this.props.togglePaperResume(
                    this.props.showPaperResume
                )} />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        paperResume: state.resume.paperResume,
        showPaperResume: state.showPaperResume.show,
        touch: state.sideHeader.touch
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchPaperResume: fetchPaperResume,
            togglePaperResume: togglePaperResume
        },
        dispatch
    );
}

export default connect(mapStateToProps,matchDispatchToProps)(Document);
