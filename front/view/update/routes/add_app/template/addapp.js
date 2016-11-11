import React from 'react'
import {userAction, titleAction} from 'actions';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import {zip} from 'tools';
// import {AppBundleInfo} from '../../../../../tools';
import DropZone from 'react-dropzone';

const infoPlistRegex = new RegExp('Info.plist');

class AddApp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            completed: 0,//
            max: 100,
        }
    }

    componentDidMount() {
        this.props.setTitle('添加应用');
    }

    _onDrop = (files) =>{
        console.log(files);
        let file = files[0];
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        console.log(reader);
        reader.onload = (f) => {
            console.log(f);
        };

    }

    render() {
        return (
          <div>
            <h2>AddApp</h2>
            <DropZone
                ref='dropzone'
                onDrop={this._onDrop}
            >
                <div>drop app here</div>
            </DropZone>
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
