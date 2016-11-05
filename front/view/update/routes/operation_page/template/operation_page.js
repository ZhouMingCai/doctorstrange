'use strict'

import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {str, request} from 'tools';
import {deepOrange500, green700, lime500, green300, teal800} from 'material-ui/styles/colors';
import {Router, Route, Link, IndexLink} from 'react-router'
import FlatButton from 'material-ui/FlatButton';
import {Page} from 'components';
import {titleAction} from 'actions';
import { connect } from 'react-redux';
import AddVersion from '../components/add_version';
import VersionList from '../components/version_list';
import Book from 'material-ui/svg-icons/action/book';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import AddBox from 'material-ui/svg-icons/content/add-box';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SwipeableViews from 'react-swipeable-views';
import BookBorder from 'material-ui/svg-icons/action/bookmark-border';

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
    }
}


class OperationPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            appId: this.props.params.appId,
            loading: true,
            slideIndex: 0,
        }
    }

    componentDidMount() {
        this.props.setTitle('版本操作');
        this._getData();
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
        });
     };

    render(){
        return (
            <Page
                loading={this.state.loading}
                muiTheme={muiTheme}
            >
                <Card>
                <CardHeader
                  title="URL Avatar"
                  subtitle="Subtitle"
                  actAsExpander={true}
                  showExpandableButton={true}
                />
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
                    <div>Addddd</div>
                </SwipeableViews>
            </Page>

        )
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
