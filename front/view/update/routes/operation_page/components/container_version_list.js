'use strict'

import React, { Component } from 'react'
import {request, str} from 'tools';
import {Page, Snackbar} from 'components';
import {deepOrange500, green700, blue50, darkBlack} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import BookBorder from 'material-ui/svg-icons/action/bookmark-border';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Description from 'material-ui/svg-icons/action/description';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FlatButton from 'material-ui/FlatButton';


module.exports = class ContainerVersionList extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageNum: 1,
            limit: 10,
            appId: this.props.appId,
            dataList: [],
            totalPage: 0,
            count: 0,
            loading: false,
        }
    }


    _getData = () => {
        this.setState({
            loading: true
        });
        request(
            '/update/container_version/getversionlistpage',
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

    componentDidMount() {
        this._getData();
    }
};
