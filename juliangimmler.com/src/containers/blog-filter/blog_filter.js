import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    addBlogFilter,
    updateBlogFilterValue,
    removeBlogFilter,
    fetchBlogPostsFiltered,
    fetchBlogPosts
} from '../../actions/index';
import './blog_filter.css';

class BlogFilter extends Component {
    componentWillUpdate(nextProps, nextState){
        if(nextProps.blogFilter){
            if(nextProps.blogFilter.length > 0)
                this.props.fetchBlogPostsFiltered(nextProps.blogFilter,this.props.currentPage);
            else this.props.fetchBlogPosts(this.props.currentPage);
        }
    }

    handleKeyUp(event){
        this.props.updateBlogFilterValue(event.target.value);

        if (event.key === 'Enter' && event.target.value && event.target.value !== ''){
            this.props.addBlogFilter(event.target.value,this.props.blogFilter);
            this.props.updateBlogFilterValue('');
            this.refs.filterValue.value = '';
            this.refs.filterValueSmall.value = '';
        }
    }

    handleSubmit(){
        if(this.props.filterValue && this.props.filterValue !== ''){
            this.props.addBlogFilter(this.props.filterValue,this.props.blogFilter);
            this.props.updateBlogFilterValue('');
            this.refs.filterValue.value = '';
            this.refs.filterValueSmall.value = '';
        }
    }

    handleClick(tag){
        this.props.removeBlogFilter(tag,this.props.blogFilter);
        this.props.updateBlogFilterValue('');
    }

    renderFilters(){
        let filters = this.props.blogFilter;

        if(filters){
            if(filters.length > 0){
                return filters.map((tag) => {
                    return (
                        <h4 onClick={ () => this.handleClick(tag) }>{ "#" + tag }</h4>
                    )
                });
            }
        }
    }

    render(){
        return (
            <div key={ this.props.blogFilterKey }>
                <div className="blog-filter col-sm-6 hidden-xs">
                    <h4>Filter by tag:</h4>
                    <span className="add-filter-btn fa fa-plus" onClick={ this.handleSubmit.bind(this) }/>
                    <input onKeyUp={ this.handleKeyUp.bind(this) } ref="filterValue"></input>
                    <div className="filter-tags">
                        { this.renderFilters() }
                    </div>
                </div>

                <div className="blog-filter col-xs-12 visible-xs">
                    <h4>Filter by tag:</h4>
                    <span className="add-filter-btn fa fa-plus" onClick={ this.handleSubmit.bind(this) }/>
                    <input onKeyUp={ this.handleKeyUp.bind(this) } ref="filterValueSmall"></input>
                    <div className="filter-tags">
                        { this.renderFilters() }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        blogFilter: state.blogPosts.filterTags,
        filterValue: state.blogPosts.filterInputValue,
        blogFilterKey: state.blogPosts.blogFilterKey,
        currentPage: state.blogPosts.currentPage
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            addBlogFilter: addBlogFilter,
            updateBlogFilterValue: updateBlogFilterValue,
            removeBlogFilter: removeBlogFilter,
            fetchBlogPostsFiltered: fetchBlogPostsFiltered,
            fetchBlogPosts: fetchBlogPosts
        },
        dispatch
    );
}

export default connect(mapStateToProps,matchDispatchToProps)(BlogFilter);
