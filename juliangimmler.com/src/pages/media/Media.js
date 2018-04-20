import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Filter from '../../containers/filter/filter';
import GalleryItem from '../../containers/gallery-item/gallery_item';
import MediaDialog from '../../containers/media-dialog/media_dialog';
import ContactForm from '../../containers/contact-form/contact_form';
import {
    fetchGallaryItems,
    fetchGallaryFilters,
    toggleContactForm
} from '../../actions/index';
import './Media.css';

class Media extends Component {
    componentWillMount(){
        this.props.fetchGallaryFilters();
        this.props.fetchGallaryItems();
    }

    componentWillUpdate(nextProps,nextState){
        if(this.props.gallaryItems.length === nextProps.gallaryItems.length && this.props.filterUpdate)
            this.props.fetchGallaryItems(nextProps.activeFilters);
    }

    handleClick(){
        this.props.toggleContactForm(
            this.props.contactForm.show
        );
    }

    renderFilters(){
        let filters = this.props.gallaryFilters;
        if(!filters)
            return;

        if(filters.length > 0){
            return filters.map((filter) => {
                return (
                    <Filter filter={ filter } key={ filter.sys.id } />
                )
            });
        }
    }

    renderGallaryItems(){
        let gallaryItems = this.props.gallaryItems;
        if(!gallaryItems)
            return;
        let count = -1;

        if(gallaryItems.length > 0){
            return gallaryItems.map((item) => {
                count++;
                return (
                    <GalleryItem gallaryItem={ item } count={ count } key={ count } />
                )
            });
        }
    }

    render(){
        return (
            <div className="section media col-xs-12" id="gallery">
                <div
                    className="pop-up-btn col-xs-10 col-xs-offset-1"
                    onClick = { () => this.handleClick() }
                >
                    <h4 className="btn">{"{ get in touch }"}</h4>
                </div>

                <h3 className="col-xs-12">Gallery</h3>

                <div className="filters col-md-offset-0 col-sm-offset-0">
                    <span className="bumper col-md-1 hidden-xs hidden-sm" />
                    { this.renderFilters() }
                </div>

                <div className="gallery col-xs-11">
                    { this.renderGallaryItems() }
                </div>

                <MediaDialog gallaryItems={ this.props.gallaryItems }/>
                <ContactForm />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        gallaryItems: state.gallaryItems.items,
        gallaryFilters: state.gallaryItems.filters,
        activeFilters: state.gallaryItems.activeFilters,
        gallaryKey: state.gallaryItems.gallaryKey,
        filterUpdate: state.gallaryItems.filterUpdate,
        contactForm: state.contactForm
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchGallaryItems: fetchGallaryItems,
            fetchGallaryFilters: fetchGallaryFilters,
            toggleContactForm: toggleContactForm
        },
        dispatch
    );
}

export default connect(mapStateToProps,matchDispatchToProps)(Media);
