import React, {Component} from 'react';
import {request, str} from 'tools';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Router, Route, Link, IndexLink} from 'react-router'
import {Page} from 'components';
import {titleAction} from 'actions';
import { connect } from 'react-redux';

const s = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
    marginBottom: 24,
    padding: 5
  },
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
                <GridList
                    cellHeight={200}
                    style={s.gridList}
                >
                    {
                        this._renderItems()
                    }
                </GridList>
            </Page>
        )
    }

    _renderItems(){
        if (!str.arrIsEmpty(this.state.dataList)) {
            let element = this.state.dataList.map((item, key) => {
                return (
                    <GridTile
                        key={key}
                        title={<span>app Name : <b>{item.app_name}</b></span>}
                        style={s.gridTitle}
                        titlePosition='top'
                        subtitle={<span>app bundle ID : <b>{item.bundle_id}</b></span>}
                        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                    >
                        <Link to={'versionlist/'+item.id}  ><img src="http://www.material-ui.com/images/grid-list/00-52-29-429_640.jpg" onClick={() => this._onAppPress(item)}/></Link>
                    </GridTile>
                )
            });

            return element;
        }
    }

    _onAppPress(item){
        console.log(item);
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
