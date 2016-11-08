import React from 'react'
import {userAction, titleAction} from 'actions';
import { connect } from 'react-redux';
import FileUpload from 'react-fileupload';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import {Zip} from 'tools';
// import {AppBundleInfo} from '../../../../../tools';

const infoPlistRegex = new RegExp('Info.plist');

class AddApp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            completed: 0,//
            max: 100
        }
        let file = {}
        let zip = new  Zip(file);
        console.log(zip);
    }

    componentDidMount() {
        this.props.setTitle('添加应用');
    }

    render() {
        return (
          <div>
            <h2>AddApp</h2>

          </div>
        )
    }

}

let setState = (state) => {
    return {
        userReducer: state.userReducer,
        titleReducer: state.titleReducer
    }
};

let setAction = (dispatch) => {
    return {
        logout: () => {dispatch(userAction.logout())},
        login: (userInfo) => dispatch(userAction.login(userInfo)),
        set: (userInfo) => dispatch(userAction.set(userInfo)),
        setTitle: (title) => dispatch(titleAction.setTitle(title))
    }
}
module.exports = connect(setState, setAction)(AddApp);
