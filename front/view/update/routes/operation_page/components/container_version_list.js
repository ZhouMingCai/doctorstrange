'use strict'

import React, { Component } from 'react'
import {request, str} from 'tools';
import {Page, SSnackbar} from 'components';
import {deepOrange500, green700, blue50, darkBlack} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import BookBorder from 'material-ui/svg-icons/action/bookmark-border';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Description from 'material-ui/svg-icons/action/description';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FlatButton from 'material-ui/FlatButton';
import Book from 'material-ui/svg-icons/action/book';
import ConfirmationNum from 'material-ui/svg-icons/notification/confirmation-number';
import AccessTime from 'material-ui/svg-icons/device/access-time';


const s = {
    addBtnPosition: {
        position:'fixed',
        bottom: 200,
        right: 100,
        zDepth: 0
    },
    listItemStyle: {
        backgroundColor: '#e5e5e5',
        marginBottom: '2px',
        textAlign: 'left',
    },
    pageBottom: {
        textAlign: 'center',
        padding: '5px'
    },
    pageNumBtn: {
        width: 10,
    },
    list: {
        width: '60%',
        margin:'0 auto',
        textAlign: 'left',
    },
    listContainer: {
        textAlign: 'center',
        alignItems: 'center',
    }
}

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


    _getData = (num) => {
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

    componentWillReceiveProps(nextProps) {
        if (this.props.index !== nextProps.index && nextProps.index === 0) {
            this._getData();
        }
    }


    render(){
        return (
            <Page
                loading={this.state.loading}
            >
            <div style={s.listContainer}>
                <List style={s.list}>
                    {this._renderItems()}
                </List>
                {this._renderPageNavigator()}
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
            let temp = i;
            elements.push(
                <FlatButton
                    label={i}
                    secondary={true}
                    disabled={this.state.pageNum == i}
                    style={s.pageNumBtn}
                    onClick={() => this._getPageData(temp)}
                    key={i}
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
                     secondaryText={
                        <p>
                          <span style={{color: green700}}>{item.version_str}</span>
                        </p>
                     }
                     leftIcon={<Book color={green700} />}
                     initiallyOpen={false}
                     primaryTogglesNestedList={true}
                     key={item.id}
                     nestedItems={[
                             item.description?
                             <ListItem
                               key={-1}
                               style={s.listItemStyle}
                               primaryText='版本说明'
                               secondaryTextLines={2}
                               secondaryText={
                                   <p>
                                       <span style={{color: green700}}>{item.description}</span>
                                   </p>
                                }
                               leftIcon={<Description color={green700} />}
                             />
                         :null
                         ,
                         <ListItem
                           key={0}
                           style={s.listItemStyle}
                           primaryText='版本更新次数'
                           secondaryText={
                               <p>
                                   <span style={{color: green700}}>{item.update_num? item.update_num : '0'}</span>
                               </p>
                           }
                           leftIcon={<ConfirmationNum color={green700} />}
                         />,
                       <ListItem
                         key={1}
                         style={s.listItemStyle}
                         primaryText='创建时间'
                         secondaryText={
                             <p>
                                 <span style={{color: green700}}>{str.date(item.create_time).format('y-m-d h:i:s')}</span>
                             </p>
                         }
                         leftIcon={<AccessTime color={green700} />}
                       />,
                    ]}></ListItem>
                );
                elemnts.push(<Divider style={s.divider} key={key+0.1} inset={false} />)
            });

            return elemnts;
        }
    }
};
