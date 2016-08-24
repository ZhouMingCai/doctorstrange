import React, {Component} from 'react'
import s from './about.style';

module.exports = class About extends Component {
    render() {
      return (
        <div style={s.container}>
            <div style={s.contentContainer}>
                <div>
                    a hot update service for React Native
                </div>
            </div>
        </div>
      )
    }
};
