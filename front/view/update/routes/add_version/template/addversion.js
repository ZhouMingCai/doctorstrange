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
import Dialog from 'material-ui/Dialog';
import {Router, Route, Link, IndexLink} from 'react-router'



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
            miniContainerId: '',
            fileName: '',
            modalOpen: false
        }

        this.options = {
          baseUrl:'/update/upload/uploadfile',
          param:{
              name:'bundle',
              jsMajor: this.state.jsMajor,
              jsMinor: this.state.jsMinor,
              jsPatch: this.state.jsPatch,
              appId: this.state.appId,
              miniContainerId: this.state.selectVersion
          },
          chooseAndUpload: false,
          accept: 'bunble/*',
          dataType: 'json',
          multiple: false,
          fileFieldName: 'bundle',
          chooseFile: (files) => this._chooseFiles(files),
          uploading: (progress, mill) => this._showProgress(progress),
          doUpload: (files,mill,xhrID) => {

          },
          uploadSuccess: this._uploadSuccess,
          uploadError: (err) => {
              alert(err.errmsg)
          },
          uploadFail: (res)=> {
              alert(err.errmsg)
          }
        }
    }

    _uploadSuccess = (res) => {
        if (res.errno == 0) {
            this.setState({
                errmsg: res.data.errmsg,
                modalOpen: true
            });
        }
    }

    /**
     * 显示进度条
     * @method _showProgress
     * @param  {[type]}      progress [description]
     * @return {[type]}               [description]
     * @author jimmy
     */
    _showProgress = (progress) => {
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

  _chooseFiles = (files) => {
      let file = files[0];
      let name = file.name;
      this.setState({
          fileName: name,
      })
  }

  dummyAsync = (cb) => {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  }

  handlePrev = () => {
    let stepIndex = this.state.stepIndex;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  }

  _handleVersionSelect = (event, index, value) => {
      this.options.param.miniContainerId = value;
      this.setState({
          selectVersion: value
      });
  }

  _onTextChange(type, res){
      switch (type) {
            case 'jsMajor':
                this.options.param.jsMajor = res.target.value;
                this.setState({
                    jsMajor: res.target.value
                });
              break;
            case 'jsMinor':
                this.options.param.jsMinor = res.target.value;
                this.setState({
                    jsMinor: res.target.value
                });
                break;
            case 'jsPatch':
                this.options.param.jsPatch = res.target.value;
                this.setState({
                    jsPatch: res.target.value
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
                   value={this.state.jsMajor}
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
                    value={this.state.jsMinor}
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
                     value={this.state.jsPatch}
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
                    onChange={this._handleVersionSelect}
                    floatingLabelText='最小原生版本号'
                    hintText='请选择'
                    floatingLabelStyle={s.floatingLabelStyle}
                    floatingLabelFocusStyle={s.floatingLabelFocusStyle}
                    errorStyle={s.errorStyle}
                    autoWidth={true}
                    style={s.selectStyle}
                    value={this.state.selectVersion}
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
              <TextField
                  disabled={true}
                  value={this.state.fileName}
                  hintText='请选择！'
              ></TextField>
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
            onTouchTap={this.handlePrev}
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
        let actions = [
         <FlatButton
           label='确定'
           primary={true}
           keyboardFocused={true}
           onTouchTap={() => {
               this.setState({
                   modalOpen: false
               });
               this.props.history.push('versionlist/'+this.state.appId)
           }}
         > </FlatButton>
        ,
        ];
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
                        <Dialog
                          title='提示'
                          actions={actions}
                          modal={false}
                          open={this.state.modalOpen}
                          onRequestClose={() => this.setState({
                              modalOpen: false
                          })}
                        >
                          操作成功！
                       </Dialog>
                     </div>
                }



            </MuiThemeProvider>
        )
    }

    _goList(){

    }
}

module.exports = AddVersion
