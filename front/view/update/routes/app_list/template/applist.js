import React, {Component} from 'react';
import {request, str} from 'tools';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Router, Route, Link, IndexLink} from 'react-router'
import {Page} from 'components';
import {titleAction} from 'actions';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';

const s = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        // justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    gridList: {
        overflowY: 'auto',
        marginBottom: 24,
        padding: 5,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridTitle: {
        height: 100,
        width: 100,
        marginRight: 10
    }
};

class AppList extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataList: [],
            loading: true
        };

    }

    componentDidMount() {
        this.props.setTitle('应用列表')
        this._getData();
    }

    _getData(){
        request(
            '/update/app',
            {},
            (res) => {
                this.setState({
                    dataList: res.data,
                    loading: false
                })
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
                <div style={s.root}>
                    <List
                        style={s.gridList}
                    >
                        {
                            this._renderItems()
                        }
                    </List>
                </div>

            </Page>
        )
    }

    _renderItems(){
        if (!str.arrIsEmpty(this.state.dataList)) {
            let element = this.state.dataList.map((item, key) => {
                return (
                    <GridTile
                        key={key}
                        title={<b>{item.app_name}</b>}
                        style={s.gridTitle}
                        titlePosition='top'
                        onClick={() => this._onAppPress(item)}
                    >
                        <Link to={'operationpage/'+item.id}  >
                            <img src={item.icon} onClick={() => this._onAppPress(item)} height='100' width='100'/>
                        </Link>
                    </GridTile>
                )
            });

            return element;
        }
    }

    _onAppPress(item){
        this.props.history.push('operationpage/'+item.id)
    }
}

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
module.exports = connect(setState, setAction)(AppList);
