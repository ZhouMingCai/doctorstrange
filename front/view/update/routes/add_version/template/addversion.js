'use strict';

import React, { Component } from 'react'
import {request, str} from '../../../../../tools';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500, green700, blue500, orange500} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import FileUpload from 'react-fileupload';
import LinearProgress from 'material-ui/LinearProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import AppBundleInfo from 'app-bundle-info';


const s = {
    container: {
        width: '100%',
        maxWidth: 700,
        margin: 'auto'
    },
    stepper: {
        flex: 1,
    },
    step: {
        flex: 1
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
    contentStyle: {
        justifyContent: 'center',
        textAlign: 'center',
        flex: 1,
        margin: '0 16px',
    },
    selectStyle: {
        textAlign: 'left',
    },
    pageLoading: {
        flex: 1,
    },
    loading: {
        whidth: '100%',
        height: '100%',
        textAlign: 'center',
    }
}

const muiTheme = getMuiTheme({
    palette: {
      accent1Color: green700,
      primary1Color: green700,
    },
});

const fileReader = new FileReader();

class AddVersion extends Component {

    constructor(props){
        super(props);
        this.state = {
            containerVersionList: [],
            appId: this.props.params.appId,
            loading: false,
            finished: false,
            stepIndex: 0,
            selectVersion: '',
            pageLoading: true,
            jsMajor: '',
            jsMinor: '',
            jsPatch: '',
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
              console.log(files);
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
     * 选择文件时做处理
     * @method _chooseFile
     * @param  {[type]}    files [description]
     * @return {[type]}          [description]
     * @author jimmy
     */
    _chooseFile(files){

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

    componentDidMount() {
        this._getData();
    }

    _getData(){
        request(
            '/update/container_version/getversionlistbyappid',
            {
                appId: this.state.appId,
            },
            (res) => {
                this.setState({
                    containerVersionList: str.arrIsEmpty(res)? [] : res,
                    pageLoading: false
                });
            },
            (err) => {
                console.log(err);
            }
        )
    }


    handleNext = () => {
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: this.state.stepIndex + 1,
        finished: this.state.stepIndex >= 2,
      }));
    }
  }

  dummyAsync(cb){
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  }

  handlePrev(){
    let stepIndex = this.state.stepIndex;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  }

  _handleVersionSelect(event, index, value){
      this.setState({
          selectVersion: value
      });
  }

  _onTextChange(type, res){
      switch (type) {
            case 'jsMajor':
                this.setState({
                    jsMajor: res
                });
              break;
            case 'jsMinor':
                this.setState({
                    jsMinor: res
                });
                break;
            case 'jsPatch':
                this.setState({
                    jsPatch: res
                });
                break;
      }
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
            <div style={s.step}>
                <TextField
                   floatingLabelText='主版本号'
                   hintText='请填写主版本号'
                   floatingLabelStyle={s.floatingLabelStyle}
                   floatingLabelFocusStyle={s.floatingLabelFocusStyle}
                   errorStyle={s.errorStyle}
                   type='number'
                   onChange={(res)=>this._onTextChange('jsMajor', res)}
                 />
                <br/>
                 <TextField
                    floatingLabelText='子版本号'
                    hintText='请填写子版本号'
                    floatingLabelStyle={s.floatingLabelStyle}
                    floatingLabelFocusStyle={s.floatingLabelFocusStyle}
                    errorStyle={s.errorStyle}
                    type='number'
                    onChange={(res)=>this._onTextChange('jsMinor', res)}
                  />
                  <br/>
                  <TextField
                     floatingLabelText='修正版本号'
                     hintText='请填修正版本号'
                     floatingLabelStyle={s.floatingLabelStyle}
                     floatingLabelFocusStyle={s.floatingLabelFocusStyle}
                     errorStyle={s.errorStyle}
                     type='number'
                     onChange={(res)=>this._onTextChange('jsPatch', res)}
                   />
           </div>
        );
        break;
      case 1:
          if (str.arrIsEmpty(this.state.containerVersionList)) {

          } else return (
              <div>
                <SelectField
                    value={this.state.selectVersion}
                    onChange={this._handleVersionSelect.bind(this)}
                    floatingLabelText='最小原生版本号'
                    hintText='请选择'
                    floatingLabelStyle={s.floatingLabelStyle}
                    floatingLabelFocusStyle={s.floatingLabelFocusStyle}
                    errorStyle={s.errorStyle}
                    autoWidth={true}
                    style={s.selectStyle}
                >
                    {
                        this.state.containerVersionList.map((item, key) => {
                            return (
                                <MenuItem value={item.id} key={key} label={item.version_str} primaryText={item.version_str} />
                            )
                        })
                    }
                </SelectField>
              </div>
            );
            break;
      case 2:
        return (
          <p>
              <FileUpload options={this.options} >
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
                  ></LinearProgress>
          </p>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.state;

    if (finished) {
      return (
        <div style={s.contentStyle}>
          <p>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        </div>
      );
    }

    return (
      <div style={s.contentStyle}>
        {this.getStepContent(stepIndex)}
        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label='上一步'
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev.bind(this)}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === 2 ? '完成' : '下一步'}
            primary={true}
            onTouchTap={this.handleNext}
          />
        </div>
      </div>
    );
  }


    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                {
                    this.state.pageLoading?
                    <div style={s.loading}>
                        <CircularProgress size={2} style={s.pageLoading}/>
                    </div>
                    :
                    <div style={s.container}>
                        <Stepper activeStep={this.state.stepIndex} style={s.stepper}>
                          <Step>
                            <StepLabel>填写版bundle本号</StepLabel>
                          </Step>
                          <Step>
                            <StepLabel>选择兼容的最小的原生app版本号</StepLabel>
                          </Step>
                          <Step>
                            <StepLabel>上传jsbundle并保存</StepLabel>
                          </Step>
                        </Stepper>
                        <ExpandTransition loading={this.state.loading} open={true}>
                          {this.renderContent()}
                        </ExpandTransition>
                      </div>
                }

            </MuiThemeProvider>
        )
    }

}

module.exports = AddVersion
