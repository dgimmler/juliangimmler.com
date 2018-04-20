const INITIAL_STATE = { showPaperResume: {show: false} };

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case 'TOGGLE_PAPER_RESUME':
            return {
                ...state,
                show: !action.payload
            };
        default:
            return state;
    }
}
