'use strict';

import React, { Component } from 'react'
import {request, str} from 'tools';
import {Page} from 'components';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import {TextField} from 'components';
import {deepOrange500, green700, blue500, orange500} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import FileUpload from 'react-fileupload';
import LinearProgress from 'material-ui/LinearProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import {Router, Route, Link, IndexLink} from 'react-router'
import {titleAction} from 'actions';
import { connect } from 'react-redux';


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
    },
    errmsg: {
        color: 'red'
    }
}

module.exports = class AddVersion extends Component {

    constructor(props){
        super(props);
        this.state = {
            containerVersionList: [],
            appId: this.props.appId,
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
            modalOpen: false,
            errmsg: '',
            showErrmsg: false,
            description: '',
        }

        this.options = {
          baseUrl:'/update/upload/uploadfile',
          param:{
              name:'bundle',
              jsMajor: this.state.jsMajor,
              jsMinor: this.state.jsMinor,
              jsPatch: this.state.jsPatch,
              appId: this.state.appId,
              description: this.state.description,
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
          uploadError: this._uploadError,
          uploadFail: this._uploadError,
          beforeUpload: this._beforeUpload,
        }
    }

    _uploadError = (err) => {
        console.log(err, 'ffff');
        if (err.errno != 0) {
            this.setState({
                errmsg: err.data.errmsg,
                completed: 0,
                pageLoading: false,
            });
        }
    }

    _uploadSuccess = (res) => {
        if (res.errno == 0) {
            this.setState({
                errmsg: res.data.errmsg,
                modalOpen: true,
                pageLoading: true,
            });
        }
    }

    _beforeUpload = () => {

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
        if (completed >= 100) {
            this.setState({
                completed: 100,
                pageLoading: true,
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
                this.setState({
                    pageLoading: false,
                    errmsg: err.errorMsg? err.errorMsg : '访问出错了，请重试！',
                });
            }
        )
    }


    handleNext = () => {
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: this.state.stepIndex + 1,
        finished: this.state.stepIndex >= 2,
        errmsg: ''
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
        errmsg: ''
      }));
    }
  }

  /**
   * 选择原生版本号
   * @method
   * @param  {[type]} event [description]
   * @param  {[type]} index [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   * @author jimmy
   */
  _handleVersionSelect = (event, index, value) => {
      this.options.param.miniContainerId = value;
      this.setState({
          selectVersion: value
      });
  }

  /**
   * 版本号变更
   * @method _onTextChange
   * @param  {[type]}      type [description]
   * @param  {[type]}      res  [description]
   * @return {[type]}           [description]
   * @author jimmy
   */
  _onTextChange(type, res){
      switch (type) {
            case 'jsMajor':
                this.options.param.jsMajor = res;
                this.setState({
                    jsMajor: res
                });
              break;
            case 'jsMinor':
                this.options.param.jsMinor = res;
                this.setState({
                    jsMinor: res
                });
                break;
            case 'jsPatch':
                this.options.param.jsPatch = res;
                this.setState({
                    jsPatch: res
                });
                break;
            case 'description':
                this.options.param.description = res;
                this.setState({
                    description: res
                });
                break;
      }
  }

  _checkVersion = () => {
      if (str.isEmpty(this.state.jsMajor) || str.isEmpty(this.state.jsMinor)|| str.isEmpty(this.state.jsPatch)) {
          this.setState({
              errmsg: '请填写完整版本信息'
          });
          return;
      } else {
          this.setState({
              pageLoading: true,
          });
          request(
              '/update/version/isversionexist',
              {
                  appId: this.state.appId,
                  major: this.state.jsMajor,
                  minor: this.state.jsMinor,
                  patch: this.state.jsPatch
              },
              (res) => {
                  if (res) {
                      this.setState({
                          errmsg: '该版本已存在！请填写另外一个版本号',
                          pageLoading: false,
                      });
                  } else {
                      this.setState({
                          pageLoading: false,
                          errmsg: '',
                      });
                      this.handleNext();
                  }
              },
              (err) => {
                  this.setState({
                      pageLoading: false,
                      errmsg: err.errorMsg? err.errorMsg : '访问出错了，请重试！',
                  });
              }
          )
      }

  }

  _checkContainer = () => {
      if (this.state.selectVersion) {
          this.handleNext();
      } else {
          this.setState({
              errmsg: '请选择最小兼容原生版本号',
          });
      }
  }

  /**
   * 渲染每一步的内容
   * @method getStepContent
   * @param  {[type]}       stepIndex [description]
   * @return {[type]}                 [description]
   * @author jimmy
   */
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
            <div style={s.step}>
                <div>
                    <TextField
                       floatingLabelText='主版本号'
                       hintText='请填写主版本号'
                       floatingLabelStyle={s.floatingLabelStyle}
                       floatingLabelFocusStyle={s.floatingLabelFocusStyle}
                       errorStyle={s.errorStyle}
                       type='number'
                       defaultValue={this.state.jsMajor}
                       onChange={(res)=>this._onTextChange('jsMajor', res)}
                       regexp='^[0-9]'
                       errorText='请输入正确的版本号'
                     />
                </div>
                <div>
                    <TextField
                       floatingLabelText='子版本号'
                       hintText='请填写子版本号'
                       floatingLabelStyle={s.floatingLabelStyle}
                       floatingLabelFocusStyle={s.floatingLabelFocusStyle}
                       errorStyle={s.errorStyle}
                       type='number'
                       defaultValue={this.state.jsMinor}
                       onChange={(res)=>this._onTextChange('jsMinor', res)}
                       regexp='^[0-9]'
                       errorText='请输入正确的版本号'
                     />
                </div>
                <div>
                    <TextField
                       floatingLabelText='修正版本号'
                       hintText='请填修正版本号'
                       floatingLabelStyle={s.floatingLabelStyle}
                       floatingLabelFocusStyle={s.floatingLabelFocusStyle}
                       errorStyle={s.errorStyle}
                       type='number'
                       defaultValue={this.state.jsPatch}
                       onChange={(res)=>this._onTextChange('jsPatch', res)}
                       regexp='^[0-9]'
                       errorText='请输入正确的版本号'
                     />
                </div>
                <div>
                    <TextField
                       floatingLabelText='更新说明'
                       hintText='请填修更新说明'
                       multiLine={true}
                       rows={2}
                       defaultValue={this.state.description}
                       onChange={(res)=>this._onTextChange('description', res)}
                     />
                </div>
                <h5 style={s.errmsg}>
                    上述版本号信息都是必填信息，用于标识当前您要上传的资源版本号
                </h5>
                <h4 style={s.errmsg}>{this.state.errmsg}</h4>
                <div style={{marginTop: 24, marginBottom: 12}}>
                  <RaisedButton
                    label='下一步'
                    primary={true}
                    onTouchTap={this._checkVersion}
                  />
                </div>
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
                <h5>
                    选择当前js兼容的最小原生版本号
                </h5>
                <h4 style={s.errmsg}>{this.state.errmsg}</h4>
                <div style={{marginTop: 24, marginBottom: 12}}>
                  <FlatButton
                    label='上一步'
                    onTouchTap={this.handlePrev}
                    style={{marginRight: 12}}
                  />
                  <RaisedButton
                    label='下一步'
                    primary={true}
                    onTouchTap={this._checkContainer}
                  />
                </div>
              </div>
            );
            break;
      case 2:
        return (
          <div>
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
                      label='完成'
                      ></RaisedButton>
              </FileUpload>
              <LinearProgress
                  mode='determinate'
                  value={this.state.completed}
                  max={this.state.max}
                  min={0}
                  ></LinearProgress>
              <h5>
                  上传你打好的最新程序包到服务器，我们会将其中的jsbundle以及必要的静态文件提取出来，用于热更新使用！
              </h5>
              <h4 style={s.errmsg}>{this.state.errmsg}</h4>
              <div style={{marginTop: 24, marginBottom: 12}}>
                <FlatButton
                  label='上一步'
                  onTouchTap={this.handlePrev}
                  style={{marginRight: 12}}
                  primary={true}
                />
              </div>
          </div>
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
                   loading: false,
                   finished: false,
                   stepIndex: 0,
                   selectVersion: '',
                   pageLoading: false,
                   jsMajor: '',
                   jsMinor: '',
                   jsPatch: '',
                   miniContainerId: '',
                   fileName: '',
                   modalOpen: false,
                   errmsg: '',
                   showErrmsg: false,
                   description: '',
               });

               this.props.onTabsChange? this.props.onTabsChange(0) : null;

           }}
         > </FlatButton>
        ,
        ];
        return (
            <Page
                loading={this.state.pageLoading}
            >
            <div style={s.container}>
                <Stepper activeStep={this.state.stepIndex} style={s.stepper}>
                  <Step>
                    <StepLabel>填写版bundle本号</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>选择兼容的最小的原生app版本号</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>上传最新的app并保存</StepLabel>
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
            </Page>
        )
    }

    _goList(){

    }
}
