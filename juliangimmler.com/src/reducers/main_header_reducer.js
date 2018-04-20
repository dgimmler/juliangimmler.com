const INITIAL_STATE = { mainHeader: {} };

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case 'FETCH_MAIN_HEADER':
            
            return {
                ...state,
                mainHeader: action.payload.data
            };
        default:
            return state;
    }
}
