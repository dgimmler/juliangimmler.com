import { inArray, removeFromArray } from '../utilities';

const INITIAL_STATE = {
    blogPosts: {},
    filterTags: [],
    filterInputValue: '',
    expandedPosts: [],
    blogFilterKey: Math.random(),
    readMoreKey: Math.random(),
    currentPage: 1
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case 'FETCH_BLOG_POSTS':
            let posts = action.payload.data;

            return {
                ...state,
                posts: posts
            };

        case 'ADD_INSTAGRAM_EMBEDS':
            return {
                ...state ,
                posts: action.payload
            }

        case 'ADD_BLOG_FILTER':
            let tag = action.payload.tag;
            if(tag)
                tag = tag.toLowerCase();

            let filter = action.payload.filter || [];
            if(!inArray(tag,filter))
                filter.push(tag);

            return {
                ...state,
                tags: filter
            };

        case 'REMOVE_BLOG_FILTER':
            let needle = action.payload.tag;
            if(needle)
                needle = needle.toLowerCase();

            let haystack = action.payload.filter || [];
            if(haystack){
                if(haystack.length > 0)
                    haystack = removeFromArray(needle,haystack);
            }

            return {
                ...state,
                filterTags: haystack
            };

        case 'UPDATE_FILTER_INPUT':
            return {
                ...state,
                filterInputValue: action.filterValue
            }

        case 'ADD_EXPANDED_POST':
            let id = action.payload.id;
            let expandedPosts = action.payload.expandedPosts || [];
            if(!inArray(id,expandedPosts))
                expandedPosts.push(id);

            return {
                ...state,
                expandedPosts: expandedPosts
            };

        case 'REMOVE_EXPANDED_POST':
            let needleId = action.payload.id;
            let postHaystack = action.payload.expandedPosts || [];

            if(postHaystack){
                if(postHaystack.length > 0)
                    postHaystack = removeFromArray(needleId,postHaystack);
            }

            return {
                ...state,
                expandedPosts: postHaystack
            };
        case 'NEXT_PAGE':
            let currentPage = action.currentPage;
            currentPage++;

            return {
                ...state,
                currentPage: currentPage,
                blogFilterKey: Math.random()
            }
        case 'LAST_PAGE':
            let thisPage = action.currentPage;
            thisPage--;

            return {
                ...state,
                currentPage: thisPage,
                blogFilterKey: Math.random()
            }

        default:
            return state;
    }
}
