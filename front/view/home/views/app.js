
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import {Router, Route, Link, IndexLink} from 'react-router'
import Home from './home';
import s from './app.style';
import {userAction} from '../../../actions';
import { connect } from 'react-redux'
import {Page} from '../../../components';



module.exports = class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showMenu: false,
      valueSingle: '1',
      title: '热更新'
    };
    this.titleList = [
        '热更新',
        '帮助',
        '关于',
    ]
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  _toggolMenu(){
      this.setState({
          showMenu: !this.state.showMenu,
      });
  }

  handleChangeSingle(event, value){
      this.setState({
          valueSingle: value,
          title: this.titleList[value-1],
      });
  }

  _renderMenu(){
      return (
          <IconMenu
             iconButtonElement={
                 <IconButton>
                     <ContentFilter
                         color='#FFFFFF'
                     />
                 </IconButton>
             }
             menuStyle={s.menu}
             onChange={(event, value) => this.handleChangeSingle(event, value)}
             value={this.state.valueSingle}
             multiple={false}
             targetOrigin={{
                 vertical: 'bottom',
                 horizontal: 'right',
             }}
           >
             <MenuItem value='1'>
                 <IndexLink to='/' style={s.link} activeStyle={s.activeLink}>首页</IndexLink>
             </MenuItem>
             <MenuItem value='2'>
                 <Link to='help' style={s.link} activeStyle={s.activeLink} >帮助</Link>
             </MenuItem>
             <MenuItem value='3'>
                 <Link to='about' style={s.link} activeStyle={s.activeLink} >关于</Link>
             </MenuItem>
           </IconMenu>
      )

  }

  _changeTitle(value){
      this.setState({
          valueSingle: value,
          title: this.titleList[value-1],
      })
  }
  _renderRightEvent(){
      let loginElement = <Link to='loginOrSiginUp/login' style={s.link} onClick={() => this._changeTitle(4)}>登录</Link>;
      let registeryElement = <Link to='loginOrSiginUp/signUp' style={s.link} onClick={() => this._changeTitle(5)}>注册</Link>;

      return (
          <div>
              <FlatButton label={loginElement} primary={true} labelStyle={{color: 'white'}} style={{marginLeft: 10}}/>
              <FlatButton label={registeryElement} primary={true} labelStyle={{color: 'white'}} style={{marginLeft: 10}}/>
          </div>
      )
  }

  render() {
    return (
        <Page>
          <div style={s.container}>
              <AppBar
                  title={this.state.title}
                  iconClassNameRight='muidocs-icon-navigation-expand-more'
                  onLeftIconButtonTouchTap={() => this._toggolMenu()}
                  iconElementLeft={this._renderMenu()}
                  iconElementRight={this._renderRightEvent()}
                  style={s.appBar}
              ></AppBar>
          {this.props.children || <Home changeTitle={this._changeTitle.bind(this)}></Home>}
          </div>
      </Page>
    );
  }
}


// export default Main;
