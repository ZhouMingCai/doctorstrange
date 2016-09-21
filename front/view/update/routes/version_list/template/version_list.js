'use strict'

import React, {Component} from 'react';
import {str, request} from 'tools';
import {deepOrange500, green700, blue50} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Book from 'material-ui/svg-icons/action/book';
import BookBorder from 'material-ui/svg-icons/action/bookmark-border';
import AccessTime from 'material-ui/svg-icons/device/access-time';
import Location from 'material-ui/svg-icons/communication/location-on';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Router, Route, Link, IndexLink} from 'react-router'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FlatButton from 'material-ui/FlatButton';
import {Page} from 'components';
import {titleAction} from 'actions';
import { connect } from 'react-redux';

const s = {
    addBtnPosition: {
        position: 'absolute',
        bottom: 300,
        right: 100,
        zDepth: 0
    },
    listItemStyle: {
        backgroundColor: '#e5e5e5',
        marginBottom: '2px'
    },
    pageBottom: {
        textAlign: 'center',
        padding: '5px'
    },
    pageNumBtn: {
        width: 10,
    }
}

class VersionList extends Component{
    constructor(props){
        super(props);

        this.state = {
            pageNum: 1,
            limit: 10,
            appId: this.props.params.appId,
            dataList: [],
            totalPage: 0,
            count: 0,
            loading: false
        }

    }

    componentDidMount() {
        this.props.setTitle('版本列表');
        this._getData();
    }


    _getData(num){
        this.setState({
            loading: true
        })
        request(
            '/update/version/getversionlistpage',
            {
                pageNum: num ? num : this.state.pageNum,
                limit: this.state.limit,
                appId: this.state.appId
            },
            (res) => {
                this.setState({
                    dataList: str.arrIsEmpty(res.data)? [] : res.data,
                    pageNum: res.currentPage,
                    limit: res.numsPerPage,
                    count: res.count,
                    totalPage: res.totalPages,
                    loading: false
                });
            },
            (err) => {
                console.log(err);
            }
        )
    }
    render(){
        return (
            <Page
                loading={this.state.loading}
            >
                <div style={{textAlign: 'left'}}>
                    <List>
                        {this._renderItems()}
                    </List>
                    {this._renderPageNavigator()}
                    <Link to={'addVersion/'+this.state.appId} style={s.addBtnPosition}>
                        <FloatingActionButton secondary={true}  >
                          <ContentAdd />
                        </FloatingActionButton>
                    </Link>
                </div>
            </Page>
        )
    }


    _renderPageNavigator(){
        return (
            <div style={s.pageBottom}>
                <FlatButton
                  label='上一页'
                  secondary={true}
                  disabled={this.state.pageNum == 1}
                  onClick={() => this._getPageData(this.state.pageNum-1)}
                />
                {
                    this._renderPageNum()
                }
                <FlatButton
                  label='下一页'
                  secondary={true}
                  disabled={this.state.pageNum >= this.state.totalPage}
                  onClick={() => this._getPageData(this.state.pageNum+1)}
                 />
            </div>
        )
    }


    _getPageData = (num) => {
        this.setState({
            pageNum: num,
            loading: true
        });

        this._getData(num);

    }

    _renderPageNum(){
        let elements = [];
        let i = 1;
        while (i <= this.state.totalPage) {
            elements.push(
                <FlatButton
                    label={i}
                    secondary={true}
                    disabled={this.state.pageNum == i}
                    style={s.pageNumBtn}
                    onClick={() => this._getPageData(i)}
                ></FlatButton>
            )
            i++;
        }
        return elements;
    }

    _renderItems(){
        if (!str.arrIsEmpty(this.state.dataList)) {
            let elemnts = [];
            this.state.dataList.map((item, key) => {
                elemnts.push(
                    <ListItem
                     primaryText='版本号'
                     secondaryText={item.version_str}
                     leftIcon={<Book color={green700} />}
                     initiallyOpen={false}
                     primaryTogglesNestedList={true}
                     key={key}
                     nestedItems={[
                       <ListItem
                         key={1}
                         style={s.listItemStyle}
                         primaryText='创建时间'
                         secondaryText={str.date(item.create_time).format('y-m-d h:i:s')}
                         leftIcon={<AccessTime color={green700} />}
                       />,
                       <ListItem
                         key={2}
                         style={s.listItemStyle}
                         primaryText='文件地址'
                         secondaryText={item.url}
                         leftIcon={<Location color={green700} />}
                         onClick={() => this._downLoad(item.url)}
                       />,
                       <ListItem
                         key={3}
                         style={s.listItemStyle}
                         primaryText='兼容原生版本号'
                         secondaryText={item.min_container_version.version_str}
                         leftIcon={<BookBorder color={green700} />}
                         initiallyOpen={true}
                         primaryTogglesNestedList={true}
                         nestedItems={[
                           <ListItem
                               key={1}
                               primaryText='创建时间'
                               style={s.listItemStyle}
                               leftIcon={<AccessTime color={green700} />}
                               secondaryText={str.date(item.min_container_version.create_time).format('y-m-d h:i:s')}
                               />,
                         ]}
                       />,
                    ]}></ListItem>
                );
                elemnts.push(<Divider style={s.divider} key={key+0.1} inset={false} />)
            });

            return elemnts;
        }
    }

    _downLoad = (url) => {
        location.href='/update/download?path='+url;
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
module.exports = connect(setState, setAction)(VersionList);
