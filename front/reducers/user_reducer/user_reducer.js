import {LOGIN, LOGOUT, SET_USER} from '../../constants';

let initialState = {
    id: '',
    userName: '',
    email: '',
    phone: '',
}

module.exports = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGIN:
            return action.userInfo;
        case LOGOUT:
            return initialState;
        case SET_USER:
            return action.userInfo;
        default:
            return state;
    }
};
