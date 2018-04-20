import React, { Component } from  'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {
    fetchBlogPosts,
    fetchBlogPostsFiltered,
    nextPage,
    lastPage,
    addInstagramEmbeds
} from '../../actions/index';
import BlogFilter from '../../containers/blog-filter/blog_filter.js';
import BlogPost from '../../containers/blog-post/blog_post.js';
import './Blog.css';

class Blog extends Component{
    componentWillMount(){
        this.props.fetchBlogPosts(this.props.currentPage);
    }

    componentWillUpdate(nextProps, nextState){
        if(this.props.currentPage !== nextProps.currentPage){
            if(nextProps.blogFilter){
                if(nextProps.blogFilter.length > 0)
                    this.props.fetchBlogPostsFiltered(nextProps.blogFilter,nextProps.currentPage);
                else this.props.fetchBlogPosts(nextProps.currentPage);
            }
        } else if(nextProps.blogPosts[0]) {
            if(!nextProps.blogPosts[0].embed)
                this.addInstagramEmbeds(nextProps.blogPosts,0);
        }
    }

    addInstagramEmbeds(posts,count){
        if(!posts)
            return posts;
        if(posts.length < 1)
            return posts;

        count = count || 0;
        axios.get('https://api.instagram.com/oembed?url=' + posts[count].fields.link)
            .then(response => {
                let newPosts = [];
                for(let i=0; i<posts.length; i++){
                    if(i === count){
                        let post = posts[count];
                        post.embed = response;
                        newPosts.push(post);
                    } else newPosts.push(posts[i]);
                }

                if(count === posts.length - 1){
                    this.props.addInstagramEmbeds(newPosts);
                } else {
                    count++;
                    return this.addInstagramEmbeds(newPosts,count);
                }
            });
    }

    nextPage(){
        this.props.nextPage(this.props.currentPage);
    }

    lastPage(){
        this.props.lastPage(this.props.currentPage);
    }

    renderBlogPosts(){
        if(!this.props.blogPosts)
            return (
                <div className="no-blog-posts">
                    <p>No blog posts found that match the current search criteria</p>
                </div>
            );

        if(this.props.blogPosts.length > 0){
            return this.props.blogPosts.slice(0,5).map((post) => {
                let fields = post.fields;
                let postId = post.sys.id.toString().toLowerCase();
                let instagramHtml = post.embed ? post.embed.data.html : '<div class="test-center"><i class="fa fa-spinner fa-pulse fa-3x fa-fw text-center" style="margin: 100px auto; display: inherit;"></i><span class="sr-only">Loading...</span></div>';

                return (
                    <BlogPost
                        postId = { postId }
                        title = { fields.title }
                        body = { fields.body }
                        tags = { fields.tags }
                        featureVideo = { fields.videoLink }
                        featureImage = { fields.imageLink }
                        externalLink = { fields.link }
                        date = { post.sys.createdAt }
                        key = { postId }
                        instagramEmbed = { instagramHtml }
                    />
                )
            });
        } else {
            return (
                <div className="no-blog-posts">
                    <p>No blog posts found that match the current search criteria</p>
                </div>
            );
        }
    }

    render(){
        let hideMorePosts = false;
        let hideLessPosts = true;

        if(this.props.blogPosts){
            if(this.props.blogPosts.length <= 5)
                hideMorePosts = true;
        }

        if(this.props.currentPage){
            if(this.props.currentPage > 1)
                hideLessPosts = false;
        }

        let hideMorePostsClass = hideMorePosts ? 'hidden' : '';
        let hideLessPostsClass = hideLessPosts ? 'hidden' : '';

        return(
            <div className="section blog col-xs-12" id="news" key={ this.props.blogFilterKey }>
                <div className="blog-body col-xs-12 col-sm-11">
                    <h3 className="col-sm-5 col-xs-12 hidden-xs">News</h3>
                    <h3 className="col-sm-5 col-xs-12 visible-xs">News</h3>
                    <BlogFilter />

                    { this.renderBlogPosts() }
                </div>

                <div className="right-column hidden-xs">
                    <div className="posts-page">
                        <h4>{ "Page " + this.props.currentPage }</h4>
                    </div>

                    <div className={ "previous-posts " + hideLessPostsClass }>
                        <span className="fa fa-chevron-up" />
                        <h4 onClick={ () => this.lastPage() }>Previous Posts</h4>
                    </div>

                    <div className={ "get-more " + hideMorePostsClass }>
                        <h4 onClick={ () => this.nextPage() }>More Posts</h4>
                        <span className="fa fa-chevron-down" />
                    </div>
                </div>

                <div className="bottom-column visible-xs">
                    <div className="posts-page">
                        <h4>{ "Page " + this.props.currentPage }</h4>
                    </div>

                    <div className={ "previous-posts " + hideLessPostsClass }>
                        <span className="fa fa-chevron-up" />
                        <h4 onClick={ () => this.lastPage() }>Previous Posts</h4>
                    </div>

                    <div className={ "get-more " + hideMorePostsClass }>
                        <h4 onClick={ () => this.nextPage() }>More Posts</h4>
                        <span className="fa fa-chevron-down" />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        blogPosts: state.blogPosts.posts,
        blogFilter: state.blogPosts.filterTags,
        blogFilterKey: state.blogPosts.blogFilterKey,
        currentPage: state.blogPosts.currentPage
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchBlogPosts: fetchBlogPosts,
            fetchBlogPostsFiltered: fetchBlogPostsFiltered,
            nextPage: nextPage,
            lastPage: lastPage,
            addInstagramEmbeds: addInstagramEmbeds
        },
        dispatch
    );
}

export default connect(mapStateToProps,matchDispatchToProps)(Blog);
