import React, {Component} from 'react'
import s from './login_sign_up.style';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import ActionAssignmentInd from 'material-ui/svg-icons/action/assignment-ind';
import ActionInput from 'material-ui/svg-icons/action/input';
import {green800, green500, green600, green900} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import {TextField} from '../../../../../components';
import {request} from '../../../../../tools';

module.exports = class LoginSignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectValue: props.params.tabValue || 'signUp',
            userName: '',//用户名
            password: '',//密码
            email: '', //邮箱
            phone: '', //联系电话
            comfirmPass: '',//确认密码
            errorMsg: '',
            errorMsgSign: ''
        }
        this.timeout = 0;
    }

    _onchangeTab(value){
        if (value == 'signUp' || value == 'login') {
            this.setState({
                selectValue: value
            })
        }
    }

    _onNameChange(res){
        this.setState({
            userName: res
        });
    }

    _onPassordChange(res){
        this.setState({
            password: res
        })
    }

    _onComfirmPassChange(res){
        this.setState({
            comfirmPass: res
        })
    }

    _onEmailChange(res){
        this.setState({
            email: res,
        })
    }

    _onPhoneChange(res){
        this.setState({
            phone: res
        })
    }

    _loginSubmitAction(){
        this.setState({
            errorMsgSign: ''
        });
        if (this.state.userName && this.state.password) {
            request('/home/login/login',
                {
                    userName: this.state.userName,
                    password: this.state.password,
                },
                (res) => {
                    console.log('success', res);
                },
                (err) => {
                    console.log(err);
                    this.setState({
                        errorMsg: err.errmsg,
                    });
                    console.log(this.state.errorMsg);
                }
            )
        }
    }

    _signUpSubmitAction(){
        this.setState({
            errorMsg: ''
        });
        if (this.state.userName && this.state.password && this.state.password == this.state.comfirmPass) {
            request('/home/register',
                {
                    userName: this.state.userName,
                    password: this.state.password,
                    email: this.state.email,
                    phone: this.state.phone
                },
                (res) => {
                    alert(res);
                },
                (err) => {
                    console.log(err);
                    this.setState({
                        errorMsgSign: err.errmsg,
                    });
                }
            )
        }
    }

    render() {
      return (
        <div style={s.container}>
            <div style={s.inputContainer}>
                <Tabs
                    tabItemContainerStyle={s.tabItemContainerStyle}
                    onChange={(value) => this._onchangeTab(value)}
                    value={this.state.selectValue}
                >
                    <Tab
                        label='注册'
                        value='signUp'
                        style={s.tab}
                        icon={
                            <div>
                                <ActionAssignmentInd
                                    color={this.state.selectValue == 'signUp'? green900 : '#4BB25F'}
                                    hoverColor={green900}
                                ></ActionAssignmentInd>
                            </div>}
                    >
                        <TextField
                            style={s.input}
                            floatingLabelText='用户名'
                            hintText='请输入用户名'
                            floatingLabelStyle={s.floatingLabelStyle}
                            floatingLabelFocusStyle={s.floatingLabelFocusStyle}
                            underlineFocusStyle={s.underlineStyle}
                            type='text'
                            regexp='^[A-Za-z0-9]+$'
                            errorText='请输入正确的用户名（不能为空，且含只能含数字和英文字符）'
                            onChange={this._onNameChange.bind(this)}
                            /><br />

                        <TextField
                            style={s.input}
                            floatingLabelText='邮箱'
                            hintText='请输入您的常用邮箱'
                            floatingLabelStyle={s.floatingLabelStyle}
                            floatingLabelFocusStyle={s.floatingLabelFocusStyle}
                            underlineFocusStyle={s.underlineStyle}
                            type='email'
                            regexp='^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$'
                            errorText='请输入正确的电子邮箱'
                            onChange={this._onEmailChange.bind(this)}
                            /><br />

                        <TextField
                            style={s.input}
                            floatingLabelText='联系电话'
                            hintText='请输入您的联系电话'
                            floatingLabelStyle={s.floatingLabelStyle}
                            floatingLabelFocusStyle={s.floatingLabelFocusStyle}
                            underlineFocusStyle={s.underlineStyle}
                            onChange={this._onPhoneChange.bind(this)}
                            regexp='^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}$'
                            errorText='请输入正确的手机号码'
                            /><br />

                        <TextField
                            style={s.input}
                            floatingLabelText='密码'
                            hintText='请输入您的登录密码'
                            floatingLabelStyle={s.floatingLabelStyle}
                            floatingLabelFocusStyle={s.floatingLabelFocusStyle}
                            underlineFocusStyle={s.underlineStyle}
                            type='password'
                            regexp='^.*[^\s]+.*$'
                            errorText='登录密码不能为空'
                            onChange={this._onPassordChange.bind(this)}
                            /><br />
                        <TextField
                            style={s.input}
                            floatingLabelText='确认密码'
                            hintText='请输入您的登录密码'
                            floatingLabelStyle={s.floatingLabelStyle}
                            floatingLabelFocusStyle={s.floatingLabelFocusStyle}
                            underlineFocusStyle={s.underlineStyle}
                            type='password'
                            regexp={'^'+this.state.password+'$'}
                            errorText='两次输入的密码不一致'
                            onChange={this._onComfirmPassChange.bind(this)}
                            /><br />
                        {
                            this.state.errorMsgSign?
                            <div style={s.errorMsg}>
                                {this.state.errorMsgSign}
                            </div> : null
                        }
                        <div style={s.btnContainer}>
                            <RaisedButton label='确认注册' style={s.submitBtn} secondary={true} onClick={this._signUpSubmitAction.bind(this)}></RaisedButton>
                        </div>
                    </Tab>
                    <Tab
                        label='登录'
                        value='login'
                        style={s.tab}
                        icon={
                            <div>
                                <ActionInput
                                    color={this.state.selectValue == 'login'? green900 : '#4BB25F'}
                                    hoverColor={green900}
                                ></ActionInput>
                            </div>

                        }
                    >
                        <TextField
                            style={s.input}
                            floatingLabelText='用户名'
                            hintText='请输入用户名、邮箱或手机号码'
                            floatingLabelStyle={s.floatingLabelStyle}
                            floatingLabelFocusStyle={s.floatingLabelFocusStyle}
                            underlineFocusStyle={s.underlineStyle}
                            type='text'
                            regexp='^[A-Za-z0-9]+$'
                            errorText='请输入正确的用户名（不能为空，且含只能含数字和英文字符）'
                            onChange={this._onNameChange.bind(this)}
                            /><br />
                        <TextField
                            style={s.input}
                            floatingLabelText='密码'
                            hintText='请输入您的登录密码'
                            floatingLabelStyle={s.floatingLabelStyle}
                            floatingLabelFocusStyle={s.floatingLabelFocusStyle}
                            underlineFocusStyle={s.underlineStyle}
                            type='password'
                            regexp='^.*[^\s]+.*$'
                            errorText='登录密码不能为空'
                            onChange={this._onPassordChange.bind(this)}
                            /><br />
                            {
                                this.state.errorMsg?
                                <div style={s.errorMsg}>
                                    {this.state.errorMsg}
                                </div> : null
                            }
                            <div style={s.btnContainer}>
                                <RaisedButton label='登录' style={s.submitBtn} secondary={true} onClick={this._loginSubmitAction.bind(this)}></RaisedButton>
                            </div>
                    </Tab>
                </Tabs>

            </div>
        </div>
      )
    }
};
