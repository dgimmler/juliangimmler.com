import { inArray, removeFromArray } from '../utilities';

const INITIAL_STATE = {
    items: [],
    filters: [],
    activeFilters: [],
    gallaryKey: Math.random(),
    activeMediaCount: -1,
    filterUpdate: false
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case 'FETCH_GALLARY_ITEMS':
            return {
                ...state,
                items: action.payload.data,
                filterUpdate: false
            };
        case 'FETCH_GALLARY_FILTERS':
            return {
                ...state,
                filters: action.payload.data,
                gallaryKey: Math.random()
            }
        case 'ADD_GALLARY_FILTER':
            let type = action.payload.type;
            let activeFilters = action.payload.activeFilters || [];

            if(!inArray(type,activeFilters))
                activeFilters.push(type);

            return {
                ...state,
                activeFilters: activeFilters,
                filterUpdate: true
            };
        case 'REMOVE_GALLARY_FILTER':
            let needle = action.payload.type;
            let haystack = action.payload.activeFilters || [];

            if(haystack){
                if(haystack.length > 0)
                    haystack = removeFromArray(needle,haystack);
            }

            return {
                ...state,
                activeFilters: haystack,
                filterUpdate: true
            };
        case 'TOGGLE_ACTIVE_MEDIA':
            return {
                ...state,
                activeMediaCount: action.index
            }
        default:
            return state;
    }
}
