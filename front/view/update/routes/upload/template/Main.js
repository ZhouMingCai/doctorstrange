/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500, orange500, blue500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FileUpload from 'react-fileupload';
import LinearProgress from 'material-ui/LinearProgress';



const styles = {
  container: {
    flex: 1,
    textAlign: 'center',
    paddingTop: 10,
    alignItems: 'center'
  },
  stepperContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  stepper: {
      flex: 1,
      alignItems: 'flex-start',
  },
  paper: {
      flex: 1,
      width: 400,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'inline-block',
      margin: 20
  },
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },

};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      title: '应用上传',
      finished: false,
      stepIndex: 0,
      bundleId: '', //应用bundleId
      containerMajor: '',//原生app主版本
      containerMinor: '',//原生次版本
      containerPatch: '',//原生修正版本
      jsMajor: '',//js主版本
      jsMinor: '',//js次版本
      jsPatch: '',//js修正版本
      descreption: '',//应用描述
      jsFileName: '',//js文件名,
      fileShowName: '',//选择的文件名
      fileName: '',//返回的文件名
      completed: 0,//
    };
    this.options = {
      baseUrl:'/update/upload/uploadfile',
      param:{
          name:'bundle'
      },
      chooseAndUpload: true,
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
    this.timeout = 0;
  }

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
   * 用户选择文件时的名字
   * @method _chooseFile
   * @param  {[type]}    files [description]
   * @return {[type]}          [description]
   * @author jimmy
   */
  _chooseFile(files){
      console.log(files[0]);
      this.setState({
          fileShowName: files[0].name,
      });
  }
  /**
   * 前往下一步
   * @method handleNext
   * @return {[type]}   [description]
   * @author jimmy
   */
  handleNext(){
      let stepIndex = this.state.stepIndex + 1;
      this.setState({
          stepIndex: stepIndex,
          finished: stepIndex >= 2,
      })

  }

  /**
   * 前往上一步
   * @method handlePrev
   * @return {[type]}   [description]
   * @author jimmy
   */
  handlePrev(){
      if (this.state.stepIndex > 0) {
          let stepIndex = this.state.stepIndex - 1;
          this.setState({
              stepIndex: stepIndex,
              finished: stepIndex >= 2,
          })
      }
  }


  /**
   * 渲染下一步操作区域
   * @method renderStepActions
   * @param  {[type]}          step [description]
   * @return {[type]}               [description]
   * @author jimmy
   */
  renderStepActions(step) {
    let stepIndex  = this.state.stepIndex;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? '确认并上传' : '下一步'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext.bind(this)}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <RaisedButton
            label="返回上一步"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev.bind(this)}
          />
        )}
      </div>
    );
  }

  /**
   * 根据类型不同监听输入框
   * @method _onTextChange
   * @param  {[type]}      type [description]
   * @param  {[type]}      res  [description]
   * @return {[type]}           [description]
   * @author jimmy
   */
  _onTextChange(type: String, res: String){
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
          if (res || res == 0) {
              switch (type) {
                  case 'bundleId':
                        this.setState({
                            bundleId: res,
                        });
                      break;
                  case 'containerMajor':
                        this.setState({
                            containerMajor: res,
                        });
                      break;
                  case 'containerMinor':
                        this.setState({
                            containerMinor: res,
                        });
                      break;
                  case 'containerPatch':
                        this.setState({
                            containerPatch: res,
                        });
                      break;
                  case 'jsMajor':
                        this.setState({
                            jsMajor: res,
                        });
                      break;
                  case 'jsMinor':
                        this.setState({
                            jsMinor: res,
                        });
                      break;
                  case 'jsPatch':
                        this.setState({
                            jsPatch: res,
                        });
                      break;
                  case 'description':
                        this.setState({
                            description: res,
                        });
                      break
              }
          }

      }, 500)

  }


  render() {
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div style={styles.container}>
              <AppBar
                  title={this.state.title}
                  iconClassNameRight='muidocs-icon-navigation-expand-more'
              ></AppBar>
          <div style={styles.stepperContainer}>
                  <Stepper activeStep={this.state.stepIndex} orientation='vertical' style={styles.stepper}>
                      <Step>
                          <StepLabel>填写原生app版本号</StepLabel>
                          <StepContent>
                              <Paper
                                  zDepth={2}
                                  rounded={false}
                                  style={styles.paper}
                              >
                              <TextField
                                 floatingLabelText='应用bundleId'
                                 hintText='请填写应用bindleId'
                                 floatingLabelStyle={styles.floatingLabelStyle}
                                 floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                 errorStyle={styles.errorStyle}
                                 onChange={(res)=>this._onTextChange('bunldeId', res)}
                               />
                              <TextField
                                 floatingLabelText='主版本号'
                                 hintText='请填写主版本号'
                                 floatingLabelStyle={styles.floatingLabelStyle}
                                 floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                 errorStyle={styles.errorStyle}
                                 type='number'
                                 onChange={(res)=>this._onTextChange('containerMajor', res)}
                               />
                               <TextField
                                  floatingLabelText='子版本号'
                                  hintText='请填写子版本号'
                                  floatingLabelStyle={styles.floatingLabelStyle}
                                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                  errorStyle={styles.errorStyle}
                                  type='number'
                                  onChange={(res)=>this._onTextChange('containerMinor', res)}

                                />
                                <TextField
                                   floatingLabelText='修正版本号'
                                   hintText='请填修正版本号'
                                   floatingLabelStyle={styles.floatingLabelStyle}
                                   floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                   errorStyle={styles.errorStyle}
                                   type='number'
                                   onChange={(res)=>this._onTextChange('containerPatch', res)}
                                 />
                                 <TextField
                                   floatingLabelText='应用描述'
                                   hintText='请填应用描述'
                                   multiLine={true}
                                   rowsMax={5}
                                   floatingLabelStyle={styles.floatingLabelStyle}
                                   floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                   onChange={(res)=>this._onTextChange('appDescreption', res)}
                                   style={{
                                       textAlign: 'left'
                                   }}
                                 />
                              </Paper>
                              {this.renderStepActions(0)}
                          </StepContent>
                      </Step>
                      <Step>
                          <StepLabel>填写js版本号</StepLabel>
                          <StepContent>
                              <Paper
                                  zDepth={3}
                                  rounded={false}
                                  style={styles.paper}
                              >
                                  <TextField
                                     floatingLabelText='主版本号'
                                     hintText='请填写主版本号'
                                     floatingLabelStyle={styles.floatingLabelStyle}
                                     floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                     errorStyle={styles.errorStyle}
                                     type='number'
                                     onChange={(res)=>this._onTextChange('jsMajor', res)}
                                   />
                                   <TextField
                                      floatingLabelText='子版本号'
                                      hintText='请填写子版本号'
                                      floatingLabelStyle={styles.floatingLabelStyle}
                                      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                      errorStyle={styles.errorStyle}
                                      type='number'
                                      onChange={(res)=>this._onTextChange('jsMinor', res)}

                                    />
                                    <TextField
                                       floatingLabelText='修正版本号'
                                       hintText='请填修正版本号'
                                       floatingLabelStyle={styles.floatingLabelStyle}
                                       floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                       errorStyle={styles.errorStyle}
                                       type='number'
                                       onChange={(res)=>this._onTextChange('jsPatch', res)}
                                     />
                              </Paper>
                              {this.renderStepActions(1)}
                          </StepContent>
                      </Step>
                      <Step>
                          <StepLabel>上传js文件</StepLabel>
                          <StepContent>
                              <FileUpload options={this.options} >
                                  <RaisedButton
                                      ref='chooseAndUpload'
                                      primary={true}
                                      disableTouchRipple={true}
                                      disableFocusRipple={true}
                                      style={{margin: 12, marginRight: 6}}
                                      label='选择文件'
                                      ></RaisedButton>
                              </FileUpload>
                              <TextField
                                  disabled={true}
                                  value={this.state.fileShowName || '请选择文件'}
                                />
                                <LinearProgress
                                    mode='determinate'
                                    value={this.state.completed}
                                    max={this.state.max}
                                    min={0}
                                    ></LinearProgress>
                              {this.renderStepActions(2)}
                          </StepContent>
                      </Step>
                  </Stepper>
              </div>
          </div>
        </MuiThemeProvider>
    );
  }
}

export default Main;
