let appId = 0;
export const increment = (state = { 'id': 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return Object.assign({}, state, { id: appId++ });
        case 'DECREMENT':
            return Object.assign({}, state, { id: appId-- });
        default:
            return state;
    }

}


export const doubleIncrement = (state = { 'id': 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return Object.assign({}, state, { id: appId++ });
        case 'DECREMENT':
            return Object.assign({}, state, { id: appId-- });
        default:
            return state;
    }

}