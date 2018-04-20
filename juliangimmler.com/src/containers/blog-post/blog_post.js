import React, { Component } from  'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import marked from 'marked';
import { inArray } from '../../utilities';
import {
    addBlogFilter,
    updateBlogFilterValue,
    addExpandedPost,
    removeExpandedPost,
    fetchBlogPostsFiltered,
    fetchBlogPosts
} from '../../actions/index';
import './blog_post.css';

class BlogPost extends Component{
    getHtml(html){
        return { __html: html }
    }

    getMarkdownText(markup){
        let rawMarkup = marked(markup, {sanitize: true});

        return { __html: rawMarkup };
    }

    getFormattedDate(date){
        let dateStr = date.split('T')[0];
        let dateArr = dateStr.split('-');
        let formattedDate = dateArr[1] + "." + dateArr[2] + "." + dateArr[0];

        return formattedDate;
    }

    handleClick(tag){
        this.props.updateBlogFilterValue(tag);
        this.props.addBlogFilter(tag,this.props.blogFilter);
        this.props.updateBlogFilterValue('');
    }

    refreshBlogPosts(){
        let filter = this.props.blogFilter;
        let currentPage = this.props.currentPage;
        if(filter.length > 0)
            this.props.fetchBlogPostsFiltered(filter,currentPage);
        else this.props.fetchBlogPosts(currentPage);
    }

    expandPost(id){
        this.props.addExpandedPost(id,this.props.expandedPosts);
        this.refreshBlogPosts();
    }

    contractPost(id){
        this.props.removeExpandedPost(id,this.props.expandedPosts);
        this.refreshBlogPosts();
    }

    renderTags(tags){
        if(tags){
            if(tags.length > 0){
                return tags.map((tag) => {
                    return (
                        <h4 onClick={ () => this.handleClick(tag) } key={ tag }>{ "#" + tag }</h4>
                    )
                })
            }
        }
    }

    renderFeatureMedia(image,video,link){
        if(link.toString().toLowerCase().substring(0,25) === "https://www.instagram.com"){
            return <div dangerouslySetInnerHTML = { this.getHtml(this.props.instagramEmbed) }></div>
        } else if(video){
            return (
                <div className="video-container">
                    <video src={ video } type="video/mp4" width="100%" height="auto" controls/>
                </div>
            );
        } else if(image){
            return (
                <img src={ image } alt="Your browser does not support this file type" />
            );
        }
    }

    render(){
        let date = this.getFormattedDate(this.props.date);
        let expanded = inArray(this.props.postId,this.props.expandedPosts);
        let expandedClass = expanded ? "expanded" : "preview";

        return (
            <div className={ "blog-post col-xs-12 " + expandedClass } id={ this.props.postId } key={ this.props.readMoreKey }>
                <div className="post-header col-sm-4 hidden-xs hidden-sm">
                    <h4>{ this.props.title }</h4>
                    <h4>{ date}</h4>
                    <br />
                    <div className="tags">{ this.renderTags(this.props.tags) }</div>
                </div>

                <div className="post-header col-sm-4 visible-sm">
                    <h4>{ this.props.title }</h4>
                    <h4>{ date }</h4>
                    <br />
                    <div className="tags">{ this.renderTags(this.props.tags) }</div>
                </div>

                <div className="post-header col-xs-12 visible-xs">
                    <h4>{ this.props.title }</h4>
                    <h4>{ date }</h4>
                    <br />
                    <div className="tags">{ this.renderTags(this.props.tags) }</div>
                </div>

                <div className={ "post-content col-sm-7 hidden-xs"}>
                    { this.renderFeatureMedia(this.props.featureImage, this.props.featureVideo, this.props.externalLink) }
                    <p className="body-html" dangerouslySetInnerHTML = { this.getMarkdownText(this.props.body) }></p>
                </div>

                <div className={ "post-content visible-xs col-xs-12"}>
                    { this.renderFeatureMedia(this.props.featureImage, this.props.featureVideo, this.props.externalLink) }
                    <p className="body-html" dangerouslySetInnerHTML = { this.getMarkdownText(this.props.body) }></p>
                </div>

                <div className={ "read-more" } onClick={ () => this.expandPost( this.props.postId ) }>
                    <h4>Read More</h4>
                    <span className="fa fa-chevron-down" />
                </div>

                <div className={ "read-less" } onClick={ () => this.contractPost( this.props.postId ) }>
                    <span className="fa fa-chevron-up" />
                    <h4>Less</h4>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        blogFilter: state.blogPosts.filterTags,
        filterValue: state.blogPosts.filterInputValue,
        expandedPosts: state.blogPosts.expandedPosts,
        readMoreKey: state.blogPosts.readMoreKey,
        currentPage: state.blogPosts.currentPage
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addBlogFilter: addBlogFilter,
            updateBlogFilterValue: updateBlogFilterValue,
            addExpandedPost: addExpandedPost,
            removeExpandedPost: removeExpandedPost,
            fetchBlogPostsFiltered: fetchBlogPostsFiltered,
            fetchBlogPosts: fetchBlogPosts
        },
        dispatch
    );
}

export default connect(mapStateToProps,matchDispatchToProps)(BlogPost);
