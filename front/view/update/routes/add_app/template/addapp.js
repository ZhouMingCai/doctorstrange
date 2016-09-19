import React from 'react'
import {userAction} from '../../../../../actions';
import { connect } from 'react-redux';
import FileUpload from 'react-fileupload';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
// import {AppBundleInfo} from '../../../../../tools';

const infoPlistRegex = new RegExp('Info.plist');

class AddApp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            completed: 0,//
            max: 100
        }
        this.options = {
          baseUrl:'/update/upload/uploadfile',
          param:{
              name:'bundle'
          },
          chooseAndUpload: false,
          accept: 'bunble/*',
          dataType: 'json',
          multiple: false,
          fileFieldName: 'bundle',
          chooseFile: (files) => this._chooseFile(files),
          uploading: (progress, mill) => this._showProgress(progress),
          doUpload: (files,mill,xhrID) => {

          },
          uploadSuccess: (res) => {
              if (res.errno == 0 && res.data.name) {
                  this.setState({
                      fileName: res.data.name
                  });
              }
          },
          uploadError: (err) => {
              alert(err.errmsg)
          },
          uploadFail: (res)=> {
              alert(err.errmsg)
          }
        }
    }

    /**
     * 显示进度条
     * @method _showProgress
     * @param  {[type]}      progress [description]
     * @return {[type]}               [description]
     * @author jimmy
     */
    _showProgress(progress){
        let completed = (progress.loaded/progress.total) * 100;
        if (completed > 100) {
            this.setState({
                completed: 100,
            })
        } else {
            this.setState({
                completed: completed,
            })
        }

    }

    /**
     * 选择文件时做处理
     * @method _chooseFile
     * @param  {[type]}    files [description]
     * @return {[type]}          [description]
     * @author jimmy
     */
    _chooseFile(files){
        let file = files[0];

    }

    render() {
        return (
          <div>
            <h2>AddApp</h2>
            
          </div>
        )
    }

}

{/* <FileUpload options={this.options} >
    <RaisedButton
        ref='chooseBtn'
        primary={true}
        disableTouchRipple={true}
        disableFocusRipple={true}
        style={{margin: 12, marginRight: 6}}
        label='选择文件'
        ></RaisedButton>
    <RaisedButton
        ref='uploadBtn'
        primary={true}
        disableTouchRipple={true}
        disableFocusRipple={true}
        style={{margin: 12, marginRight: 6}}
        label='上传'
        ></RaisedButton>
</FileUpload>
<LinearProgress
    mode='determinate'
    value={this.state.completed}
    max={this.state.max}
    min={0}
    ></LinearProgress> */}

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
