const INITIAL_STATE = { resumeItems: {} };

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case 'FETCH_RESUME_ITEMS':
            const items = action.payload.data;
            let sortedItems = [];
            if(items)
                sortedItems = items.sort(
                    (a,b) => a.fields.order - b.fields.order
                );

            return {
                ...state,
                items: sortedItems
            };
        default:
            return state;
    }
}
