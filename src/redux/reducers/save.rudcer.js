const saves = (state = [], action) => {
    switch (action.type) {
        case 'SET_SAVES':
            return action.payload;
        default:
            return state;
    }
}; 

export default saves;
