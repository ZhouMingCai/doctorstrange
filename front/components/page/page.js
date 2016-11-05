'use strict'

import React, {Component, PropsTypes} from 'react';
import {deepOrange500, green700, blue50} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Loading from '../loading/loading';
import Snackbar from 'material-ui/Snackbar';


const muiTheme = getMuiTheme({
    palette: {
      accent1Color: green700,
      primary1Color: green700,
    },
});


module.exports = class Page extends Component {
    static propsTypes = {
        loading: React.PropTypes.bool.isRequired,
    }
    constructor(props){
        super(props);
        this.state = {
            msgOpen: false
        }
    }

    render(){
        return (
            <MuiThemeProvider muiTheme={this.props.muiTheme? this.props.muiTheme : muiTheme}>
                <div style={{textAlign: 'center',}}>
                    {
                        this.props.loading?
                        <Loading></Loading>
                        :null
                    }
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        )
    }
};
