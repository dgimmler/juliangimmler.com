const INITIAL_STATE = { aboutMe: {} };

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case 'FETCH_ABOUT_ME':
            return {
                ...state,
                aboutMe: action.payload.data
            };
        default:
            return state;
    }
}
