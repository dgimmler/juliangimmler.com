const INITIAL_STATE = { all: [] };

// state argument is not application state, only the state this reducer is
// responsible for
export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case 'FETCH_SPLASH_PHOTOS':
            return {...state, all: action.payload.data };
        default:
            return state;
    }
}
