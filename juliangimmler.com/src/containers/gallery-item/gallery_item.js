import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { toggleActiveMedia } from '../../actions/index';
import './gallery_item.css';

class GalleryItem extends Component {
    handleClick(index){
        this.props.toggleActiveMedia(index);
    }

    render(){
        let item = this.props.gallaryItem;
        let file = item.fields.media.fields.file;
        let itemType = item.fields.type;
        let url = file.url;
        let fileType = file.contentType;
        let style = {
            backgroundImage: 'url(' + url + ')'
        }
        let icon = 'fa fa-image';

        if(itemType === 'headshot')
            icon = 'fa fa-user';

        if(fileType.indexOf('video') > -1){
            return (
                <Link
                    className="gallary-item col-xs-11 col-xs-offset-1 col-sm-5 col-md-3"
                    to=""
                    onClick={ () => this.handleClick(this.props.count) }
                >
                    <div className="gallary-video-container">
                        <video src={ url } type={ fileType } width="100%" height="auto" />
                    </div>

                    <span className="fa fa-play" />
                </Link>
            );
        } else{
            return (
                <Link
                    className="gallary-item col-xs-11 col-xs-offset-1 col-sm-5 col-md-3"
                    style={ style }
                    to=""
                    onClick={ () => this.handleClick(this.props.count) }
                >
                    <span className={ icon } />
                </Link>
            );
        }
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            toggleActiveMedia: toggleActiveMedia
        },
        dispatch
    );
}

export default connect(null,matchDispatchToProps)(GalleryItem);
