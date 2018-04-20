import axios from 'axios';

// root url
const ROOT_URL = 'https://q5g2my9522.execute-api.us-west-2.amazonaws.com/entries';

// Action names
const FETCH_SPLASH_PHOTOS = 'FETCH_SPLASH_PHOTOS';
const UPDATE_ACTIVE_SPLASHPHOTO = 'UPDATE_ACTIVE_SPLASHPHOTO';
const FETCH_MAIN_HEADER = 'FETCH_MAIN_HEADER';
const FETCH_ABOUT_ME = 'FETCH_ABOUT_ME';
const FETCH_RESUME_ITEMS = 'FETCH_RESUME_ITEMS';
const TOGGLE_PAPER_RESUME = 'TOGGLE_PAPER_RESUME';
const FETCH_PAPER_RESUME = 'FETCH_PAPER_RESUME';
const FETCH_BLOG_POSTS = 'FETCH_BLOG_POSTS';
const ADD_BLOG_FILTER = 'ADD_BLOG_FILTER';
const UPDATE_FILTER_INPUT = 'UPDATE_FILTER_INPUT';
const REMOVE_BLOG_FILTER = 'REMOVE_BLOG_FILTER';
const ADD_EXPANDED_POST = 'ADD_EXPANDED_POST';
const REMOVE_EXPANDED_POST = 'REMOVE_EXPANDED_POST';
const NEXT_PAGE = 'NEXT_PAGE';
const LAST_PAGE = 'LAST_PAGE';
const FETCH_GALLARY_ITEMS = 'FETCH_GALLARY_ITEMS';
const FETCH_GALLARY_FILTERS = 'FETCH_GALLARY_FILTERS';
const ADD_GALLARY_FILTER = 'ADD_GALLARY_FILTER';
const REMOVE_GALLARY_FILTER = 'REMOVE_GALLARY_FILTER';
const TOGGLE_ACTIVE_MEDIA = 'TOGGLE_ACTIVE_MEDIA';
const TOGGLE_CONTACT_FORM = 'TOGGLE_CONTACT_FORM';
const UPDATE_CONTACT_FORM = 'UPDATE_CONTACT_FORM';
const SUBMIT_CONTACT_FORM = 'SUBMIT_CONTACT_FORM';
const TOGGLE_SIDE_HEADER = 'TOGGLE_SIDE_HEADER';
const ADD_INSTAGRAM_EMBEDS = 'ADD_INSTAGRAM_EMBEDS';

// Action creators
export function fetchSplashPhotos(){
    const url = `${ROOT_URL}/?type=splashphoto`;
    const payload = axios.get(url);

    return {
        type: FETCH_SPLASH_PHOTOS,
        payload: payload
    }
}

export function updateActiveSplashPhoto(activePhoto,allPhotos){
    return {
        type: UPDATE_ACTIVE_SPLASHPHOTO,
        payload: {
            activePhoto: activePhoto,
            allPhotos: allPhotos
        }
    }
}

export function fetchMainHeader(){
    const url = `${ROOT_URL}/?type=mainheader`;
    const payload = axios.get(url);

    return {
        type: FETCH_MAIN_HEADER,
        payload: payload
    }
}

export function fetchAboutMe(){
    const url = `${ROOT_URL}/?type=aboutme`;
    const payload = axios.get(url);

    return {
        type: FETCH_ABOUT_ME,
        payload: payload
    }
}

export function fetchResumeItems(){
    const url = `${ROOT_URL}/?type=resumeitem`;
    const payload = axios.get(url);

    return {
        type: FETCH_RESUME_ITEMS,
        payload: payload
    }
}

export function fetchPaperResume(){
    const url = `${ROOT_URL}/?type=paperresume`;
    const payload = axios.get(url);

    return {
        type: FETCH_PAPER_RESUME,
        payload: payload
    }
}

export function togglePaperResume(resumeState){
    return {
        type: TOGGLE_PAPER_RESUME,
        payload: resumeState
    }
}

export function fetchBlogPosts(page){
    let skip = (page - 1) * 5;
    const url = `${ROOT_URL}/?type=blogpost&page=${skip}`;
    const payload = axios.get(url);

    return {
        type: FETCH_BLOG_POSTS,
        payload: payload
    }
}

export function fetchBlogPostsFiltered(tags,page){
    let skip = (page - 1) * 5;

    if(tags){
        if(tags.length > 0){
            let filter = '';
            for(let i=0; i<tags.length; i++){
                if(filter !== '')
                    filter += ',';

                filter += tags[i];
            }

            const url = `${ROOT_URL}/?type=blogpostfiltered&page=${skip}&filter=${filter}`;
            const payload = axios.get(url);

            return {
                type: FETCH_BLOG_POSTS,
                payload: payload
            }
        }
    }
}

export function addBlogFilter(tag,filter){
    return {
        type: ADD_BLOG_FILTER,
        payload: {
            tag: tag,
            filter: filter
        }
    }
}

export function updateBlogFilterValue(value){
    return {
        type: UPDATE_FILTER_INPUT,
        filterValue: value
    }
}

export function removeBlogFilter(tag,filter){
    return {
        type: REMOVE_BLOG_FILTER,
        payload: {
            tag: tag,
            filter: filter
        }
    }
}

export function addExpandedPost(id,expandedPosts){
    return {
        type: ADD_EXPANDED_POST,
        payload: {
            id: id,
            expandedPosts: expandedPosts
        }
    }
}

export function removeExpandedPost(id,expandedPosts){
    return {
        type: REMOVE_EXPANDED_POST,
        payload: {
            id: id,
            expandedPosts: expandedPosts
        }
    }
}

export function nextPage(currentPage){
    return {
        type: NEXT_PAGE,
        currentPage: currentPage
    }
}

export function lastPage(currentPage){
    return {
        type: LAST_PAGE,
        currentPage: currentPage
    }
}

export function fetchGallaryItems(filter){
    let exclude = '';
    if(filter){
        if(filter.length > 0){
            for(let i=0; i<filter.length; i++){
                if(exclude !== '')
                    exclude += ',';

                exclude += filter[i];
            }
        }
    }

    const url = `${ROOT_URL}/?type=gallary&exclude=${exclude}`;
    const payload = axios.get(url);

    return {
        type: FETCH_GALLARY_ITEMS,
        payload: payload
    }
}

export function fetchGallaryFilters(){
    const url = `${ROOT_URL}/?type=galleryfilterimage`;
    const payload = axios.get(url);

    return {
        type: FETCH_GALLARY_FILTERS,
        payload: payload
    }
}

export function addGallaryFilter(type,activeFilters){
    return {
        type: ADD_GALLARY_FILTER,
        payload: {
            type: type,
            activeFilters: activeFilters
        }
    }
}

export function removeGallaryFilter(type,activeFilters){
    return {
        type: REMOVE_GALLARY_FILTER,
        payload: {
            type: type,
            activeFilters: activeFilters
        }
    }
}

export function toggleActiveMedia(index){
    return {
        type: TOGGLE_ACTIVE_MEDIA,
        index: index
    }
}

export function toggleContactForm(showContactForm){
    return {
        type: TOGGLE_CONTACT_FORM,
        show: showContactForm
    }
}

export function updateContactform(form){
    return {
        type: UPDATE_CONTACT_FORM,
        form: form
    }
}

export function submitContactForm(form){
    const email = form;
    const url = `${ROOT_URL}`;
    const requestBody = {
        "name": email.name.toString(),
        "email": email.email.toString(),
        "subject": email.subject.toString(),
        "message": email.body.toString()
    };
    const payload = axios.post(url,JSON.stringify(requestBody));

    return {
        type: SUBMIT_CONTACT_FORM,
        payload: payload
    }
}

export function toggleSideHeader(show){
    return {
        type: TOGGLE_SIDE_HEADER,
        show: show
    }
}

export function addInstagramEmbeds(updatedPosts){
    return {
        type: ADD_INSTAGRAM_EMBEDS,
        payload: updatedPosts
    }
}
