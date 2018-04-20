import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    addGallaryFilter,
    removeGallaryFilter,
    fetchGallaryFilters,
    fetchGallaryItems
} from '../../actions/index';
import { inArray } from '../../utilities';
import './filter.css';

class Filter extends Component {
    handleClick(showHide,type){
        let filters = this.props.activeFilters;
        if(showHide === "hide")
            this.props.addGallaryFilter(type,filters);
        else if(showHide === "show")
            this.props.removeGallaryFilter(type,filters);

        this.props.fetchGallaryFilters();
        //this.props.fetchGallaryItems(filters);
    }

    render(){
        let fields = this.props.filter.fields;
        let type = fields.type;
        let url = fields.image.fields.file.url;
        let activeFilters = this.props.activeFilters;
        let isInActive = inArray(type,activeFilters) ? true : false;
        let showHide = isInActive ? "show" : "hide";
        let frontBack = isInActive ? "front" : "back";
        let gradient = isInActive ? "linear-gradient( rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85) ), " : "";
        let style = {
            backgroundImage: gradient + 'url(' + url + ')'
        }
        let touchClass = this.props.touch ? "touch " : "no-touch ";

        return (
            <div
                className={
                    touchClass +
                    "filter col-md-2 col-md-offset-1 col-sm-4 col-sm-offset-0 col-xs-8 col-xs-offset-2 " +
                    frontBack
                }
                onClick={ () => this.handleClick(showHide,type) }
            >
                <div className="gallary-filter-hover">
                    <h4>{ showHide }</h4>
                </div>
                <div className="filter-img" style={ style } />
                <h4>{ type + "s" }</h4>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeFilters: state.gallaryItems.activeFilters,
        gallaryKey: state.gallaryItems.gallaryKey,
        touch: state.sideHeader.touch
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addGallaryFilter: addGallaryFilter,
            removeGallaryFilter: removeGallaryFilter,
            fetchGallaryFilters: fetchGallaryFilters,
            fetchGallaryItems: fetchGallaryItems
        },
        dispatch
    );
}

export default connect(mapStateToProps,matchDispatchToProps)(Filter);
