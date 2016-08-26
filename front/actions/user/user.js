import { LOGIN, LOGOUT , SET_USER} from '../../constants'

module.exports = {
    login: (userInfo) => {
        return {
          type: LOGIN,
          userInfo: userInfo
        }
    },
    logout: () => {
        return {
          type: LOGOUT,
          userInfo: ''
        }
    },
    set: (userInfo) => {
        return {
            type: SET_USER,
            userInfo: userInfo,
        }
    }
};
