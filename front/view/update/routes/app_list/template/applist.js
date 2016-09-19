import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {request, str} from '../../../../../tools';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Router, Route, Link, IndexLink} from 'react-router'



const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

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

module.exports = class AppList extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataList: [],
        };

    }

    componentDidMount() {
        this._getData();
    }

    _getData(){
        request(
            '/update/app',
            {},
            (res) => {
                this.setState({
                    dataList: res.data
                })
            },
            (err) => {
                console.log(err);

            }
        )
    }


    render(){
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <GridList
                    cellHeight={200}
                    style={s.gridList}
                >
                    {
                        this._renderItems()
                    }
                </GridList>
            </MuiThemeProvider>
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
