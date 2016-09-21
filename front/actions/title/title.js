import { SET_TITLE, GET_TITLE} from '../../constants'

module.exports = {
    setTitle: (title) => {
        return {
          type: SET_TITLE,
          title: {
              title: title
          }
        }
    }
};
