'use strict'

import React, {Component, PropsTypes} from 'react';
import Snackbar from 'material-ui/Snackbar';


module.exports = class Snackbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
        }
    }

    showMsg = (msg: String) => {
        this.setState({
            message: msg,
            open: true,
        });
    }

    _handleRequestClose = () => {
        this.setState({
            open: false
        });
    }

    render() {
        return (
            <Snackbar
              open={this.state.open}
              message={this.state.message}
              autoHideDuration={3000}
              onRequestClose={this._handleRequestClose}
            />
        )
    }
};
