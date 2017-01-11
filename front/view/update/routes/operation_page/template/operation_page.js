'use strict'

import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {str, request} from 'tools';
import {deepOrange500, green700, lime500, green300, teal800, orange500, blue500} from 'material-ui/styles/colors';
import {Router, Route, Link, IndexLink} from 'react-router'
import FlatButton from 'material-ui/FlatButton';
import {Page, SSnackbar, TextField} from 'components';
import {titleAction} from 'actions';
import { connect } from 'react-redux';
import AddVersion from '../components/add_version';
import VersionList from '../components/version_list';
import ContainerVersionList from '../components/container_version_list';
import Book from 'material-ui/svg-icons/action/book';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import AddBox from 'material-ui/svg-icons/content/add-box';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SwipeableViews from 'react-swipeable-views';
import BookBorder from 'material-ui/svg-icons/action/bookmark-border';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';

const muiTheme = getMuiTheme({
    palette: {
      accent1Color: deepOrange500,
      primary1Color: teal800,
    },
});

let s = {
    tabs: {
        padding: 10,
        backgroudColor: '#f0f0f0'
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
    step: {
        flex: 1
    },
    errmsg: {
        color: 'red'
    }
}


class OperationPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            appId: this.props.params.appId,
            loading: true,
            slideIndex: 0,
            showDialog: false,
            errmsg: '',
            jsMajor: '',
            jsMinor: '',
            jsPatch: '',
            description: '',
            snackOpen: false
        }
    }

    componentDidMount() {
        this.props.setTitle('版本操作');
        this._getData();
    }

    // componentWillMount() {
    //     this.props.setTitle('版本操作');
    //     this._getData();
    // }

    _addNewContainerVersion = () => {
        console.log('ssss');
        this.setState({
            showDialog: true,
            errmsg: '',
            jsMajor: '',
            jsMinor: '',
            jsPatch: '',
            description: '',
        })
    }

    _getData = () => {
        request(
            '/update/app/getappinfobyid',
            {
                appId: this.state.appId,
            },
            (res) => {
                this.setState({
                    data: res,
                    loading: false
                });
            },
            (err) => {
                this.setState({
                    loading: false,
                    errmsg: err.errorMsg? err.errorMsg : '访问出错了，请重试！',
                });
            }
        )
    }

    _handleChange = (value, refresh) => {
        this.setState({
          slideIndex: value,
          snackOpen: false,
          showDialog: false
        });
     };

    render(){

        let actions = [
            <FlatButton
                label='取消'
                secondary={true}
                keyboardFocused={false}
                onTouchTap={() => {
                    this.setState({
                        showDialog: false
                    });
                }}
            ></FlatButton>,
            <RaisedButton
                label='确定'
                primary={true}
                keyboardFocused={false}
                onTouchTap={this._checkAndAddVersion}
            ></RaisedButton>
        ];
        return (
            <Page
                loading={this.state.loading}
                muiTheme={muiTheme}
            >
                <Card
                    style={{textAlign: 'center'}}
                >
                <CardHeader
                  title={this.state.data? this.state.data.app_name : ''}
                  avatar={this.state.data? this.state.data.icon : ''}
                  titleStyle={{
                      fontSize: 36,
                      color: green700
                  }}
                  subtitle={this.state.data? this.state.data.description : ''}
                />
                <CardActions>
                  <RaisedButton label='发布新版本' primary={true} onTouchTap={() => {
                          this.setState({
                              slideIndex: 1
                          })
                      }} />
                  <RaisedButton label='添加原生版本' backgroundColor={green700} onTouchTap={this._addNewContainerVersion} />
                </CardActions>
                </Card>
                <Tabs
                    style={s.tabs}
                    onChange={this._handleChange}
                    value={this.state.slideIndex}
                >
                    <Tab
                      icon={<Book color={green700} />}
                      label='版本列表'
                      value={0}
                    >
                    </Tab>
                    <Tab
                      icon={<AddCircle color={green700} />}
                      label='发布新版本'
                      value={1}
                    >
                    </Tab>
                    <Tab
                      icon={<BookBorder color={green700} />}
                      label='原生版本列表'
                      value={2}
                    >
                    </Tab>
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this._handleChange}
                >
                    <VersionList
                        appId={this.state.appId}
                        onTabsChange={this._handleChange}
                        index={this.state.slideIndex}
                    ></VersionList>
                    <AddVersion
                        appId={this.state.appId}
                        onTabsChange={this._handleChange}
                        index={this.state.slideIndex}
                    ></AddVersion>
                    <ContainerVersionList
                        appId={this.state.appId}
                        onTabsChange={this._handleChange}
                        index={this.state.slideIndex}
                    ></ContainerVersionList>
                </SwipeableViews>

                <Dialog
                    title='添加原生版本号'
                    actions={actions}
                    modal={false}
                    open={this.state.showDialog}
                    onRequestClose={this.handleClose}
                >
                    {this._renderAddContent()}
                </Dialog>
            </Page>

        )
    }


    /**
     * 检查版本号是否合法，并提交添加
     * @method
     * @return {[type]} [description]
     * @author jimmy
     */
    _checkAndAddVersion = () => {
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
                '/update/container_version/containerversionexist',
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
                        request(
                            '/update/container_version/add',
                            {
                                appId: this.state.appId,
                                bundleId: this.state.data.bundle_id,
                                major: this.state.jsMajor,
                                minor: this.state.jsMinor,
                                patch: this.state.jsPatch
                            },
                            (res) => {
                                this.setState({
                                    errmsg: '添加原生版本成功',
                                    pageLoading: false,
                                    snackOpen: true,
                                    showDialog: false
                                });
                                setTimeout(() => {
                                    this._handleChange(2, true)
                                }, 1000);

                            },
                            (err) => {
                                this.setState({
                                    pageLoading: false,
                                    errmsg: err.errorMsg? err.errorMsg : '访问出错了，请重试！',
                                });
                            }
                        );
                    }
                },
                (err) => {
                    this.setState({
                        pageLoading: false,
                        errmsg: err.errorMsg? err.errorMsg : '访问出错了，请重试！',
                    });
                }
            );
        }
    }
    /**
     * 渲染添加原生版本的弹窗内容
     * @method
     * @return {[type]} [description]
     * @author jimmy
     */
    _renderAddContent = () => {
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
                    上述版本号信息都是必填信息
                </h5>
                <h4 style={s.errmsg}>{this.state.errmsg}</h4>
                <Snackbar
                    open={this.state.snackOpen}
                    message={this.state.errmsg}
                    autoHideDuration={1000}
                    onRequestClose={this._handleRequestClose}
                ></Snackbar>
           </div>
        )
    }


    /**
     * 关闭吐司
     * @method
     * @return {[type]} [description]
     * @author jimmy
     */
    _handleRequestClose = () => {
        this.setState({
            snackOpen: false,
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
              case 'description':
                  this.setState({
                      description: res
                  });
                  break;
        }
    }
};

let setState = (state) => {
    return {
        titleReducer: state.titleReducer,
    }
};

let setAction = (dispatch) => {
    return {
        setTitle: (title) => dispatch(titleAction.setTitle(title))
    }
}
module.exports = connect(setState, setAction)(OperationPage);
