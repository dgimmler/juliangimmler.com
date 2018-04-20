import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HashLink as Link } from 'react-router-hash-link';
import {
    fetchSplashPhotos,
    updateActiveSplashPhoto,
    fetchMainHeader
} from '../../actions/index';
import './carousel.css';

class Carousel extends Component {
    componentWillMount() {
        this.props.fetchSplashPhotos();
        this.props.fetchMainHeader();

        setInterval(
            () => this.props.updateActiveSplashPhoto(
                this.props.previousSplashPhoto,
                this.props.splashPhotos
            ),
            7000
        );
    }

    componentWillUpdate(nextProps, nextState){
        if(nextProps.splashPhotos.length > 0 && !this.props.activeSplashPhoto){
            this.props.updateActiveSplashPhoto(
                nextProps.splashPhotos[0].fields.image.fields.title,
                this.props.splashPhotos
            );
        }
    }

    renderCarouselItems(){
        if(this.props.splashPhotos.length > 0){
            return this.props.splashPhotos.map((splashPhoto) => {
                let activeClass = "";
                if(this.props.activeSplashPhoto === splashPhoto.fields.image.fields.title)
                    activeClass = "active";

                return (
                    <CarouselItem
                        image={ splashPhoto.fields.image.fields }
                        classNameDyn={ activeClass }
                        key={ splashPhoto.fields.image.sys.id } />
                )
            });
        }

        return;
    }

    renderCarouselIndicators(){
        if(this.props.splashPhotos.length > 0){
            let count = -1;
            return this.props.splashPhotos.map((splashPhoto) => {
                count++;
                let activeClass = "";
                if(splashPhoto.fields.image.fields.title === this.props.activeSplashPhoto)
                    activeClass = "active";

                return (
                    <li className={ activeClass }
                        key={ splashPhoto.fields.image.sys.id }
                        data-target="#home"
                        data-slide-to={ count }
                        onClick={ () => this.props.updateActiveSplashPhoto(
                            splashPhoto.fields.image.fields.title,
                            this.props.splashPhotos
                        )}
                    />
                )
            });
        }

        return;
    }

    render(){
        return (
            <div className="main-carousel carousel slide" data-ride="carousel">
                <div className="main-header">
                    <h1 className="hidden-xs">{ this.props.mainHeader.mainHeader }</h1>
                    <h2 className="visible-xs">{ this.props.mainHeader.mainHeader }</h2>
                    <h4>{ this.props.mainHeader.subHeader }</h4>
                </div>

                <div className="carousel-control-panel">
                    <ol className="carousel-indicators">
                        { this.renderCarouselIndicators() }
                    </ol>
                    <Link className="carousel-control-icons carousel-control-prev"
                        to="#home" role="button" data-slide="prev"
                        onClick={ () => this.props.updateActiveSplashPhoto(
                            this.props.previousSplashPhoto,
                            this.props.splashPhotos
                        )}
                    >
                        <span className="fa fa-chevron-left" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </Link>
                    <Link
                        className="carousel-control-icons carousel-control-next"
                        to="#home" role="button" data-slide="next"
                        onClick={ () => this.props.updateActiveSplashPhoto(
                            this.props.nextSplashPhoto,
                            this.props.splashPhotos
                        )}
                    >
                        <span className="fa fa-chevron-right" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </Link>
                </div>

                <div className="learn-more">
                    <Link to="#about-me">
                        <span>learn more</span>
                        <span className="fa fa-chevron-down" />
                    </Link>
                </div>
                <div className="carousel-inner" role="listbox">
                    { this.renderCarouselItems() }
                </div>
            </div>
        );
    }
}

function CarouselItem(props){
    return (
        <div className={ "carousel-item " + props.classNameDyn } id={ "carousel-item-" + props.image.title } style={{
            backgroundImage: "linear-gradient( rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75) ),  url(" + props.image.file.url + ")",
            backgroundSize: "cover",
            backgroundPosition: "center center"
        }}>
            <img className="d-block img-fluid"
                src={ props.image.file.url }
                alt={ props.image.title }
                key={ props.image.key } />
        </div>
    );
}

function mapStateToProps(state) {
    return {
        splashPhotos: state.splashPhotos ? state.splashPhotos.all : [],
        activeSplashPhoto: state.activeSplashPhoto.activeSplashPhoto,
        previousSplashPhoto: state.activeSplashPhoto.previousSplashPhoto,
        nextSplashPhoto: state.activeSplashPhoto.nextSplashPhoto,
        mainHeader: state.mainHeader.mainHeader
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchSplashPhotos: fetchSplashPhotos,
            updateActiveSplashPhoto: updateActiveSplashPhoto,
            fetchMainHeader: fetchMainHeader
        },
        dispatch
    );
}

export default connect(mapStateToProps,matchDispatchToProps)(Carousel);
