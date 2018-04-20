const INITIAL_STATE = {
    show: false,
    touch: false
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case 'TOGGLE_SIDE_HEADER':
            return {
                ...state,
                show: !action.show,
                touch: true
            };
        default:
            return state;
    }
}
