import React from 'react'
import {userAction} from '../../../../../actions';
import { connect } from 'react-redux';

class AddApp extends React.Component {

  render() {
      console.log(this.props.userReducer);
    return (
      <div>
        <h2>AddApp</h2>
      </div>
    )
  }

}

let setState = (state) => {
    return {
        userReducer: state.userReducer
    }
};

let setAction = (dispatch) => {
    return {
        logout: () => {dispatch(userAction.logout())},
        login: (userInfo) => dispatch(userAction.login(userInfo)),
        set: (userInfo) => dispatch(userAction.set(userInfo)),
    }
}
module.exports = connect(setState, setAction)(AddApp);
