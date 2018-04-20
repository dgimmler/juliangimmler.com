const INITIAL_STATE = { resume: {} };

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case 'FETCH_PAPER_RESUME':
            const document = action.payload.data[0];

            return {
                ...state,
                paperResume: document.fields
            };
        default:
            return state;
    }
}
