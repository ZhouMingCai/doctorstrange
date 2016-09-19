'use strict'

import React, {Component} from 'react';
import {str, request} from '../../../../../tools';
import {deepOrange500, green700, blue50} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Book from 'material-ui/svg-icons/action/book';
import BookBorder from 'material-ui/svg-icons/action/bookmark-border';
import AccessTime from 'material-ui/svg-icons/device/access-time';
import Location from 'material-ui/svg-icons/communication/location-on';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Router, Route, Link, IndexLink} from 'react-router'


const s = {
    addBtnPosition: {
        position: 'absolute',
        bottom: 300,
        right: 100,
        zDepth: 0
    }
}

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

module.exports = class VersionList extends Component{
    constructor(props){
        super(props);

        this.state = {
            pageNum: 1,
            limit: 15,
            appId: this.props.params.appId,
            dataList: [],
            totalPage: 0,
            count: 0
        }

    }

    componentDidMount() {
        this._getData();
    }


    _getData(){
        request(
            '/update/version/getversionlistpage',
            {
                pageNum: this.state.pageNum,
                limit: this.state.limit,
                appId: this.state.appId
            },
            (res) => {
                this.setState({
                    dataList: str.arrIsEmpty(res.data)? [] : res.data,
                    pageNum: res.currentPage,
                    limit: res.numsPerPage,
                    count: res.count,
                    totalPage: res.totalPages
                });
            },
            (err) => {
                console.log(err);
            }
        )
    }
    render(){
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <List>
                        {this._renderItems()}
                    </List>
                    <Link to={'addVersion/'+this.state.appId} style={s.addBtnPosition}>
                        <FloatingActionButton secondary={true}  >
                          <ContentAdd />
                        </FloatingActionButton>
                    </Link>
                </div>

            </MuiThemeProvider>
        )
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
                         primaryText='创建时间'
                         secondaryText={str.date(item.create_time).format('y-m-d h:i:s')}
                         leftIcon={<AccessTime color={green700} />}
                       />,
                        <Divider key={1.1} inset={true} />,
                       <ListItem
                         key={2}
                         primaryText='文件地址'
                         secondaryText={item.url}
                         leftIcon={<Location color={green700} />}
                       />,
                        <Divider key={2.1} inset={true} />,
                       <ListItem
                         key={3}
                         primaryText='兼容原生版本号'
                         secondaryText={item.min_container_version.version_str}
                         leftIcon={<BookBorder color={green700} />}
                         initiallyOpen={true}
                         primaryTogglesNestedList={true}
                         nestedItems={[
                           <ListItem
                               key={1}
                               primaryText='创建时间'
                               leftIcon={<AccessTime color={green700} />}
                               secondaryText={str.date(item.min_container_version.create_time).format('y-m-d h:i:s')}
                               />,
                         ]}
                       />,
                    ]}></ListItem>
                );
                elemnts.push(<Divider key={key+0.1} inset={false} />)
            });

            return elemnts;
        }
    }

};
