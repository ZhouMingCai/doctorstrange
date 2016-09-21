'use strict'

import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {deepOrange500, green700, blue50} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme({
    palette: {
      accent1Color: green700,
      primary1Color: green700,
    },
});
let s = {
    container: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: '0px',
        left: '0px',
        opacity: 1,
        backgroundColor: 'rgba(200, 200, 200, 0.541176)',
        willChange: 'opacity',
        transform: 'translateZ(0px)',
        transition: 'left 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        zIndex: 1400,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '0 auto',
        display: 'table',
    },
    cell: {
        display: 'table-cell',
        verticalAlign: 'middle'
    }
}
module.exports = class Loading extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={s.container}>
                    <div style={s.cell}>
                        <CircularProgress size={this.props.size? this.props.size : 1} />
                    </div>
                </div>
            </MuiThemeProvider>

        )
    }
};
