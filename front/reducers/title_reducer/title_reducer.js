import {GET_TITLE, SET_TITLE} from '../../constants';

let initialState = {
    title: ''
}

module.exports = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_TITLE:
            return action.title;
        default:
            return state;
    }
};
