import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    toggleActiveMedia
} from '../../actions/index';
import './media_dialog.css';

class MediaDialog extends Component {
    handleClick(index,loop){
        if(loop){
            let length = this.props.gallaryItems.length;

            if(loop === 'left'){
                if(index < 0)
                    index = length - 1;
            } else if(loop === 'right'){
                if(index >= length)
                    index = 0;
            }
        }

        this.props.toggleActiveMedia(index);
    }

    renderMedia(index,gallaryItems){
        if(!gallaryItems)
            return;

        let media = gallaryItems[index];

        if(!media)
            return;

        let file = media.fields.media.fields.file;
        let url = file.url;
        let fileType = file.contentType;

        if(fileType.indexOf('video') > -1){
            return (
                <video src={ url } type={ fileType } controls/>
            );
        } else{
            return (
                <img src={ url } alt="Your browser does not support this media type" />
            );
        }
    }

    render(){
        let showActiveMedia = this.props.index >= 0;
        let index = this.props.index || 0;

        if(showActiveMedia){
            return (
                <div className="media-dialog-container">
                    <span className="right-border" onClick={ () => this.handleClick(-1) } />
                    <span className="left-border" onClick={ () => this.handleClick(-1) } />
                    <span className="top-border" onClick={ () => this.handleClick(-1) } />
                    <span className="bottom-border" onClick={ () => this.handleClick(-1) } />

                    <div className="media-dialog">
                        <span className="fa fa-chevron-left" onClick={ () => this.handleClick(index - 1,'left') } />
                        <span className="fa fa-chevron-right" onClick={ () => this.handleClick(index + 1,'right') } />

                        <div className="media-dialog-content">
                            { this.renderMedia(index,this.props.gallaryItems) }
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                </div>
            );
        }
    }
}

function mapStateToProps(state){
    return {
        index: state.gallaryItems.activeMediaCount
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            toggleActiveMedia: toggleActiveMedia
        },
        dispatch
    );
}

export default connect(mapStateToProps,matchDispatchToProps)(MediaDialog);
