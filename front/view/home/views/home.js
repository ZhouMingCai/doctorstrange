import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import s from './home.style';
import {Link} from 'react-router'
import {Page} from '../../../components';

module.exports = class Home extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let registeryElement = <Link to='loginOrSiginUp/signUp' style={s.link} onClick={() => this.props.changeTitle(5)}>注册</Link>;

        return (
            <Page
                loading={false}
            >
                <div style={s.container}>
                    <div style={s.content}>
                        <a style={s.logo} href='http://www.songxiaocai.com'>
                            <img src='http://www.songxiaocai.com/images/logo.png' alt='及时更新'/>
                        </a>
                        <div style={s.desc}>
                            React Native 应用热更新服务
                        </div>
                        <div style={s.subDesc}>
                            a hot update service for HangZhou XiaoNong tech Ltd.
                        </div>
                        <RaisedButton
                            secondary={true}
                            style={s.mainBtn}
                            labelColor='#80B4A7'
                            labelStyle={s.mainBtnLabel}
                            label={registeryElement}
                        ></RaisedButton>
                    </div>
                </div>
            </Page>
        )
    }
}
